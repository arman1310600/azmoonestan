import type { NextConfig } from "next";

// ── پیکربندی انتشار ──
const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,           // gzip پاسخ‌های متنی
  poweredByHeader: false,   // حذف X-Powered-By
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // ریدایرکت مسیرهای تمیز به شل SPA (مسیریابی برنامه hash-based است)
  async redirects() {
    return [
      {
        source: "/:path(azmoon|reports|stats|tracking|guide|about|login|help)",
        destination: "/#/:path",
        permanent: false,
      },
    ];
  },
  // هدرهای امنیتی پایه برای همهٔ مسیرها
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          // توجه: X-Frame-Options عمداً حذف شد — پیش‌نمایش پلتفرم سایت را در iframe
          // نشان می‌دهد و SAMEORIGIN آن را می‌شکست (صفحهٔ شکسته در پیش‌نمایش)
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // آواتارها/فایل‌های استاتیک عمومی — کش مرورگر
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
