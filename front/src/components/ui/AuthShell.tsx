import Image from "next/image";
import Link from "next/link";
import assignment_image from "../../../public/assets/assignment_image.jpg";
interface AuthShellProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  imageSrc?: any;
  imageAlt?: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };  
}

export default function AuthShell({
  children,
  heading,
  subheading,
  imageSrc = assignment_image,
  imageAlt = "Background",
  quote,
}: AuthShellProps) {
  return (
    <section className="min-h-screen grid md:grid-cols-2">

      {/* LEFT — Image Panel */}
      <div className="hidden md:flex relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-indigo-800/60 to-purple-900/70" />

        {quote && (
          <div className="absolute bottom-16 left-10 right-10 w-100 ml-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
              <p className="text-base font-medium leading-relaxed mb-4">
                "{quote.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-400/60 flex items-center justify-center text-sm font-bold uppercase">
                  {quote.author.slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{quote.author}</p>
                  <p className="text-xs text-white/60">{quote.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — Form Panel */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-32 py-12 bg-white">
        <div className="mb-12">
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Assignment System
          </span>
          <span className="text-indigo-600 font-black ml-1 text-4xl rounded-full">.</span>
        </div>

        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {heading}
          </h1>
          <p className="text-slate-500 text-sm">{subheading}</p>
        </div>

        {children}
      </div>

    </section>
  );
}