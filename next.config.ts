import type { NextConfig } from "next";

type RemotePattern = { protocol: "http" | "https"; hostname: string; port?: string; pathname: string };

/**
 * CRM media hosts next/image may optimise (docs/api-contract.md section 9).
 * Production is fixed; a CRM_API_URL on another origin (local CRM on :3001,
 * staging) adds that origin's /media too. Local IPs are allowed only then.
 */
function crmImageHosts(): { patterns: RemotePattern[]; local: boolean } {
  const patterns: RemotePattern[] = [{ protocol: "https", hostname: "crm.pm-travelagency.com", pathname: "/media/**" }];
  let local = false;
  try {
    const url = new URL(process.env.CRM_API_URL ?? "");
    if (url.hostname !== "crm.pm-travelagency.com") {
      patterns.push({ protocol: url.protocol === "http:" ? "http" : "https", hostname: url.hostname, ...(url.port ? { port: url.port } : {}), pathname: "/media/**" });
      local = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    }
  } catch {
    // CRM_API_URL not set or not a URL: production host only.
  }
  return { patterns, local };
}
const crmImages = crmImageHosts();

/**
 * Security headers. Kept here rather than in middleware so they apply to
 * static assets too and cost nothing at request time.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
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
      // Google Translate (loaded only after a visitor picks FR/ES/PT; docs/decisions.md D8).
      "script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com",
      /*
       * style-src allows inline styles because next/image sets positioning
       * and object-fit through a style attribute on every rendered image.
       * Locking this to 'self' silently breaks every photograph on the site -
       * they load, but unpositioned.
       *
       * The exposure is small and bounded: no user-supplied content is ever
       * rendered, and `npm run verify:data` fails the build if our own JSX
       * hand-writes a style attribute, so the only inline styles that reach a
       * page are the framework's own. See docs/decisions.md, D2.
       */
      "style-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com",
      "img-src 'self' data: https://fonts.gstatic.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://www.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com",
      "form-action 'self'",
      "frame-ancestors 'self'", // Google Translate frames this page; other sites still cannot
      // Google Maps on /contact only, loaded after consent or a click (MapEmbed).
      "frame-src 'self' https://www.google.com https://maps.google.com https://translate.google.com",
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
    // srcset widths up to 4K; small sizes cover thumbnails and cards.
    deviceSizes: [640, 1080, 1600, 2400, 3840],
    imageSizes: [96, 160, 256, 384, 480],
    qualities: [70],
    minimumCacheTTL: 2678400,
    remotePatterns: crmImages.patterns,
    ...(crmImages.local ? { dangerouslyAllowLocalIP: true } : {}),
  },
  async redirects() {
    // Pages replaced by the 2026-11 site structure (docs/decisions.md D7).
    return [
      { source: "/morocco-dmc", destination: "/b2b/dmc-services", permanent: true },
      { source: "/mice", destination: "/b2b/mice", permanent: true },
      { source: "/how-we-work", destination: "/b2b", permanent: true },
      { source: "/styleguide", destination: "/", permanent: true },
      { source: "/become-a-partner", destination: "/b2b/become-a-partner", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
