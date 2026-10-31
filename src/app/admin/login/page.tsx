"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("majharulislamsifat93@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid credentials. Please verify your email and password.");
        setLoading(false);
        return;
      }

      // Success, route to destination
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-accent-ember/10 text-accent-ember mb-2">
          <Lock className="h-6 w-6" />
        </div>
        <Badge variant="peach">Secure Administrator Portal</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
          Sign In to CMS
        </h1>
        <p className="text-xs sm:text-sm text-foreground/60 max-w-sm mx-auto">
          Manage projects, skills, creative video logs, and contact inquiries with real-time database sync.
        </p>
      </div>

      {/* Login Card */}
      <Card variant="glass" className="p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xl">
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-red-600 dark:text-red-400 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-foreground/70 uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/70 dark:bg-canvas-charcoal/70 border border-neutral-200/80 dark:border-neutral-800 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-foreground/70 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter administrator password"
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white/70 dark:bg-canvas-charcoal/70 border border-neutral-200/80 dark:border-neutral-800 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 text-[11px] text-foreground/50">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Protected by edge JWT authentication & bcrypt hashing.</span>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Link
          href="/"
          className="text-xs font-mono text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
        >
          ← Return to Public Portfolio
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-xs font-mono text-foreground/50">Loading portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
