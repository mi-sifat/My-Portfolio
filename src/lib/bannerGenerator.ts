/**
 * Procedural Banner Generator for Projects & Services
 * Generates bespoke high-resolution 16:9 (1280x720) visual card banners
 * based on Project title, category, technologies, and color schemes.
 */

export interface BannerOptions {
  title: string;
  category: string;
  technologies?: string[];
  theme?: "modern-mesh" | "dark-obsidian" | "tech-blueprint" | "warm-peach";
}

export function generateProjectBannerSvg(options: BannerOptions): string {
  const { title, category, technologies = [], theme = "dark-obsidian" } = options;

  // Sanitize title for XML
  const safeTitle = (title || "Portfolio Project")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const safeCategory = (category || "Software Development")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const techBadges = technologies.slice(0, 4).map((t) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  );

  // Category specific accent colors
  let primaryAccent = "#E25822"; // Ember
  let secondaryAccent = "#FF8A65"; // Peach
  let bgGradientStart = "#0C0C0F";
  let bgGradientEnd = "#1A1A24";

  if (category.toLowerCase().includes("android") || category.toLowerCase().includes("mobile")) {
    primaryAccent = "#10B981";
    secondaryAccent = "#34D399";
    bgGradientStart = "#091410";
    bgGradientEnd = "#12231C";
  } else if (category.toLowerCase().includes("iot") || category.toLowerCase().includes("hardware")) {
    primaryAccent = "#8B5CF6";
    secondaryAccent = "#A78BFA";
    bgGradientStart = "#0E0C17";
    bgGradientEnd = "#1C182B";
  } else if (category.toLowerCase().includes("e-commerce") || category.toLowerCase().includes("store")) {
    primaryAccent = "#F97316";
    secondaryAccent = "#FDBA74";
    bgGradientStart = "#180C07";
    bgGradientEnd = "#2A140B";
  } else if (category.toLowerCase().includes("software")) {
    primaryAccent = "#06B6D4";
    secondaryAccent = "#67E8F9";
    bgGradientStart = "#091218";
    bgGradientEnd = "#11202A";
  }

  if (theme === "warm-peach") {
    primaryAccent = "#E25822";
    secondaryAccent = "#FF7A59";
    bgGradientStart = "#20120D";
    bgGradientEnd = "#351B12";
  } else if (theme === "modern-mesh") {
    primaryAccent = "#F43F5E";
    secondaryAccent = "#FB7185";
    bgGradientStart = "#160C14";
    bgGradientEnd = "#261322";
  }

  // Render SVG string
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradientStart}" />
      <stop offset="100%" stop-color="${bgGradientEnd}" />
    </linearGradient>

    <radialGradient id="glowOrb1" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${primaryAccent}" stop-opacity="0.32" />
      <stop offset="100%" stop-color="${primaryAccent}" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="glowOrb2" cx="15%" cy="85%" r="65%">
      <stop offset="0%" stop-color="${secondaryAccent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${secondaryAccent}" stop-opacity="0" />
    </radialGradient>

    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1"/>
      <circle cx="0" cy="0" r="1.5" fill="rgba(255, 255, 255, 0.12)" />
    </pattern>

    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F4F4F5" />
    </linearGradient>

    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryAccent}" stop-opacity="0.2" />
      <stop offset="100%" stop-color="${secondaryAccent}" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1280" height="720" fill="url(#bgGrad)" />

  <!-- Ambient Glows -->
  <rect width="1280" height="720" fill="url(#glowOrb1)" />
  <rect width="1280" height="720" fill="url(#glowOrb2)" />

  <!-- Grid overlay -->
  <rect width="1280" height="720" fill="url(#gridPattern)" />

  <!-- Decorative Abstract Geometry -->
  <g opacity="0.45">
    <circle cx="1080" cy="200" r="180" fill="none" stroke="${primaryAccent}" stroke-width="1.5" stroke-dasharray="8 8" />
    <circle cx="1080" cy="200" r="130" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    <circle cx="1080" cy="200" r="70" fill="none" stroke="${secondaryAccent}" stroke-width="1.5" />
    
    <path d="M 940 380 L 1180 380 L 1220 540 L 980 540 Z" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" />
    <line x1="940" y1="460" x2="1200" y2="460" stroke="${primaryAccent}" stroke-opacity="0.3" stroke-width="1" />
  </g>

  <!-- Top Brand / Meta Bar -->
  <g transform="translate(100, 110)">
    <!-- Category Badge -->
    <rect x="0" y="0" width="${Math.max(160, safeCategory.length * 11 + 40)}" height="38" rx="19" fill="url(#badgeGrad)" stroke="${primaryAccent}" stroke-opacity="0.4" stroke-width="1.5" />
    <circle cx="20" cy="19" r="4.5" fill="${primaryAccent}" />
    <text x="36" y="24" fill="#FFFFFF" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">${safeCategory}</text>

    <!-- Watermark / Author -->
    <text x="1080" y="24" text-anchor="end" fill="rgba(255,255,255,0.4)" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="500" letter-spacing="1.5">MAJHARUL ISLAM SIFAT // ARCHGIG</text>
  </g>

  <!-- Main Headline Title -->
  <g transform="translate(100, 310)">
    <text x="0" y="0" fill="url(#textGrad)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="56" font-weight="800" letter-spacing="-1">${safeTitle}</text>
    
    <text x="0" y="55" fill="rgba(255,255,255,0.65)" font-family="'Inter', system-ui, sans-serif" font-size="20" font-weight="400">
      Production-Ready Engineering &amp; Architecture
    </text>
  </g>

  <!-- Tech Badges Bar -->
  <g transform="translate(100, 560)">
    ${techBadges
      .map((tech, idx) => {
        const offset = idx * 160;
        return `
        <g transform="translate(${offset}, 0)">
          <rect width="140" height="38" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="70" y="24" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="500">${tech}</text>
        </g>`;
      })
      .join("")}
  </g>

  <!-- Subtle Bottom Ambient Line -->
  <rect x="0" y="714" width="1280" height="6" fill="${primaryAccent}" />
</svg>`;
}

export function generateBannerDataUrl(options: BannerOptions): string {
  const svgString = generateProjectBannerSvg(options);
  if (typeof window !== "undefined") {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  }
  const base64 = Buffer.from(svgString).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

