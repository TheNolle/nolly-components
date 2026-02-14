'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Music, MousePointer2, FileText, ArrowRight, Code2, Accessibility, Palette, Moon, Zap, Package, Play } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Button } from '@/components/Button'

const COMPONENTS = [
  {
    name: 'Music Player',
    description: 'Feature-rich audio player with 9 advanced capabilities: HLS streaming, Web Audio visualizers, Media Session API, playlist queue, and 1,296 design combinations.',
    href: '/music-player',
    icon: Music,
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
    status: 'stable',
    features: ['HLS/DASH Streaming', 'Audio Visualizer', 'Media Session API', 'Playlist Queue'],
    variants: 5_184
  },
  {
    name: 'Button',
    description: 'Production-ready button with 17 features: 9 variants, 8 styles, 7 colors, icon support, loading states, and full accessibility. The ultimate UI workhorse.',
    href: '/button',
    icon: MousePointer2,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    status: 'stable',
    features: ['9 Variants', '8 Styles', '7 Colors', 'Icon Support'],
    variants: 54_432
  },
  {
    name: 'Video Player',
    description: 'Production-ready video player with HLS streaming, subtitles, playlists, skip intro/outro, PiP, and 15,120 design combinations across 8 variants and 6 styles.',
    href: '/video-player',
    icon: Play,
    gradient: 'from-red-500 via-orange-500 to-amber-500',
    status: 'works in progress',
    features: ['HLS Streaming', 'Subtitle Menu', 'Playlist Queue', 'Skip Intro/Outro'],
    variants: 5_040
  }
]

export default function HomePage() {
  const router = useRouter()

  return (
    <div className='min-h-screen bg-white dark:bg-neutral-950'>
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 dark:bg-violet-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl' />
      </div>

      <div className='relative'>
        <header className='border-b border-neutral-200 dark:border-neutral-800'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-emerald-500 to-cyan-500'>
                  <img src='https://skins.mcstats.com/skull/93bdaf65-eee6-46e3-b215-b30f6435df0a' alt='Nolly' className='h-6 w-6' />
                </div>
                <span className='text-lg font-semibold text-neutral-900 dark:text-white'>
                  Nolly Components
                </span>
              </div>
              <nav className='flex items-center gap-6'>
                <Link
                  href='https://github.com/thenolle/nolly-components'
                  className='flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors'
                  target='_blank'
                >
                  <SiGithub className='h-4 w-4' />
                  <span className='hidden sm:inline'>GitHub</span>
                </Link>
                <Link
                  href='https://github.com/thenolle/nolly-components/wiki'
                  className='flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors'
                  target='_blank'
                >
                  <FileText className='h-4 w-4' />
                  <span className='hidden sm:inline'>Docs</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <section className='mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24'>
          <div className='mx-auto max-w-2xl text-center'>
            <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1 text-sm'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
              </span>
              <span className='text-neutral-600 dark:text-neutral-400'>
                {COMPONENTS.length} components available
              </span>
            </div>

            <h1 className='text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl mb-6'>
              Build faster with
              <span className='block bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent'>
                production-ready components
              </span>
            </h1>

            <p className='text-lg leading-8 text-neutral-600 dark:text-neutral-400 mb-10'>
              A modern React component library built with Next.js 16, TypeScript, and Tailwind CSS 4.
              Accessible, customizable, and designed for perfection.
            </p>

            <div className='flex items-center justify-center gap-4'>
              <Button
                onClick={() => router.push(COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)].href)}
                className='bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-sm'
                icon={ArrowRight}
                iconPosition='right'
              >
                Browse Random Component
              </Button>
              <Link
                href='https://github.com/thenolle/nolly-components'
                target='_blank'
                className='inline-flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-transparent px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors'
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-6 lg:px-8 pb-24'>
          <div className='mb-12'>
            <h2 className='text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2'>
              Components
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400'>
              Production-ready components with extensive customization options
            </p>
          </div>

          <div className='grid gap-6 sm:grid-cols-2'>
            {COMPONENTS.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className='group relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-6 transition-all hover:shadow-lg dark:hover:border-neutral-700 hover:scale-[1.02]'
              >
                <div className={`absolute inset-0 bg-linear-to-br ${component.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className='relative'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${component.gradient}`}>
                      <component.icon className='h-6 w-6 text-white' />
                    </div>
                    <span className='inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400'>
                      {component.status}
                    </span>
                  </div>

                  <h3 className='text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors'>
                    {component.name}
                  </h3>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2'>
                    {component.description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-4'>
                    {component.features.map((feature) => (
                      <span
                        key={feature}
                        className='inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400'
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className='flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800'>
                    <span className='text-sm text-neutral-500 dark:text-neutral-500'>
                      {component.variants.toLocaleString()} variants
                    </span>
                    <ArrowRight className='h-4 w-4 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all' />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className='border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8 py-24'>
            <div className='mx-auto max-w-2xl text-center mb-16'>
              <h2 className='text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4'>
                Built for developers
              </h2>
              <p className='text-neutral-600 dark:text-neutral-400'>
                Every component is crafted with attention to detail, accessibility, and developer experience
              </p>
            </div>

            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  title: 'TypeScript First',
                  description: 'Fully typed with no any. IntelliSense support out of the box.',
                  icon: Code2
                },
                {
                  title: 'Accessible',
                  description: 'WCAG 2.1 AA compliant with ARIA labels and keyboard navigation.',
                  icon: Accessibility
                },
                {
                  title: 'Customizable',
                  description: 'Extensive prop APIs with design tokens and variant systems.',
                  icon: Palette
                },
                {
                  title: 'Dark Mode',
                  description: 'Auto-detect system preference or manual override support.',
                  icon: Moon
                },
                {
                  title: 'Zero Config',
                  description: 'Works out of the box with sensible defaults.',
                  icon: Zap
                },
                {
                  title: 'Tree Shakeable',
                  description: 'Optimized bundle size with modular architecture.',
                  icon: Package
                }
              ].map((feature, i) => (
                <div key={i} className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6'>
                  <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50'>
                    <feature.icon className='h-5 w-5 text-emerald-600 dark:text-emerald-400' />
                  </div>
                  <h3 className='text-lg font-semibold text-neutral-900 dark:text-white mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className='border-t border-neutral-200 dark:border-neutral-800'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8 py-12'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                © {new Date().getFullYear()} Nolly Components. Built with Next.js, TypeScript & Tailwind CSS.
              </p>
              <div className='flex items-center gap-6'>
                <Link
                  href='https://github.com/thenolle/nolly-components/wiki'
                  target='_blank'
                  className='text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors'
                >
                  Documentation
                </Link>
                <Link
                  href='https://github.com/thenolle/nolly-components'
                  target='_blank'
                  className='text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors'
                >
                  GitHub
                </Link>
                <Link
                  href='https://github.com/thenolle/nolly-components/blob/master/LICENSE'
                  target='_blank'
                  className='text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors'
                >
                  MIT License
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}