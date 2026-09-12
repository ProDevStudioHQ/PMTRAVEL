import type { NextConfig } from "next";

/**
 * Security headers. Kept here rather than in middleware so they apply to
 * static assets too and cost nothing at request time.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      /*
       * script-src keeps 'unsafe-inline' as a deliberate, documented trade-off.
       *
       * Next injects inline bootstrap and RSC-payload scripts whose content
       * differs per page, so neither a hash list nor a static allowlist can
       * cover them. The alternative is a per-request nonce, which requires
       * middleware and forces every page out of static prerendering - paying
       * LCP on a content site to mitigate a risk we have already closed by
       * other means: there is no third-party script on this site, no user
       * content is ever rendered as HTML, and every JSON-LD block is built
       * from developer-authored objects.
       *
       * Revisit if the site ever renders user-supplied content, or if it moves
       * to dynamic rendering for another reason. See docs/decisions.md.
       */
      "script-src 'self' 'unsafe-inline'",
      // No inline <style> blocks and no style attributes are rendered, so
      // styles are locked to same-origin files. Verified by npm run check:a11y.
      "style-src 'self'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "frame-src 'none'",
      "worker-src 'self'",
      "manifest-src 'self'",
      "media-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
