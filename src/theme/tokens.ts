/**
 * TypeScript reference for the design tokens.
 *
 * The authoritative values live in `src/index.css` (@theme). This module
 * mirrors the *names* so non-Tailwind code (e.g. inline styles, canvas,
 * charts) can consume tokens without hardcoding values.
 */
export const tokens = {
  color: {
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    surfaceMuted: 'var(--color-surface-muted)',
    foreground: 'var(--color-foreground)',
    mutedForeground: 'var(--color-muted-foreground)',
    border: 'var(--color-border)',
    ring: 'var(--color-ring)',
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    primaryForeground: 'var(--color-primary-foreground)',
    primarySubtle: 'var(--color-primary-subtle)',
    success: 'var(--color-success)',
    successSubtle: 'var(--color-success-subtle)',
    successForeground: 'var(--color-success-foreground)',
    warning: 'var(--color-warning)',
    warningSubtle: 'var(--color-warning-subtle)',
    warningForeground: 'var(--color-warning-foreground)',
    error: 'var(--color-error)',
    errorSubtle: 'var(--color-error-subtle)',
    errorForeground: 'var(--color-error-foreground)',
    info: 'var(--color-info)',
    infoSubtle: 'var(--color-info-subtle)',
    infoForeground: 'var(--color-info-foreground)',
  },
  font: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
  radius: {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  },
  shadow: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },
  motion: {
    easeStandard: 'var(--ease-standard)',
    easeOutExpo: 'var(--ease-out-expo)',
    easeInOut: 'var(--ease-in-out)',
    durationFast: 'var(--duration-fast)',
    durationNormal: 'var(--duration-normal)',
    durationSlow: 'var(--duration-slow)',
  },
  breakpoint: {
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
  },
} as const

export type DesignTokens = typeof tokens
