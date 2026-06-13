"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/confirm`,
          },
        });
        if (error) throw error;
        // 이메일 확인이 켜져 있으면 session 이 null
        if (!data.session) {
          setInfo("확인 메일을 보냈어요. 메일의 링크를 눌러 가입을 완료해 주세요.");
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-red">
            pillyo
          </h1>
          <p className="mt-2 text-sm text-muted">
            {mode === "login" ? "다시 오신 걸 환영해요" : "한 해를 기록할 계정 만들기"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-6 shadow-sm"
        >
          <label className="text-sm font-medium text-ink">
            이메일
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-blue"
            />
          </label>

          <label className="text-sm font-medium text-ink">
            비밀번호
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상"
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-blue"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-soft px-3 py-2 text-xs text-red">
              {error}
            </p>
          )}
          {info && (
            <p className="rounded-lg bg-blue-soft px-3 py-2 text-xs text-blue">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-xl bg-red py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "처리 중…"
              : mode === "login"
                ? "로그인"
                : "회원가입"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          {mode === "login" ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
              setInfo(null);
            }}
            className="font-semibold text-red hover:underline"
          >
            {mode === "login" ? "회원가입" : "로그인"}
          </button>
        </p>
      </div>
    </main>
  );
}
