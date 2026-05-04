"use client";

import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "@/context/AuthContext";

/**
 * Convenience hook for accessing the auth context.
 *
 * Usage:
 *   const { user, role, login, logout } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
