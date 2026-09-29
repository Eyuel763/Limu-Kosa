"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Sun, Moon, Eye, EyeOff, KeyRound, CheckCircle2, ArrowLeft, Mail } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

interface AdminLoginProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  login: (e: FormEvent) => void;
  isBusy: boolean;
  message: string;
  theme: "light" | "dark";
  toggleTheme: () => void;
  apiBase?: string;
}

export default function AdminLogin({
  email,
  setEmail,
  password,
  setPassword,
  login,
  isBusy,
  message,
  theme,
  toggleTheme,
  apiBase = process.env.NEXT_PUBLIC_API_BASE || "/api",
}: AdminLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot" | "reset">("login");

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [forgotBusy, setForgotBusy] = useState(false);

  // Reset Password State (from email link or token)
  const [resetTokenInput, setResetTokenInput] = useState("");
  const [resetEmailInput, setResetEmailInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [resetBusy, setResetBusy] = useState(false);

  // Detect resetToken & email from URL query string on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("resetToken");
      const emailFromUrl = params.get("email");

      if (tokenFromUrl) {
        setResetTokenInput(tokenFromUrl);
        if (emailFromUrl) setResetEmailInput(emailFromUrl);
        setMode("reset");
      }
    }
  }, []);

  // Handle Requesting Password Reset Link
  async function handleSendResetLink(e: FormEvent) {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotBusy(true);
    setForgotMessage(null);

    try {
      const response = await fetch(`${apiBase}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to request password reset.");

      setForgotMessage({
        text: data.message || "If an account exists with that email, a password reset link has been sent.",
        type: "success",
      });
    } catch (err) {
      setForgotMessage({
        text: err instanceof Error ? err.message : "An error occurred while requesting password reset.",
        type: "error",
      });
    } finally {
      setForgotBusy(false);
    }
  }

  // Handle Submitting New Password with Reset Token
  async function handleConfirmResetPassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResetMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }
    if (newPassword.length < 8) {
      setResetMessage({ text: "Password must be at least 8 characters.", type: "error" });
      return;
    }

    setResetBusy(true);
    setResetMessage(null);

    try {
      const response = await fetch(`${apiBase}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmailInput || email,
          token: resetTokenInput,
          newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reset password.");

      setResetMessage({
        text: "Password reset successfully! You can now sign in with your new password.",
        type: "success",
      });

      // Switch back to login mode after 2 seconds
      setTimeout(() => {
        if (resetEmailInput) setEmail(resetEmailInput);
        setMode("login");
        setResetMessage(null);
      }, 2000);
    } catch (err) {
      setResetMessage({
        text: err instanceof Error ? err.message : "Failed to reset password. Token may be invalid or expired.",
        type: "error",
      });
    } finally {
      setResetBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF2ED] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden text-[#2C2C2C]">
      <div className="absolute top-0 left-0 w-80 h-80 lg:w-96 lg:h-96 bg-[#12351E]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 lg:w-96 lg:h-96 bg-[#D4A017]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Language Switcher + Theme Toggle */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <LanguageSwitcher variant="light" />
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white hover:bg-gray-100 border border-[#D7DED5] transition-colors text-[#1E5631] cursor-pointer shadow-sm"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
        </button>
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-[#D7DED5] relative z-10">
        <div className="text-center">
          <Image
            src="/limu-kosa-logo.png"
            alt="Limu Kosa Woreda logo"
            width={72}
            height={72}
            className="mx-auto h-20 w-20 rounded-full bg-white p-1 border-2 border-[#1E5631] shadow-sm"
            priority
          />
          <h2 className="mt-5 text-3xl font-black text-[#1E5631] tracking-tight">Limu Kosa</h2>
          <p className="mt-1.5 text-xs font-black text-[#6F4E37] uppercase tracking-widest">
            Government Administration CMS
          </p>
        </div>

        {/* ── MODE 1: STANDARD SIGN IN ────────────────────────────── */}
        {mode === "login" && (
          <form className="mt-8 space-y-6" onSubmit={login}>
            {message && (
              <div className="rounded-md bg-[#F8F6F1] border border-[#E8E1D4] px-4 py-3 text-xs font-bold text-[#6F4E37] text-center">
                {message}
              </div>
            )}

            <div className="rounded-md space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3.5 py-3 border border-[#D7DED5] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] text-sm"
                  placeholder="admin@limukosa.gov.et"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setForgotMessage(null);
                      setMode("forgot");
                    }}
                    className="text-xs font-bold text-[#1E5631] hover:text-[#12351E] transition"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3.5 py-3 border border-[#D7DED5] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] text-sm pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white hover:bg-gray-100 border border-[#D7DED5] transition-colors text-[#6B7280] cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isBusy}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#1E5631] hover:bg-[#12351E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E5631] transition active:scale-95 shadow-sm disabled:opacity-40"
              >
                {isBusy ? "Authenticating..." : "Sign In to Admin Panel"}
              </button>
            </div>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs font-bold text-[#6F4E37] hover:text-[#1E5631] transition">
                ← Back to public website
              </Link>
            </div>
          </form>
        )}

        {/* ── MODE 2: FORGOT PASSWORD REQUEST ────────────────────────────── */}
        {mode === "forgot" && (
          <form className="mt-8 space-y-6" onSubmit={handleSendResetLink}>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-[#1E5631] flex items-center justify-center gap-2">
                <KeyRound className="h-5 w-5" /> Forgot Password
              </h3>
              <p className="text-xs text-[#50627A]">
                Enter your registered admin email address below. We'll send you a link to reset your password.
              </p>
            </div>

            {forgotMessage && (
              <div
                className={`rounded-md px-4 py-3 text-xs font-bold text-center border ${
                  forgotMessage.type === "success"
                    ? "bg-green-50 text-[#1E5631] border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {forgotMessage.text}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3.5 py-3 border border-[#D7DED5] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] text-sm pl-10"
                  placeholder="admin@limukosa.gov.et"
                  required
                />
                <Mail className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={forgotBusy}
                className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-md text-white bg-[#1E5631] hover:bg-[#12351E] transition disabled:opacity-40 shadow-sm"
              >
                {forgotBusy ? "Sending Reset Link..." : "Send Password Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => setMode("login")}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#50627A] hover:text-[#1E5631] py-2 transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* ── MODE 3: RESET PASSWORD FORM (TOKEN CONFIRM) ────────────────────────────── */}
        {mode === "reset" && (
          <form className="mt-8 space-y-6" onSubmit={handleConfirmResetPassword}>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-[#1E5631] flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> Set New Password
              </h3>
              <p className="text-xs text-[#50627A]">
                Enter your account email and your new password below.
              </p>
            </div>

            {resetMessage && (
              <div
                className={`rounded-md px-4 py-3 text-xs font-bold text-center border ${
                  resetMessage.type === "success"
                    ? "bg-green-50 text-[#1E5631] border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {resetMessage.text}
              </div>
            )}

            <div className="space-y-4">
              <input type="hidden" value={resetTokenInput} />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Account Email</label>
                <input
                  type="email"
                  value={resetEmailInput}
                  onChange={(e) => setResetEmailInput(e.target.value)}
                  className="appearance-none rounded-md block w-full px-3.5 py-2.5 border border-[#D7DED5] text-sm text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631]"
                  placeholder="admin@limukosa.gov.et"
                  required
                />
              </div>

              {!resetTokenInput && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Reset Token</label>
                  <input
                    type="text"
                    value={resetTokenInput}
                    onChange={(e) => setResetTokenInput(e.target.value)}
                    className="appearance-none rounded-md block w-full px-3.5 py-2.5 border border-[#D7DED5] text-xs font-mono text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631]"
                    placeholder="Paste token from email link..."
                    required
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    className="appearance-none rounded-md block w-full px-3.5 py-2.5 border border-[#D7DED5] text-sm text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] pr-10"
                    placeholder="Min. 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                    className="appearance-none rounded-md block w-full px-3.5 py-2.5 border border-[#D7DED5] text-sm text-gray-900 focus:outline-none focus:ring-[#1E5631] focus:border-[#1E5631] pr-10"
                    placeholder="Re-enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={resetBusy}
                className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-md text-white bg-[#1E5631] hover:bg-[#12351E] transition disabled:opacity-40 shadow-sm"
              >
                {resetBusy ? "Updating Password..." : "Update Password & Sign In"}
              </button>

              <button
                type="button"
                onClick={() => setMode("login")}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#50627A] hover:text-[#1E5631] py-2 transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
