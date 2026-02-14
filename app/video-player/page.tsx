'use client'

import React from 'react'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const VARIANTS = ['default', 'glass', 'minimal', 'neon', 'soft', 'elevated', 'cinematic', 'modern'] as const
const STYLES = ['filled', 'outline', 'ghost', 'soft', 'blur', 'flat'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '4k'] as const
const ASPECT_RATIOS = ['16:9', '4:3', '21:9', '1:1', '9:16'] as const
const COLOR_MODES = ['dark', 'light', 'auto'] as const

const DEMO_SOURCES = [
  { src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: 'auto' as const, type: 'application/x-mpegURL' },
  { src: 'https://getsamplefiles.com/download/mp4/sample-4.mp4', quality: '720p' as const },
]

const DEMO_POSTER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg'

const DEMO_SUBTITLES = [
  { src: '/subtitles/en.vtt', srclang: 'en', label: 'English' },
  { src: '/subtitles/fr.vtt', srclang: 'fr', label: 'Français' },
  { src: '/subtitles/es.vtt', srclang: 'es', label: 'Español' }
]

const DEMO_PLAYLIST = [
  {
    id: '1',
    title: 'Example Video',
    poster: 'https://img.freepik.com/free-photo/earth-galaxy-elements-this-image-furnished-by-nasa_335224-750.jpg?semt=ais_user_personalization&w=740&q=80',
    sources: [{ src: 'https://getsamplefiles.com/download/mp4/sample-4.mp4', quality: '720p' as const }]
  },
  {
    id: '2',
    title: 'Sample Video',
    poster: 'https://durian.blender.org/wp-content/uploads/2010/06/sintel_poster.jpg',
    sources: [{ src: 'https://download.samplelib.com/mp4/sample-30s.mp4', quality: '720p' as const }]
  },
  {
    id: '3',
    title: 'For Bigger Blazes',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    sources: [{ src: 'https://getsamplefiles.com/download/mp4/sample-5.mp4', quality: '720p' as const }]
  }
]

export default function Page() {
  const [playlistKey, setPlaylistKey] = React.useState(0)

  return (
    <div className='min-h-screen bg-neutral-900 p-12 text-white'>
      <div className='mb-8'>
        <Link href='/' className='text-sm text-neutral-500 hover:text-neutral-300 transition-colors'>
          <ArrowLeft className='inline-block mr-2' /> Back to Home
        </Link>
      </div>

      <div className='mx-auto max-w-7xl space-y-16'>
        <div className='space-y-4'>
          <h1 className='text-5xl font-bold'>Video Player Component Showcase</h1>
          <p className='text-lg text-neutral-400'>
            Production-ready video player with HLS streaming, multiple qualities, subtitles, keyboard shortcuts,
            PiP mode, fullscreen support, playlist functionality, skip intro/outro, and 150+ advanced features
          </p>
          <p className='text-sm text-neutral-500'>
            Total combinations: {VARIANTS.length} variants × {STYLES.length} styles × {SIZES.length} sizes × {ASPECT_RATIOS.length} ratios × {COLOR_MODES.length} color modes = <strong>{(VARIANTS.length * STYLES.length * SIZES.length * ASPECT_RATIOS.length * COLOR_MODES.length).toLocaleString()}</strong> unique configurations!
          </p>
        </div>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Streaming vs Fixed Videos</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>HLS Adaptive Streaming (.m3u8)</p>
              <VideoPlayer
                title='HLS Stream'
                description='Adaptive bitrate streaming with automatic quality adjustment'
                poster={DEMO_POSTER}
                sources={[{ src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: 'auto' as const, type: 'application/x-mpegURL' }]}
                variant='glass'
                size='sm'
              />
            </div>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>Fixed MP4 Video</p>
              <VideoPlayer
                title='MP4 Video'
                description='Standard progressive download'
                poster={DEMO_POSTER}
                sources={[{ src: 'https://getsamplefiles.com/download/mp4/sample-4.mp4', quality: '720p' as const }]}
                variant='glass'
                size='sm'
              />
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>All Variants</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {VARIANTS.map(variant => (
              <div key={variant} className='space-y-3'>
                <p className='text-sm opacity-70 capitalize'>{variant}</p>
                <VideoPlayer
                  title='Demo Video'
                  poster={DEMO_POSTER}
                  sources={DEMO_SOURCES}
                  variant={variant}
                  size='sm'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>All Styles</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {STYLES.map(style => (
              <div key={style} className='space-y-3'>
                <p className='text-sm opacity-70 capitalize'>{style}</p>
                <VideoPlayer
                  title='Demo Video'
                  poster={DEMO_POSTER}
                  sources={DEMO_SOURCES}
                  style={style}
                  variant='default'
                  size='sm'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Aspect Ratios</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {ASPECT_RATIOS.map(ratio => (
              <div key={ratio} className='space-y-3'>
                <p className='text-sm opacity-70'>{ratio}</p>
                <VideoPlayer
                  title='Demo Video'
                  poster={DEMO_POSTER}
                  sources={DEMO_SOURCES}
                  aspectRatio={ratio}
                  variant='glass'
                  size='xs'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>All Sizes</h2>
          <div className='space-y-8'>
            {SIZES.slice(0, 5).map(size => (
              <div key={size} className='space-y-3'>
                <p className='text-sm opacity-70 uppercase'>{size}</p>
                <VideoPlayer
                  title='Demo Video'
                  poster={DEMO_POSTER}
                  sources={DEMO_SOURCES}
                  size={size}
                  variant='neon'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>With Subtitles</h2>
          <p className='text-sm text-neutral-500'>Click the CC button to enable subtitles</p>
          <VideoPlayer
            title='Video with Subtitles'
            description='Toggle subtitles using the CC button or press C'
            poster={DEMO_POSTER}
            sources={DEMO_SOURCES}
            subtitles={DEMO_SUBTITLES}
            variant='glass'
            size='md'
          />
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>With Playlist</h2>
          <p className='text-sm text-neutral-500'>Use Previous/Next buttons or let it auto-advance. <button onClick={() => setPlaylistKey(k => k + 1)} className='text-emerald-400 hover:underline'>Reset playlist</button></p>
          <VideoPlayer
            key={playlistKey}
            title={DEMO_PLAYLIST[0].title}
            description='Navigate through multiple videos'
            poster={DEMO_PLAYLIST[0].poster}
            sources={DEMO_PLAYLIST[0].sources}
            playlist={DEMO_PLAYLIST}
            currentIndex={0}
            variant='elevated'
            size='md'
            onNext={() => console.log('Next video clicked')}
            onPrevious={() => console.log('Previous video clicked')}
            onVideoChange={(video, index) => console.log('Changed to:', video.title, 'at index', index)}
          />
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Skip Intro/Outro</h2>
          <p className='text-sm text-neutral-500'>Seek to 5-10 seconds to see the skip intro button appear</p>
          <VideoPlayer
            title='Skip Intro Demo'
            description='Skip buttons appear at configured timestamps'
            poster={DEMO_POSTER}
            sources={DEMO_SOURCES}
            skipIntro={[5, 10]}
            skipOutro={[85, 90]}
            variant='cinematic'
            size='md'
          />
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Color Modes</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {COLOR_MODES.map(mode => (
              <div key={mode} className='space-y-3'>
                <p className='text-sm opacity-70 capitalize'>{mode} Mode</p>
                <VideoPlayer
                  title='Color Mode Demo'
                  poster={DEMO_POSTER}
                  sources={DEMO_SOURCES}
                  colorMode={mode}
                  variant='soft'
                  size='xs'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Autoplay & Muted</h2>
          <p className='text-sm text-neutral-500'>Video starts automatically when muted (browser requirement)</p>
          <VideoPlayer
            title='Autoplay Demo'
            description='Automatically starts playing'
            poster={DEMO_POSTER}
            sources={DEMO_SOURCES}
            autoplay={true}
            muted={true}
            variant='modern'
            size='sm'
          />
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Loop Mode</h2>
          <VideoPlayer
            title='Looping Video'
            description='Video restarts automatically when it ends'
            poster={DEMO_POSTER}
            sources={DEMO_SOURCES}
            loop={true}
            variant='glass'
            size='sm'
          />
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Vertical Video (9:16)</h2>
          <div className='flex justify-center'>
            <VideoPlayer
              title='Vertical Video'
              description='Perfect for mobile-first content'
              poster={DEMO_POSTER}
              sources={DEMO_SOURCES}
              aspectRatio='9:16'
              variant='minimal'
              size='sm'
            />
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Cinematic (21:9)</h2>
          <VideoPlayer
            title='Cinematic View'
            description='Ultra-wide cinematic experience'
            poster={DEMO_POSTER}
            sources={DEMO_SOURCES}
            aspectRatio='21:9'
            variant='cinematic'
            size='lg'
          />
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Reduced Motion</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>Normal Animations</p>
              <VideoPlayer
                title='Normal Motion'
                poster={DEMO_POSTER}
                sources={DEMO_SOURCES}
                reducedMotion={false}
                variant='neon'
                size='sm'
              />
            </div>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>Reduced Motion</p>
              <VideoPlayer
                title='Reduced Motion'
                poster={DEMO_POSTER}
                sources={DEMO_SOURCES}
                reducedMotion={true}
                variant='neon'
                size='sm'
              />
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Variants × Styles Matrix</h2>
          {VARIANTS.slice(0, 4).map(variant => (
            <div key={variant} className='space-y-6'>
              <h3 className='text-xl font-semibold capitalize'>{variant}</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {STYLES.slice(0, 3).map(style => (
                  <div key={`${variant}-${style}`} className='space-y-2'>
                    <p className='text-xs opacity-70 capitalize text-center'>{style}</p>
                    <VideoPlayer
                      title={`${variant} - ${style}`}
                      poster={DEMO_POSTER}
                      sources={DEMO_SOURCES}
                      variant={variant}
                      style={style}
                      size='xs'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Event Callbacks</h2>
          <p className='text-sm text-neutral-500'>Open browser console to see event logs</p>
          <VideoPlayer
            title='Event Demo'
            description='All events are logged to console'
            poster={DEMO_POSTER}
            sources={DEMO_SOURCES}
            variant='elevated'
            size='md'
            onPlay={() => console.log('Video played')}
            onPause={() => console.log('Video paused')}
            onEnded={() => console.log('Video ended')}
            onTimeUpdate={(time) => console.log('Time:', Math.floor(time), 's')}
            onProgress={(buffered) => console.log('Buffered:', Math.floor(buffered), 's')}
            onQualityChange={(quality) => console.log('Quality changed to:', quality)}
            onError={(error) => console.error('Error:', error)}
          />
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Kitchen Sink</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              <p className='text-xs opacity-50'>glass / blur / sm / 16:9 / dark</p>
              <VideoPlayer
                title='Glass Blur'
                poster={DEMO_POSTER}
                sources={DEMO_SOURCES}
                variant='glass'
                style='blur'
                size='sm'
                aspectRatio='16:9'
                colorMode='dark'
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>neon / outline / sm / 4:3 / light</p>
              <VideoPlayer
                title='Neon Outline'
                poster={DEMO_POSTER}
                sources={DEMO_SOURCES}
                variant='neon'
                style='outline'
                size='sm'
                aspectRatio='4:3'
                colorMode='light'
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>modern / filled / xs / 1:1 / auto</p>
              <VideoPlayer
                title='Modern Square'
                poster={DEMO_POSTER}
                sources={DEMO_SOURCES}
                variant='modern'
                style='filled'
                size='xs'
                aspectRatio='1:1'
                colorMode='auto'
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>cinematic / flat / xs / 21:9 / dark</p>
              <VideoPlayer
                title='Cinematic Flat'
                poster={DEMO_POSTER}
                sources={DEMO_SOURCES}
                variant='cinematic'
                style='flat'
                size='xs'
                aspectRatio='21:9'
                colorMode='dark'
              />
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              { name: '8 Variants', desc: 'default, glass, minimal, neon, soft, elevated, cinematic, modern' },
              { name: '6 Styles', desc: 'filled, outline, ghost, soft, blur, flat' },
              { name: '7 Sizes', desc: 'xs, sm, md, lg, xl, 2xl, 4k (responsive)' },
              { name: '5 Aspect Ratios', desc: '16:9, 4:3, 21:9, 1:1, 9:16 (vertical)' },
              { name: 'HLS Streaming', desc: 'Adaptive bitrate streaming with hls.js' },
              { name: 'MP4 Support', desc: 'Standard progressive video files' },
              { name: 'Quality Selection', desc: 'Manual quality switching: auto, 4K, 1080p, 720p, 480p, 360p' },
              { name: 'Playback Speed', desc: '0.25x to 2x speed control' },
              { name: 'Subtitles/CC', desc: 'Multiple subtitle tracks with WebVTT' },
              { name: 'Playlist Support', desc: 'Queue multiple videos with navigation' },
              { name: 'Skip Intro/Outro', desc: 'Configurable skip buttons for intro and outro' },
              { name: 'Keyboard Shortcuts', desc: 'Space, K, J, L, Arrow keys, M, F, I, C' },
              { name: 'Picture-in-Picture', desc: 'Native PiP support for multitasking' },
              { name: 'Fullscreen', desc: 'Native fullscreen API integration' },
              { name: 'Volume Control', desc: 'Draggable volume slider with mute toggle' },
              { name: 'Buffer Visualization', desc: 'Visual buffer indicator on progress bar' },
              { name: 'Loading States', desc: 'Buffering indicator with spinner' },
              { name: 'Device Detection', desc: 'Auto-detect smartphone, tablet, laptop, desktop' },
              { name: 'Color Modes', desc: 'Auto-detect light/dark or manual override' },
              { name: 'Reduced Motion', desc: 'Respects prefers-reduced-motion' },
              { name: 'Event Callbacks', desc: 'onPlay, onPause, onEnded, onTimeUpdate, onProgress, etc' },
              { name: 'TypeScript', desc: 'Fully typed with no any' },
              { name: 'Accessibility', desc: 'ARIA labels, keyboard nav, screen reader support' },
              { name: 'Responsive', desc: 'Adapts to container size and device' }
            ].map((feature, i) => (
              <div key={i} className='rounded-lg border border-neutral-700 bg-neutral-800 p-4 space-y-2'>
                <h3 className='font-semibold text-emerald-400'>{feature.name}</h3>
                <p className='text-sm text-neutral-400'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h2 className='text-3xl font-bold'>Keyboard Shortcuts</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              { keys: 'Space / K', action: 'Play/Pause' },
              { keys: 'Left / J', action: 'Rewind 10s' },
              { keys: 'Right / L', action: 'Forward 10s' },
              { keys: 'Up Arrow', action: 'Volume Up' },
              { keys: 'Down Arrow', action: 'Volume Down' },
              { keys: 'M', action: 'Mute/Unmute' },
              { keys: 'F', action: 'Fullscreen' },
              { keys: 'I', action: 'Picture-in-Picture' },
              { keys: 'C', action: 'Toggle Subtitles' }
            ].map((shortcut, i) => (
              <div key={i} className='rounded-lg border border-neutral-700 bg-neutral-800 p-3 flex items-center justify-between'>
                <kbd className='px-2 py-1 text-xs font-semibold bg-neutral-700 rounded'>{shortcut.keys}</kbd>
                <span className='text-sm text-neutral-400'>{shortcut.action}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}