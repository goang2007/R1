import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 상위 폴더들에 다른 lockfile이 있어 Turbopack이 workspace root를
  // 잘못 추론하는 문제 방지 — 이 web 폴더를 root로 고정.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
