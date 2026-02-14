'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Send, Download, Trash, Plus, Heart, Star, Share2, Settings, Zap, Sparkles, Check, X, AlertCircle, Info, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const VARIANTS = ['default', 'glass', 'minimal', 'neon', 'soft', 'elevated', 'gradient', 'shadow', 'glossy'] as const
const STYLES = ['filled', 'outline', 'ghost', 'soft', 'blur', 'flat', 'bordered', 'underline'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
const COLORS = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const
const RADII = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
const COLOR_MODES = ['dark', 'light', 'auto'] as const

export default function Page() {
  const [activeButton, setActiveButton] = React.useState<string | null>(null)

  return (
    <div className='min-h-screen bg-neutral-900 p-12 text-white'>
      <div className='mb-8'>
        <Link href='/' className='text-sm text-neutral-500 hover:text-neutral-300 transition-colors'>
          <ArrowLeft className='inline-block mr-2' /> Back to Home
        </Link>
      </div>

      <div className='mx-auto max-w-300 space-y-16'>
        <div className='space-y-4'>
          <h1 className='text-5xl font-bold'>Button Component Showcase</h1>
          <p className='text-lg text-neutral-400'>
            Production-ready button component with 17 features: 9 variants, 8 styles, 6 sizes, 7 colors,
            6 border radii, icon support, icon-only mode, loading states, loading text, active states,
            disabled states, color modes, reduced motion, full width, native props, TypeScript typing, and accessibility
          </p>
          <p className='text-sm text-neutral-500'>
            Total combinations: {VARIANTS.length} variants × {STYLES.length} styles × {SIZES.length} sizes × {COLORS.length} colors × {RADII.length} radii × {COLOR_MODES.length} color modes = <strong>{(VARIANTS.length * STYLES.length * SIZES.length * COLORS.length * RADII.length * COLOR_MODES.length).toLocaleString()}</strong> unique configurations!
          </p>
        </div>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Color Palette</h2>
          <div className='flex flex-wrap gap-4'>
            <Button color='default'>Default</Button>
            <Button color='primary'>Primary</Button>
            <Button color='secondary'>Secondary</Button>
            <Button color='success' icon={Check}>Success</Button>
            <Button color='danger' icon={X}>Danger</Button>
            <Button color='warning' icon={AlertCircle}>Warning</Button>
            <Button color='info' icon={Info}>Info</Button>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Border Radius</h2>
          <div className='flex flex-wrap items-center gap-4'>
            {RADII.map(radius => (
              <Button key={radius} radius={radius} variant='neon'>
                {radius === 'full' ? 'Pill' : radius.toUpperCase()}
              </Button>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Icon-Only Buttons</h2>
          <div className='flex flex-wrap gap-4'>
            <Button icon={Heart} variant='default' ariaLabel='Like' />
            <Button icon={Share2} variant='glass' ariaLabel='Share' />
            <Button icon={Download} variant='neon' ariaLabel='Download' />
            <Button icon={Trash} variant='minimal' style='outline' ariaLabel='Delete' />
            <Button icon={Star} variant='gradient' ariaLabel='Favorite' />
            <Button icon={Plus} variant='soft' size='xs' ariaLabel='Add' />
            <Button icon={Settings} variant='elevated' size='lg' ariaLabel='Settings' />
            <Button icon={Zap} variant='shadow' radius='full' ariaLabel='Boost' />
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Active State Toggle</h2>
          <div className='flex flex-wrap gap-4'>
            {['Option 1', 'Option 2', 'Option 3'].map((option) => (
              <Button
                key={option}
                active={activeButton === option}
                onClick={() => setActiveButton(option)}
                variant='neon'
              >
                {option}
              </Button>
            ))}
          </div>
          <p className='text-sm text-neutral-500'>Active: {activeButton || 'None'}</p>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Loading with Custom Text</h2>
          <div className='flex flex-wrap gap-4'>
            <Button loading loadingText='Uploading...' variant='gradient' icon={Download}>
              Upload File
            </Button>
            <Button loading loadingText='Processing...' variant='neon'>
              Submit Form
            </Button>
            <Button loading loadingText='Please wait' variant='glass' icon={Send}>
              Send Message
            </Button>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>All Variants</h2>
          <div className='flex flex-wrap gap-4'>
            <Button>Default</Button>
            <Button variant='glass'>Glass</Button>
            <Button variant='minimal'>Minimal</Button>
            <Button variant='neon'>Neon</Button>
            <Button variant='soft'>Soft</Button>
            <Button variant='elevated'>Elevated</Button>
            <Button variant='gradient'>Gradient</Button>
            <Button variant='shadow'>Shadow</Button>
            <Button variant='glossy'>Glossy</Button>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>All Styles</h2>
          <div className='flex flex-wrap gap-4'>
            <Button style='filled' variant='default'>Filled</Button>
            <Button style='outline' variant='default'>Outline</Button>
            <Button style='ghost' variant='default'>Ghost</Button>
            <Button style='soft' variant='default'>Soft</Button>
            <Button style='blur' variant='default'>Blur</Button>
            <Button style='flat' variant='default'>Flat</Button>
            <Button style='bordered' variant='default'>Bordered</Button>
            <Button style='underline' variant='default'>Underline</Button>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>With Icons</h2>
          <div className='flex flex-wrap gap-4'>
            <Button icon={Send} iconPosition='left' variant='neon'>
              Send Message
            </Button>
            <Button icon={Download} iconPosition='right' variant='glass'>
              Download
            </Button>
            <Button icon={Plus} variant='soft'>
              Add Item
            </Button>
            <Button icon={Trash} variant='minimal' style='outline' color='danger'>
              Delete
            </Button>
            <Button icon={Heart} variant='elevated' color='danger'>
              Favorite
            </Button>
            <Button icon={Star} variant='gradient'>
              Star
            </Button>
            <Button icon={Zap} variant='shadow'>
              Boost
            </Button>
            <Button icon={Sparkles} variant='glossy'>
              Magic
            </Button>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Button States</h2>
          <div className='flex flex-wrap gap-4'>
            <Button>Normal</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button active>Active</Button>
            <Button loading icon={Send}>Loading with Icon</Button>
            <Button disabled icon={Settings}>Disabled with Icon</Button>
            <Button loading variant='gradient'>Loading Gradient</Button>
            <Button active variant='neon'>Active Neon</Button>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>All Sizes</h2>
          <div className='flex flex-wrap items-center gap-4'>
            {SIZES.map(size => (
              <Button key={size} size={size} variant='glass'>
                {size.toUpperCase()}
              </Button>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Color Modes</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {COLOR_MODES.map(mode => (
              <div key={mode} className='space-y-3'>
                <p className='text-sm opacity-70 capitalize'>{mode} Mode</p>
                <Button colorMode={mode} variant='neon' fullWidth>
                  {mode} Mode Button
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Colors × Styles Matrix</h2>
          {COLORS.map(color => (
            <div key={color} className='space-y-6'>
              <h3 className='text-xl font-semibold capitalize'>{color}</h3>
              <div className='flex flex-wrap gap-4'>
                {STYLES.slice(0, 4).map(style => (
                  <div key={`${color}-${style}`} className='space-y-2'>
                    <p className='text-xs opacity-70 capitalize text-center'>{style}</p>
                    <Button color={color} style={style}>
                      Button
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Variants × Styles Matrix</h2>
          {VARIANTS.map(variant => (
            <div key={variant} className='space-y-6'>
              <h3 className='text-xl font-semibold capitalize'>{variant}</h3>
              <div className='flex flex-wrap gap-4'>
                {STYLES.map(style => (
                  <div key={`${variant}-${style}`} className='space-y-2'>
                    <p className='text-xs opacity-70 capitalize text-center'>{style}</p>
                    <Button variant={variant} style={style}>
                      Button
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Full Width Buttons</h2>
          <div className='space-y-4 max-w-md'>
            <Button fullWidth variant='neon'>
              Full Width Neon
            </Button>
            <Button fullWidth variant='glass' icon={Download}>
              Download with Icon
            </Button>
            <Button fullWidth variant='gradient' loading loadingText='Processing...'>
              Loading Full Width
            </Button>
            <Button fullWidth variant='shadow' icon={Star} color='warning'>
              Shadow Button
            </Button>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Accessibility</h2>
          <div className='flex flex-wrap gap-4'>
            <Button reducedMotion={false} variant='soft'>
              Normal Motion
            </Button>
            <Button reducedMotion={true} variant='soft'>
              Reduced Motion
            </Button>
            <Button loading reducedMotion={false} variant='neon'>
              Animated Loading
            </Button>
            <Button loading reducedMotion={true} variant='neon'>
              Static Loading
            </Button>
            <Button icon={Heart} ariaLabel='Like this post' />
            <Button icon={Share2} ariaLabel='Share on social media' variant='glass' />
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Native HTML Props Support</h2>
          <div className='flex flex-wrap gap-4'>
            <Button 
              type='submit' 
              variant='gradient'
              form='my-form'
            >
              Submit Form
            </Button>
            <Button 
              type='reset' 
              variant='minimal'
              style='outline'
            >
              Reset
            </Button>
            <Button 
              onClick={() => alert('Clicked!')}
              variant='neon'
            >
              Alert onClick
            </Button>
            <Button 
              onMouseEnter={() => console.log('Mouse enter')}
              variant='glass'
            >
              Mouse Events
            </Button>
            <Button 
              aria-label='Close dialog'
              icon={X}
              variant='soft'
            />
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Real-World Examples</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-4 rounded-xl border border-neutral-700 bg-neutral-800 p-6'>
              <h4 className='text-lg font-semibold'>Login Form</h4>
              <div className='space-y-3'>
                <input 
                  type='email' 
                  placeholder='Email' 
                  className='w-full rounded-lg bg-neutral-700 px-4 py-2.5 text-white outline-none'
                />
                <input 
                  type='password' 
                  placeholder='Password' 
                  className='w-full rounded-lg bg-neutral-700 px-4 py-2.5 text-white outline-none'
                />
                <Button fullWidth color='primary' icon={Send}>
                  Sign In
                </Button>
              </div>
            </div>

            <div className='space-y-4 rounded-xl border border-neutral-700 bg-neutral-800 p-6'>
              <h4 className='text-lg font-semibold'>Action Buttons</h4>
              <div className='flex gap-3'>
                <Button variant='elevated' icon={Heart} style='outline' color='danger'>
                  Like
                </Button>
                <Button variant='glass' icon={Share2} color='info'>
                  Share
                </Button>
                <Button variant='minimal' icon={Download} color='success'>
                  Save
                </Button>
              </div>
            </div>

            <div className='space-y-4 rounded-xl border border-neutral-700 bg-neutral-800 p-6'>
              <h4 className='text-lg font-semibold'>CTA Section</h4>
              <div className='space-y-3'>
                <Button fullWidth variant='gradient' size='lg' icon={Zap}>
                  Get Started Free
                </Button>
                <Button fullWidth variant='glass' size='lg' style='outline'>
                  Learn More
                </Button>
              </div>
            </div>

            <div className='space-y-4 rounded-xl border border-neutral-700 bg-neutral-800 p-6'>
              <h4 className='text-lg font-semibold'>Icon Toolbar</h4>
              <div className='flex gap-2'>
                <Button icon={Plus} variant='minimal' size='sm' ariaLabel='Add' />
                <Button icon={Trash} variant='minimal' size='sm' ariaLabel='Delete' color='danger' />
                <Button icon={Settings} variant='minimal' size='sm' ariaLabel='Settings' />
                <Button icon={Share2} variant='minimal' size='sm' ariaLabel='Share' />
              </div>
            </div>

            <div className='space-y-4 rounded-xl border border-neutral-700 bg-neutral-800 p-6'>
              <h4 className='text-lg font-semibold'>Status Buttons</h4>
              <div className='flex flex-wrap gap-2'>
                <Button color='success' icon={Check} size='sm'>
                  Approved
                </Button>
                <Button color='danger' icon={X} size='sm'>
                  Rejected
                </Button>
                <Button color='warning' icon={AlertCircle} size='sm'>
                  Pending
                </Button>
                <Button color='info' icon={Info} size='sm'>
                  Info
                </Button>
              </div>
            </div>

            <div className='space-y-4 rounded-xl border border-neutral-700 bg-neutral-800 p-6'>
              <h4 className='text-lg font-semibold'>Pill Buttons</h4>
              <div className='flex flex-wrap gap-2'>
                <Button radius='full' color='primary' size='sm'>
                  React
                </Button>
                <Button radius='full' color='secondary' size='sm'>
                  TypeScript
                </Button>
                <Button radius='full' color='success' size='sm'>
                  Next.js
                </Button>
                <Button radius='full' color='info' size='sm'>
                  Tailwind
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Kitchen Sink</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='space-y-3'>
              <p className='text-xs opacity-50'>gradient / filled / lg / icon / full radius</p>
              <Button variant='gradient' style='filled' size='lg' icon={Sparkles} radius='full'>
                Magic
              </Button>
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>shadow / outline / md / loading / custom text</p>
              <Button variant='shadow' style='outline' size='md' loading loadingText='Wait...'>
                Processing
              </Button>
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>glossy / bordered / sm / icon right / primary</p>
              <Button variant='glossy' style='bordered' size='sm' icon={Send} iconPosition='right' color='primary'>
                Send
              </Button>
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>neon / underline / xl / icon / success</p>
              <Button variant='neon' style='underline' size='xl' icon={Star} color='success'>
                Premium
              </Button>
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>glass / blur / xs / disabled / icon-only</p>
              <Button variant='glass' style='blur' size='xs' disabled icon={Heart} ariaLabel='Locked' />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>elevated / ghost / 2xl / loading / danger</p>
              <Button variant='elevated' style='ghost' size='2xl' loading icon={Download} color='danger'>
                Download
              </Button>
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>default / filled / md / active / warning</p>
              <Button variant='default' style='filled' size='md' active color='warning'>
                Active
              </Button>
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>minimal / ghost / sm / icon-only / info</p>
              <Button variant='minimal' style='ghost' size='sm' icon={Info} color='info' ariaLabel='Info' />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>soft / soft / lg / loading text / secondary</p>
              <Button variant='soft' style='soft' size='lg' loading loadingText='Saving...' color='secondary'>
                Save Draft
              </Button>
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              { name: '9 Variants', desc: 'default, glass, minimal, neon, soft, elevated, gradient, shadow, glossy' },
              { name: '8 Styles', desc: 'filled, outline, ghost, soft, blur, flat, bordered, underline' },
              { name: '6 Sizes', desc: 'xs, sm, md, lg, xl, 2xl' },
              { name: '7 Colors', desc: 'default, primary, secondary, success, danger, warning, info' },
              { name: '6 Border Radii', desc: 'none, sm, md, lg, xl, full (pill)' },
              { name: 'Icon Support', desc: 'Left or right positioned Lucide icons' },
              { name: 'Icon-Only Mode', desc: 'Render buttons with just icons, no text' },
              { name: 'Loading State', desc: 'Built-in spinner with reduced motion' },
              { name: 'Loading Text', desc: 'Custom text while loading state' },
              { name: 'Active State', desc: 'Visual feedback for active/pressed buttons' },
              { name: 'Disabled State', desc: 'Visual feedback for disabled buttons' },
              { name: 'Color Modes', desc: 'Auto-detect light/dark or manual override' },
              { name: 'Reduced Motion', desc: 'Respects prefers-reduced-motion' },
              { name: 'Full Width', desc: 'Responsive layout option' },
              { name: 'Native Props', desc: 'All HTML button attributes supported' },
              { name: 'TypeScript', desc: 'Fully typed with no any' },
              { name: 'Accessibility', desc: 'ARIA labels, focus states, keyboard nav' }
            ].map((feature, i) => (
              <div key={i} className='rounded-lg border border-neutral-700 bg-neutral-800 p-4 space-y-2'>
                <h3 className='font-semibold text-emerald-400'>{feature.name}</h3>
                <p className='text-sm text-neutral-400'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
