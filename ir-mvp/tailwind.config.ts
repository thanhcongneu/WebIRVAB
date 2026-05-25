import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* VietABank Brand */
        "vab-primary": "#2563EB",
        "vab-primary-hover": "#1D4ED8",
        "vab-primary-fixed": "#D8E2FF",
        "vab-primary-fixed-dim": "#ADC6FF",
        "vab-primary-container": "#1B4486",
        "vab-navy-deep": "#122E5B",
        "vab-accent": "#059669",

        /* Primary Scale */
        "primary-50": "#EEF2FF",
        "primary-100": "#E0E7FF",
        "primary-200": "#C7D2FE",
        "primary-300": "#A5B4FC",
        "primary-400": "#818CF8",
        "primary-500": "#6366F1",
        "primary-600": "#4F46E5",
        "primary-700": "#4338CA",
        "primary-800": "#3730A3",
        "primary-900": "#312E81",

        /* Success (Green) */
        "success-50": "#ECFDF5",
        "success-100": "#D1FAE5",
        "success-200": "#A7F3D0",
        "success-300": "#6EE7B7",
        "success-400": "#34D399",
        "success-500": "#10B981",
        "success-600": "#059669",
        "success-700": "#047857",
        "success-800": "#065F46",
        "success-900": "#064E3B",

        /* Warning (Amber) */
        "warning-50": "#FFFBEB",
        "warning-100": "#FEF3C7",
        "warning-200": "#FDE68A",
        "warning-300": "#FCD34D",
        "warning-400": "#FBBF24",
        "warning-500": "#F59E0B",
        "warning-600": "#D97706",
        "warning-700": "#B45309",
        "warning-800": "#92400E",
        "warning-900": "#78350F",

        /* Danger (Red) */
        "danger-50": "#FEF2F2",
        "danger-100": "#FEE2E2",
        "danger-200": "#FECACA",
        "danger-300": "#FCA5A5",
        "danger-400": "#F87171",
        "danger-500": "#EF4444",
        "danger-600": "#DC2626",
        "danger-700": "#B91C1C",
        "danger-800": "#991B1B",
        "danger-900": "#7F1D1D",

        /* Info (Blue) */
        "info-50": "#EFF6FF",
        "info-100": "#DBEAFE",
        "info-200": "#BFDBFE",
        "info-300": "#93C5FD",
        "info-400": "#60A5FA",
        "info-500": "#3B82F6",
        "info-600": "#2563EB",
        "info-700": "#1D4ED8",
        "info-800": "#1E40AF",
        "info-900": "#1E3A8A",

        /* Neutral (Gray) */
        "gray-50": "#F9FAFB",
        "gray-100": "#F3F4F6",
        "gray-200": "#E5E7EB",
        "gray-300": "#D1D5DB",
        "gray-400": "#9CA3AF",
        "gray-500": "#6B7280",
        "gray-600": "#4B5563",
        "gray-700": "#374151",
        "gray-800": "#1F2937",
        "gray-900": "#111827",
        "gray-950": "#030712",

        /* Semantic */
        "primary": "#2563EB",
        "secondary": "#64748B",
        "success": "#16A34A",
        "warning": "#F59E0B",
        "danger": "#DC2626",
        "info": "#0EA5E9",

        /* Semantic Aliases (from old config — mapped to new DS) */
        "navy-deep": "#122E5B",
        "data-blue": "#3E78CF",
        "status-positive": "#107C10",
        "status-warning": "#F7A823",

        /* Semantic text colors */
        "on-primary": "#FFFFFF",
        "on-background": "#1a1b20",

        /* Background surfaces */
        "surface": "#F9FAFB",
        "surface-container": "#EEEDF4",
        "surface-container-low": "#F4F3F9",
        "surface-container-high": "#E8E7EE",
        "surface-container-highest": "#E2E2E8",
        "surface-container-lowest": "#FFFFFF",
        "surface-dim": "#DAD9E0",
        "surface-bright": "#F9F9FF",
        "surface-variant": "#E2E2E8",
        "surface-neutral": "#F8F9FA",

        /* On-surface */
        "on-surface": "#1A1B20",
        "on-surface-variant": "#434750",

        /* Outlines */
        "outline": "#747782",
        "outline-variant": "#C3C6D2",
        "text-outline": "#747782",
        "text-vab-primary-hover": "#1D4ED8",

        /* Primary container */
        "primary-container": "#1B4486",
        "primary-fixed": "#D8E2FF",
        "primary-fixed-dim": "#ADC6FF",
        "text-primary-fixed-dim": "#ADC6FF",
        "text-vab-primary-fixed-dim": "#ADC6FF",
        "on-primary-fixed": "#001A42",
        "on-primary-fixed-variant": "#1C4587",
        "on-primary-container": "#91B3FD",

        /* Secondary container */
        "secondary-container": "#E51D24",
        "secondary-fixed": "#FFDAD6",
        "secondary-fixed-dim": "#FFB4AC",
        "on-secondary": "#FFFFFF",
        "on-secondary-container": "#FFF9F9",
        "on-secondary-fixed": "#410002",
        "on-secondary-fixed-variant": "#93000D",

        /* Tertiary */
        "tertiary": "#2E3030",
        "tertiary-container": "#444646",
        "tertiary-fixed": "#E2E2E2",
        "tertiary-fixed-dim": "#C6C6C7",
        "on-tertiary": "#FFFFFF",
        "on-tertiary-container": "#B3B4B4",
        "on-tertiary-fixed": "#1A1C1C",
        "on-tertiary-fixed-variant": "#454747",

        /* Inverse */
        "inverse-surface": "#2F3035",
        "inverse-on-surface": "#F1F0F6",
        "inverse-primary": "#ADC6FF",

        /* Error */
        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#FFFFFF",
        "on-error-container": "#93000A",

        /* Surface tint */
        "surface-tint": "#395DA0",

        /* Background */
        "background": "#F9F9FF",
      },
      fontFamily: {
        headline: ["Hanken Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "SF Mono", "Consolas", "monospace"],
      },
      maxWidth: {
        "container-max": "1200px",
      },
      borderRadius: {
        none: "0",
        sm: "0.375rem",
        DEFAULT: "0.125rem",
        md: "0.5rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "0.5": "0.125rem",
        "1.5": "0.375rem",
        "2.5": "0.625rem",
        "3.5": "0.875rem",
        "18": "4.5rem",
        "22": "5.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
        slower: "500ms",
      },
      transitionTimingFunction: {
        "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      zIndex: {
        base: "0",
        dropdown: "100",
        sticky: "200",
        fixed: "300",
        overlay: "400",
        modal: "500",
        popover: "600",
        tooltip: "700",
        toast: "800",
      },
    },
  },
  plugins: [],
};
export default config;
