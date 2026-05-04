"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axios";
import type { User, Role, LoginPayload, RegisterPayload } from "@/types/auth";

/* ------------------------------------------------------------------ */
/*  Context shape                                                      */
/* ------------------------------------------------------------------ */
export interface AuthContextValue {
  user: User | null;
  role: Role | null;
  loading: boolean;
  errors: Record<string, string[]>;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearErrors: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

/* ------------------------------------------------------------------ */
/*  Helper – role cookie (read by Next.js edge middleware)              */
/* ------------------------------------------------------------------ */
function setRoleCookie(role: string) {
  document.cookie = `role=${role};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
}
function clearRoleCookie() {
  document.cookie = "role=;path=/;max-age=0";
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  /* Hydrate user on mount ----------------------------------------- */
  useEffect(() => {
    axiosClient
      .get("/api/user")
      .then((res) => {
        setUser(res.data);
        setRoleCookie(res.data.role);
      })
      .catch(() => {
        setUser(null);
        clearRoleCookie();
      })
      .finally(() => setLoading(false));
  }, []);

  /* Login --------------------------------------------------------- */
  const login = useCallback(
    async (payload: LoginPayload) => {
      setErrors({});
      try {
        // Sanctum CSRF cookie
        await axiosClient.get("/sanctum/csrf-cookie");
        const { data } = await axiosClient.post("/login", payload);
        setUser(data.user);
        setRoleCookie(data.user.role);

        // Redirect to role dashboard
        const dest = dashboardForRole(data.user.role);
        router.push(dest);
      } catch (err: any) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors ?? {});
        } else {
          setErrors({ general: ["Invalid credentials. Please try again."] });
        }
        throw err;
      }
    },
    [router]
  );

  /* Register ------------------------------------------------------ */
  const register = useCallback(
    async (payload: RegisterPayload) => {
      setErrors({});
      try {
        await axiosClient.get("/sanctum/csrf-cookie");
        const { data } = await axiosClient.post("/register", payload);
        setUser(data.user);
        setRoleCookie(data.user.role);

        const dest = dashboardForRole(data.user.role);
        router.push(dest);
      } catch (err: any) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors ?? {});
        } else {
          setErrors({ general: ["Registration failed. Please try again."] });
        }
        throw err;
      }
    },
    [router]
  );

  /* Logout -------------------------------------------------------- */
  const logout = useCallback(async () => {
    await axiosClient.post("/logout");
    setUser(null);
    clearRoleCookie();
    router.push("/login");
  }, [router]);

  /* Clear errors -------------------------------------------------- */
  const clearErrors = useCallback(() => setErrors({}), []);

  /* Memo the context value ---------------------------------------- */
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role: user?.role ?? null,
      loading,
      errors,
      login,
      register,
      logout,
      clearErrors,
    }),
    [user, loading, errors, login, register, logout, clearErrors]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function dashboardForRole(role: Role): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "teacher":
      return "/teacher";
    case "student":
      return "/student";
    default:
      return "/login";
  }
}
