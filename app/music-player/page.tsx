'use client'

import { MusicPlayer } from '@/components/MusicPlayer'

const VARIANTS = ['default', 'glass', 'minimal', 'neon', 'soft', 'elevated'] as const
const STYLES = ['filled', 'outline', 'ghost', 'soft', 'blur', 'flat'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
const VISUALIZERS = ['none', 'circle', 'waveform', 'bars'] as const
const COLOR_MODES = ['dark', 'light', 'auto'] as const
const GLOBAL_STATE = [true, false] as const

const playlist = [
  {
    id: '1',
    name: 'The Fate of Ophelia',
    artist: 'Taylor Swift',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Taylor_Swift_%E2%80%93_The_Life_of_a_Showgirl_%28album_cover%29.png',
    audioSrc: 'https://streaming.nrjaudio.fm/ou8vs6gk7oiu'
  },
  {
    id: '2',
    name: 'Midnight Dreams',
    artist: 'Taylor Swift',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Taylor_Swift_%E2%80%93_The_Life_of_a_Showgirl_%28album_cover%29.png',
    audioSrc: 'https://streaming.nrjaudio.fm/ou8vs6gk7oiu'
  },
  {
    id: '3',
    name: 'Electric Heart',
    artist: 'Taylor Swift',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Taylor_Swift_%E2%80%93_The_Life_of_a_Showgirl_%28album_cover%29.png',
    audioSrc: 'https://streaming.nrjaudio.fm/ou8vs6gk7oiu'
  }
]

export default function Page() {
  const trackName = 'The Fate of Ophelia'
  const artist = 'Taylor Swift'
  const cover = 'https://upload.wikimedia.org/wikipedia/en/f/f4/Taylor_Swift_%E2%80%93_The_Life_of_a_Showgirl_%28album_cover%29.png'
  const audioSrc = 'https://streaming.nrjaudio.fm/ou8vs6gk7oiu'

  return (
    <div className='min-h-screen bg-neutral-900 p-12 text-white'>
      <div className='mx-auto max-w-350 space-y-16'>
        <div className='space-y-4'>
          <h1 className='text-5xl font-bold'>Music Player Showcase</h1>
          <p className='text-lg text-neutral-400'>
            Complete audio player with 9 features: Media Session API, Volume Control, Accessibility,
            Buffering States, Playlist Queue, Audio Visualizer, HLS/DASH Streaming, Global State Management,
            and Design System Hardening
          </p>
          <p className='text-sm text-neutral-500'>
            Total combinations: {VARIANTS.length} variants × {STYLES.length} styles × {SIZES.length} sizes × {VISUALIZERS.length} visualizers × {COLOR_MODES.length} color modes × {GLOBAL_STATE.length} global state options = <strong>{VARIANTS.length * STYLES.length * SIZES.length * VISUALIZERS.length * COLOR_MODES.length * GLOBAL_STATE.length}</strong> unique configurations!
          </p>
        </div>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Playlist System</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>With Playlist (3 tracks) + Visualizer</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                playlist={playlist}
                currentTrackIndex={0}
                variant='neon'
                style='filled'
                visualizer='bars'
                onTrackChange={(track, index) => {
                  console.log(`Playing: ${track.name} (${index + 1}/${playlist.length})`)
                }}
              />
            </div>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>Single Track + Circle Visualizer</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='glass'
                style='blur'
                visualizer='circle'
              />
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Global State (Only One Plays)</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[1, 2, 3].map(num => (
              <div key={num} className='space-y-3'>
                <p className='text-sm opacity-70'>Player {num} (Global State)</p>
                <MusicPlayer
                  id={`global-player-${num}`}
                  trackName={`Track ${num}`}
                  artist={artist}
                  cover={cover}
                  audioSrc={audioSrc}
                  variant='soft'
                  style='filled'
                  useGlobalState={true}
                  visualizer='waveform'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Color Modes</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {COLOR_MODES.map(mode => (
              <div key={mode} className='space-y-3'>
                <p className='text-sm opacity-70 capitalize'>{mode} Mode</p>
                <MusicPlayer
                  trackName={trackName}
                  artist={artist}
                  cover={cover}
                  audioSrc={audioSrc}
                  variant='glass'
                  style='filled'
                  colorMode={mode}
                  visualizer='bars'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Variants × Styles</h1>
          {VARIANTS.map(variant => (
            <div key={variant} className='space-y-6'>
              <h2 className='text-xl font-semibold capitalize'>{variant}</h2>
              <div className='flex flex-wrap gap-8'>
                {STYLES.map(style => (
                  <div key={`${variant}-${style}`} className='space-y-3'>
                    <p className='text-sm opacity-70 capitalize'>{style}</p>
                    <MusicPlayer
                      trackName={trackName}
                      artist={artist}
                      cover={cover}
                      audioSrc={audioSrc}
                      variant={variant}
                      style={style}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Sizes</h1>
          <div className='flex flex-wrap gap-8'>
            {SIZES.map(size => (
              <div key={size} className='space-y-3'>
                <p className='text-sm opacity-70 uppercase'>{size}</p>
                <MusicPlayer
                  trackName={trackName}
                  artist={artist}
                  cover={cover}
                  audioSrc={audioSrc}
                  size={size}
                  variant='glass'
                  style='filled'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Visualizers (Web Audio API)</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
            {VISUALIZERS.map(visualizer => (
              <div key={visualizer} className='space-y-3'>
                <p className='text-sm opacity-70 uppercase'>{visualizer}</p>
                <MusicPlayer
                  trackName={trackName}
                  artist={artist}
                  cover={cover}
                  audioSrc={audioSrc}
                  visualizer={visualizer}
                  variant='neon'
                  style='filled'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>HLS/DASH Streaming</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>Live Radio Stream (HLS)</p>
              <MusicPlayer
                trackName='Live Radio'
                artist='NRJ France'
                cover={cover}
                audioSrc='https://streaming.nrjaudio.fm/ou8vs6gk7oiu'
                variant='elevated'
                style='filled'
                visualizer='bars'
              />
            </div>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>MP3 File</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='elevated'
                style='filled'
                visualizer='waveform'
              />
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Accessibility</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>Normal Motion</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='soft'
                style='filled'
                reducedMotion={false}
              />
            </div>
            <div className='space-y-3'>
              <p className='text-sm opacity-70'>Reduced Motion (Accessibility)</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='soft'
                style='filled'
                reducedMotion={true}
              />
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Kitchen Sink (Sample Combinations)</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='space-y-3'>
              <p className='text-xs opacity-50'>neon / filled / lg / bars / global</p>
              <MusicPlayer
                id='kitchen-1'
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='neon'
                style='filled'
                size='lg'
                visualizer='bars'
                useGlobalState={true}
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>glass / blur / md / circle / light</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='glass'
                style='blur'
                size='md'
                visualizer='circle'
                colorMode='light'
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>minimal / ghost / sm / waveform / playlist</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                playlist={playlist}
                currentTrackIndex={0}
                variant='minimal'
                style='ghost'
                size='sm'
                visualizer='waveform'
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>soft / soft / xl / bars / auto</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='soft'
                style='soft'
                size='xl'
                visualizer='bars'
                colorMode='auto'
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>elevated / outline / lg / circle / reduced</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='elevated'
                style='outline'
                size='lg'
                visualizer='circle'
                reducedMotion={true}
              />
            </div>

            <div className='space-y-3'>
              <p className='text-xs opacity-50'>default / flat / xs / none</p>
              <MusicPlayer
                trackName={trackName}
                artist={artist}
                cover={cover}
                audioSrc={audioSrc}
                variant='default'
                style='flat'
                size='xs'
                visualizer='none'
              />
            </div>
          </div>
        </section>

        <section className='space-y-8'>
          <h1 className='text-3xl font-bold'>Feature Summary</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              { name: 'Media Session API', desc: 'Lock screen / headset controls' },
              { name: 'Volume Control', desc: 'Desktop hover slider + mute' },
              { name: 'Accessibility', desc: 'ARIA labels + reduced motion' },
              { name: 'Buffering States', desc: 'Audio-driven loading indicators' },
              { name: 'Playlist Queue', desc: 'Auto-advance + shuffle + navigation' },
              { name: 'Audio Visualizer', desc: '3 types: bars / waveform / circle' },
              { name: 'HLS/DASH Streaming', desc: 'Live radio + Safari fallback' },
              { name: 'Global State', desc: 'Multi-instance sync via Context' },
              { name: 'Design System', desc: 'Light/dark modes + motion variants' }
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