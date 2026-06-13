import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** 서버(서버 컴포넌트/라우트 핸들러)용 Supabase 클라이언트.
 *  Next.js 16에서 cookies()는 async 이므로 await 한다. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 서버 컴포넌트에서 호출되면 set이 막힐 수 있음 — proxy가 세션을 갱신하므로 무시 가능
          }
        },
      },
    },
  );
}
