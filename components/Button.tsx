'use client'

import React from 'react'
import { Loader2, type LucideIcon } from 'lucide-react'

type Variant = 'default' | 'glass' | 'minimal' | 'neon' | 'soft' | 'elevated' | 'gradient' | 'shadow' | 'glossy'
type Style = 'filled' | 'outline' | 'ghost' | 'soft' | 'blur' | 'flat' | 'bordered' | 'underline'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type ColorMode = 'light' | 'dark' | 'auto'
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  variant?: Variant
  style?: Style
  size?: Size
  color?: Color
  colorMode?: ColorMode
  radius?: Radius
  reducedMotion?: boolean
  loading?: boolean
  loadingText?: string
  active?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  ripple?: boolean
  ariaLabel?: string
}

const SIZE_MAP: Record<Size, string> = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-base',
  '2xl': 'px-8 py-4 text-lg'
}

const ICON_ONLY_SIZE_MAP: Record<Size, string> = {
  xs: 'p-1.5',
  sm: 'p-2',
  md: 'p-2.5',
  lg: 'p-3',
  xl: 'p-3.5',
  '2xl': 'p-4'
}

const ICON_SIZE_MAP: Record<Size, number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
  '2xl': 24
}

const RADIUS_MAP: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
}

function detectColorMode(mode: ColorMode): 'light' | 'dark' {
  if (mode !== 'auto') return mode
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getColorClasses(color: Color, colorMode: 'light' | 'dark'): string {
  const darkColors: Record<Color, string> = {
    default: 'bg-neutral-800 hover:bg-neutral-700 text-white',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    info: 'bg-cyan-600 hover:bg-cyan-700 text-white'
  }

  const lightColors: Record<Color, string> = {
    default: 'bg-gray-900 hover:bg-gray-800 text-white',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-cyan-600 hover:bg-cyan-700 text-white'
  }

  return colorMode === 'dark' ? darkColors[color] : lightColors[color]
}

function getButtonClasses(
  variant: Variant,
  style: Style,
  color: Color,
  colorMode: 'light' | 'dark',
  disabled: boolean,
  loading: boolean,
  active: boolean
) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const variantOrColorClasses = variant === 'default'
    ? getColorClasses(color, colorMode)
    : getVariantClasses(variant, colorMode)

  const darkStyles: Record<Style, string> = {
    filled: '',
    outline: 'border-2 border-white/30 hover:border-white/50 bg-transparent text-white',
    ghost: 'shadow-none bg-transparent text-white hover:bg-white/10',
    soft: 'bg-white/5 hover:bg-white/10 text-white',
    blur: 'backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white',
    flat: 'shadow-none border border-white/10 hover:border-white/20 text-white',
    bordered: 'border-2 border-white/50 hover:border-white/70 text-white',
    underline: 'shadow-none bg-transparent border-b-2 border-white/30 hover:border-white rounded-none text-white'
  }

  const lightStyles: Record<Style, string> = {
    filled: '',
    outline: 'border-2 border-gray-900/30 hover:border-gray-900/50 bg-transparent text-gray-900',
    ghost: 'shadow-none bg-transparent text-gray-900 hover:bg-black/10',
    soft: 'bg-black/5 hover:bg-black/10 text-gray-900',
    blur: 'backdrop-blur-xl bg-black/10 hover:bg-black/20 text-gray-900',
    flat: 'shadow-none border border-gray-900/10 hover:border-gray-900/20 text-gray-900',
    bordered: 'border-2 border-gray-900/50 hover:border-gray-900/70 text-gray-900',
    underline: 'shadow-none bg-transparent border-b-2 border-gray-900/30 hover:border-gray-900 rounded-none text-gray-900'
  }

  const styles = colorMode === 'dark' ? darkStyles : lightStyles

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
  const activeClasses = active ? 'ring-2 ring-offset-2 brightness-95' : ''

  return `${base} ${variantOrColorClasses} ${styles[style]} ${disabledClasses} ${activeClasses}`
}

function getVariantClasses(variant: Variant, colorMode: 'light' | 'dark'): string {
  const darkVariants: Record<Variant, string> = {
    default: 'text-white bg-neutral-800 hover:bg-neutral-700 focus-visible:ring-neutral-600',
    glass: 'text-white bg-white/10 backdrop-blur-xl hover:bg-white/20 focus-visible:ring-white/30',
    minimal: 'text-white/90 hover:text-white hover:bg-white/5 focus-visible:ring-white/20',
    neon: 'text-white bg-emerald-500/20 hover:bg-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400/40 hover:border-emerald-400/60 focus-visible:ring-emerald-400',
    soft: 'text-white bg-white/5 backdrop-blur-md hover:bg-white/10 focus-visible:ring-white/20',
    elevated: 'text-white bg-neutral-800 hover:bg-neutral-700 shadow-2xl hover:shadow-3xl focus-visible:ring-neutral-600',
    gradient: 'text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 focus-visible:ring-emerald-400',
    shadow: 'text-white bg-neutral-800 hover:bg-neutral-700 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] focus-visible:ring-neutral-600',
    glossy: 'text-white bg-gradient-to-b from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 shadow-lg focus-visible:ring-neutral-600'
  }

  const lightVariants: Record<Variant, string> = {
    default: 'text-white bg-gray-900 hover:bg-gray-800 focus-visible:ring-gray-700',
    glass: 'text-gray-900 bg-black/5 backdrop-blur-xl hover:bg-black/10 focus-visible:ring-black/20',
    minimal: 'text-gray-900/90 hover:text-gray-900 hover:bg-black/5 focus-visible:ring-black/10',
    neon: 'text-white bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400 hover:border-emerald-500 focus-visible:ring-emerald-500',
    soft: 'text-gray-900 bg-black/5 backdrop-blur-md hover:bg-black/10 focus-visible:ring-black/20',
    elevated: 'text-white bg-gray-900 hover:bg-gray-800 shadow-2xl hover:shadow-3xl focus-visible:ring-gray-700',
    gradient: 'text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 focus-visible:ring-emerald-400',
    shadow: 'text-white bg-gray-900 hover:bg-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] focus-visible:ring-gray-700',
    glossy: 'text-white bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 shadow-lg focus-visible:ring-gray-700'
  }

  return colorMode === 'dark' ? darkVariants[variant] : lightVariants[variant]
}

export function Button({
  children,
  variant = 'default',
  style = 'filled',
  size = 'md',
  color = 'default',
  colorMode = 'auto',
  radius = 'lg',
  reducedMotion = false,
  loading = false,
  loadingText,
  active = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ripple = false,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  ...props
}: ButtonProps) {
  const [resolvedColorMode, setResolvedColorMode] = React.useState<'light' | 'dark'>('dark')

  React.useEffect(() => {
    const updateColorMode = () => setResolvedColorMode(detectColorMode(colorMode))
    updateColorMode()

    if (colorMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', updateColorMode)
      return () => mediaQuery.removeEventListener('change', updateColorMode)
    }
  }, [colorMode])

  const isIconOnly = !children && Icon
  const sizeClasses = isIconOnly ? ICON_ONLY_SIZE_MAP[size] : SIZE_MAP[size]
  const buttonClasses = `${getButtonClasses(variant, style, color, resolvedColorMode, disabled, loading, active)} ${sizeClasses} ${RADIUS_MAP[radius]} ${fullWidth ? 'w-full' : ''} ${reducedMotion ? 'transition-none' : ''} ${className}`
  const iconSize = ICON_SIZE_MAP[size]

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    onClick?.(event)
  }

  const displayContent = loading && loadingText ? loadingText : children

  return (
    <button
      {...props}
      type={type}
      onClick={handleClick}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel || props['aria-label'] || (isIconOnly ? 'Button' : undefined)}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      aria-pressed={active}
    >
      {loading && (
        <Loader2
          className={`${reducedMotion ? '' : 'animate-spin'}`}
          size={iconSize}
        />
      )}
      {!loading && Icon && iconPosition === 'left' && <Icon size={iconSize} />}
      {displayContent && <span>{displayContent}</span>}
      {!loading && Icon && iconPosition === 'right' && <Icon size={iconSize} />}
    </button>
  )
}