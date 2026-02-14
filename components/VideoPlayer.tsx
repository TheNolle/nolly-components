'use client'

import React from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, Settings, Subtitles, Loader2, PictureInPicture, Smartphone, Tablet, Laptop, Monitor } from 'lucide-react'
import Hls from 'hls.js'

type Variant = 'default' | 'glass' | 'minimal' | 'neon' | 'soft' | 'elevated' | 'cinematic' | 'modern'
type Style = 'filled' | 'outline' | 'ghost' | 'soft' | 'blur' | 'flat'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4k'
type AspectRatio = '16:9' | '4:3' | '21:9' | '1:1' | '9:16'
type ColorMode = 'light' | 'dark' | 'auto'
type DeviceType = 'smartphone' | 'tablet' | 'laptop' | 'desktop' | 'unknown'
type PlaybackSpeed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2
type Quality = 'auto' | '4k' | '1080p' | '720p' | '480p' | '360p'

type VideoSource = {
  src: string
  quality: Quality
  type?: string
}

type SubtitleTrack = {
  src: string
  srclang: string
  label: string
  default?: boolean
}

type Chapter = {
  time: number
  title: string
}

type Video = {
  id: string
  title: string
  description?: string
  poster: string
  sources: VideoSource[]
  subtitles?: SubtitleTrack[]
  duration?: number
}

type VideoPlayerProps = {
  id?: string
  title: string
  description?: string
  poster: string
  sources: VideoSource[]
  subtitles?: SubtitleTrack[]

  variant?: Variant
  style?: Style
  size?: Size
  aspectRatio?: AspectRatio
  colorMode?: ColorMode
  accentColor?: string

  controls?: boolean
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  playsinline?: boolean

  playlist?: Video[]
  currentIndex?: number

  chapters?: Chapter[]
  thumbnails?: string
  skipIntro?: [number, number]
  skipOutro?: [number, number]

  useGlobalState?: boolean
  startTime?: number

  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (time: number) => void
  onProgress?: (buffered: number) => void
  onQualityChange?: (quality: Quality) => void
  onError?: (error: Error) => void
  onNext?: () => void
  onPrevious?: () => void
  onVideoChange?: (video: Video, index: number) => void

  deviceLabel?: string
  deviceType?: DeviceType

  reducedMotion?: boolean
  ariaLabel?: string

  className?: string
}

const SIZE_MAP: Record<Size, { width: string; height: string }> = {
  xs: { width: 'w-80', height: 'h-45' },
  sm: { width: 'w-[30rem]', height: 'h-[16.875rem]' },
  md: { width: 'w-[40rem]', height: 'h-[22.5rem]' },
  lg: { width: 'w-[53.375rem]', height: 'h-[30rem]' },
  xl: { width: 'w-[80rem]', height: 'h-[45rem]' },
  '2xl': { width: 'w-[120rem]', height: 'h-[67.5rem]' },
  '4k': { width: 'w-full', height: 'h-screen' }
}

const ASPECT_RATIO_MAP: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '21:9': 'aspect-[21/9]',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]'
}

const PLAYBACK_SPEEDS: PlaybackSpeed[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

function detectDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  const ua = navigator.userAgent.toLowerCase()
  const width = window.innerWidth
  if (/(iphone|ipod|android.*mobile|windows phone)/i.test(ua)) return 'smartphone'
  if (/(ipad|android(?!.*mobile)|tablet)/i.test(ua)) return 'tablet'
  if (width < 768) return 'smartphone'
  if (width < 1024) return 'tablet'
  if (/macintosh|mac os x/i.test(ua)) return 'laptop'
  return 'desktop'
}

function getDeviceIcon(deviceType: DeviceType, size: number = 16) {
  const icons: Record<DeviceType, React.ReactElement> = {
    smartphone: <Smartphone size={size} />,
    tablet: <Tablet size={size} />,
    laptop: <Laptop size={size} />,
    desktop: <Monitor size={size} />,
    unknown: <Monitor size={size} />
  }
  return icons[deviceType]
}

function getDeviceLabel(deviceType: DeviceType): string {
  const labels: Record<DeviceType, string> = {
    smartphone: 'SMARTPHONE',
    tablet: 'TABLET',
    laptop: 'LAPTOP',
    desktop: 'DESKTOP',
    unknown: 'DEVICE'
  }
  return labels[deviceType]
}

function detectColorMode(mode: ColorMode): 'light' | 'dark' {
  if (mode !== 'auto') return mode
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getContainerClasses(variant: Variant, style: Style, colorMode: 'light' | 'dark') {
  const base = 'relative rounded-xl overflow-hidden transition-all duration-300'

  const darkVariants: Record<Variant, string> = {
    default: 'bg-black text-white shadow-xl',
    glass: 'bg-black/40 backdrop-blur-2xl text-white shadow-2xl border border-white/10',
    minimal: 'bg-black text-white',
    neon: 'bg-black text-white shadow-[0_0_40px_rgba(16,185,129,0.5)] border border-emerald-400/40',
    soft: 'bg-neutral-900/90 backdrop-blur-md text-white shadow-lg',
    elevated: 'bg-black text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]',
    cinematic: 'bg-black text-white',
    modern: 'bg-gradient-to-br from-neutral-900 to-black text-white shadow-2xl'
  }

  const lightVariants: Record<Variant, string> = {
    default: 'bg-gray-50 text-gray-900 shadow-2xl border border-gray-200',
    glass: 'bg-white/80 backdrop-blur-2xl text-gray-900 shadow-2xl border border-gray-300/50',
    minimal: 'bg-gray-100 text-gray-900 shadow-md',
    neon: 'bg-gradient-to-br from-emerald-50 to-white text-gray-900 shadow-[0_0_60px_rgba(16,185,129,0.4)] border-2 border-emerald-400/60',
    soft: 'bg-gradient-to-br from-gray-50 to-white text-gray-900 shadow-xl border border-gray-200',
    elevated: 'bg-white text-gray-900 shadow-[0_25px_70px_rgba(0,0,0,0.15)] border border-gray-200',
    cinematic: 'bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900 border border-gray-200',
    modern: 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 shadow-2xl border border-gray-200'
  }

  const variants = colorMode === 'dark' ? darkVariants : lightVariants

  const styles: Record<Style, string> = {
    filled: '',
    outline: colorMode === 'dark' ? 'border-2 border-white/30' : 'border-3 border-gray-400/50',
    ghost: 'shadow-none bg-transparent',
    soft: colorMode === 'dark' ? 'bg-white/5' : 'bg-gray-900/5 border border-gray-200',
    blur: colorMode === 'dark' ? 'backdrop-blur-xl bg-white/10' : 'backdrop-blur-xl bg-gray-900/8 border border-gray-200',
    flat: colorMode === 'dark' ? 'shadow-none border border-white/10' : 'shadow-none border-2 border-gray-300'
  }

  return `${base} ${variants[variant]} ${styles[style]}`
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

function isHLS(url: string): boolean {
  return url.includes('.m3u8') || url.includes('.m3u')
}

export function VideoPlayer({
  id,
  title,
  poster,
  sources,
  subtitles = [],

  variant = 'default',
  style = 'filled',
  size = 'lg',
  aspectRatio = '16:9',
  colorMode = 'auto',

  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  playsinline = true,

  playlist = [],
  currentIndex = 0,

  skipIntro,
  skipOutro,

  startTime = 0,

  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onProgress,
  onQualityChange,
  onError,
  onNext,
  onPrevious,
  onVideoChange,

  deviceLabel,
  deviceType,

  reducedMotion = false,
  ariaLabel,

  className = ''
}: VideoPlayerProps) {
  const playerId = React.useId()
  const finalId = id || playerId

  const [playing, setPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(startTime)
  const [duration, setDuration] = React.useState(0)
  const [buffered, setBuffered] = React.useState(0)
  const [volume, setVolume] = React.useState(muted ? 0 : 1)
  const [volumeMuted, setVolumeMuted] = React.useState(muted)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isPiP, setIsPiP] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  const [isBuffering, setIsBuffering] = React.useState(false)
  const [selectedQuality, setSelectedQuality] = React.useState<Quality>('auto')
  const [playbackRate, setPlaybackRate] = React.useState<PlaybackSpeed>(1)
  const [showSettings, setShowSettings] = React.useState(false)
  const [showSubtitlesMenu, setShowSubtitlesMenu] = React.useState(false)
  const [selectedSubtitleIndex, setSelectedSubtitleIndex] = React.useState<number | null>(null)
  const [detectedDevice, setDetectedDevice] = React.useState<DeviceType>('desktop')
  const [resolvedColorMode, setResolvedColorMode] = React.useState<'light' | 'dark'>('dark')
  const [queueIndex, setQueueIndex] = React.useState(currentIndex)
  const [showSkipIntro, setShowSkipIntro] = React.useState(false)
  const [showSkipOutro, setShowSkipOutro] = React.useState(false)

  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const hlsRef = React.useRef<Hls | null>(null)
  const dragging = React.useRef(false)
  const volumeDragging = React.useRef(false)

  React.useEffect(() => {
    const check = () => {
      setDetectedDevice(detectDeviceType())
      setResolvedColorMode(detectColorMode(colorMode))
    }
    check()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => setResolvedColorMode(detectColorMode(colorMode))

    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', check)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', check)
    }
  }, [colorMode])

  const activeDeviceType = deviceType || detectedDevice
  const activeDeviceLabel = deviceLabel || getDeviceLabel(activeDeviceType)

  const setupHLS = React.useCallback((url: string) => {
    if (!videoRef.current) return

    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    if (Hls.isSupported()) {
      hlsRef.current = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      })

      hlsRef.current.loadSource(url)
      hlsRef.current.attachMedia(videoRef.current)

      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsBuffering(false)
      })

      hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS fatal error:', data)
          setIsBuffering(false)
          onError?.(new Error(data.details))
        }
      })
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url
    }
  }, [onError])

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const currentSource = sources.find(s => s.quality === selectedQuality) || sources[0]
    if (!currentSource) return

    if (isHLS(currentSource.src)) {
      setupHLS(currentSource.src)
    } else {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
      video.src = currentSource.src
      video.load()
    }

    if (startTime > 0) {
      const setStartTime = () => {
        video.currentTime = startTime
        video.removeEventListener('loadedmetadata', setStartTime)
      }
      video.addEventListener('loadedmetadata', setStartTime)
    }
  }, [sources, selectedQuality, startTime, setupHLS])

  React.useEffect(() => {
    if (playlist.length === 0) return

    const video = videoRef.current
    if (!video) return

    const currentVideo = playlist[queueIndex]
    if (!currentVideo) return

    const currentSource = currentVideo.sources[0]
    if (!currentSource) return

    if (isHLS(currentSource.src)) {
      setupHLS(currentSource.src)
    } else {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
      video.src = currentSource.src
      video.poster = currentVideo.poster
      video.load()
    }
  }, [queueIndex, playlist, setupHLS])

  React.useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
    }
  }, [])

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
      onTimeUpdate?.(video.currentTime)

      if (skipIntro && video.currentTime >= skipIntro[0] && video.currentTime < skipIntro[1]) {
        setShowSkipIntro(true)
      } else {
        setShowSkipIntro(false)
      }

      if (skipOutro && video.currentTime >= skipOutro[0] && video.currentTime < skipOutro[1]) {
        setShowSkipOutro(true)
      } else {
        setShowSkipOutro(false)
      }
    }

    const updateDuration = () => setDuration(video.duration)
    const updateBuffered = () => {
      if (video.buffered.length > 0) {
        const end = video.buffered.end(video.buffered.length - 1)
        setBuffered((end / video.duration) * 100)
        onProgress?.(end)
      }
    }

    const handlePlay = () => {
      setPlaying(true)
      setIsBuffering(false)
      onPlay?.()
    }

    const handlePause = () => {
      setPlaying(false)
      onPause?.()
    }

    const handleEnded = () => {
      setPlaying(false)
      if (playlist.length > 0 && queueIndex < playlist.length - 1) {
        handleNext()
      }
      onEnded?.()
    }

    const handleWaiting = () => setIsBuffering(true)
    const handleCanPlay = () => setIsBuffering(false)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('progress', updateBuffered)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('progress', updateBuffered)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [onPlay, onPause, onEnded, onTimeUpdate, onProgress, skipIntro, skipOutro, playlist, queueIndex])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (playing) {
      video.pause()
    } else {
      video.play()
    }
  }

  const handleSeek = (clientX: number, container: HTMLDivElement) => {
    const video = videoRef.current
    if (!video) return

    const rect = container.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    video.currentTime = percent * video.duration
  }

  const handleVolumeChange = (clientY: number, container: HTMLDivElement) => {
    const video = videoRef.current
    if (!video) return

    const rect = container.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height))
    video.volume = percent
    setVolume(percent)
    setVolumeMuted(percent === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (volumeMuted) {
      video.volume = volume || 0.5
      setVolume(volume || 0.5)
      setVolumeMuted(false)
    } else {
      video.volume = 0
      setVolumeMuted(true)
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const togglePiP = async () => {
    const video = videoRef.current
    if (!video || !document.pictureInPictureEnabled) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
        setIsPiP(false)
      } else {
        if ('requestPictureInPicture' in video) {
          await video.requestPictureInPicture()
          setIsPiP(true)
        }
      }
    } catch (error) {
      console.error('PiP failed:', error)
    }
  }

  const changeQuality = (quality: Quality) => {
    const video = videoRef.current
    if (!video) return

    const currentTimeBackup = video.currentTime
    setSelectedQuality(quality)
    onQualityChange?.(quality)

    setTimeout(() => {
      if (video) {
        video.currentTime = currentTimeBackup
        if (playing) video.play()
      }
    }, 100)
  }

  const changePlaybackRate = (rate: PlaybackSpeed) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const handleNext = () => {
    if (playlist.length > 0) {
      const nextIndex = (queueIndex + 1) % playlist.length
      setQueueIndex(nextIndex)
      const nextVideo = playlist[nextIndex]
      onVideoChange?.(nextVideo, nextIndex)
    }
    onNext?.()
  }

  const handlePrevious = () => {
    if (playlist.length > 0) {
      const prevIndex = (queueIndex - 1 + playlist.length) % playlist.length
      setQueueIndex(prevIndex)
      const prevVideo = playlist[prevIndex]
      onVideoChange?.(prevVideo, prevIndex)
    }
    onPrevious?.()
  }

  const skipToTime = (time: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = time
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 3000)
  }

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const video = videoRef.current
      if (!video) return

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
        case 'j':
          e.preventDefault()
          video.currentTime = Math.max(0, video.currentTime - 10)
          break
        case 'ArrowRight':
        case 'l':
          e.preventDefault()
          video.currentTime = Math.min(video.duration, video.currentTime + 10)
          break
        case 'ArrowUp':
          e.preventDefault()
          video.volume = Math.min(1, video.volume + 0.1)
          setVolume(video.volume)
          break
        case 'ArrowDown':
          e.preventDefault()
          video.volume = Math.max(0, video.volume - 0.1)
          setVolume(video.volume)
          break
        case 'm':
          e.preventDefault()
          toggleMute()
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'i':
          e.preventDefault()
          togglePiP()
          break
        case 'c':
          e.preventDefault()
          setShowSubtitlesMenu(!showSubtitlesMenu)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playing, showSubtitlesMenu])

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (subtitles.length > 0) {
      const tracks = video.textTracks
      for (let i = 0; i < tracks.length; i++) {
        if (selectedSubtitleIndex !== null && i === selectedSubtitleIndex) {
          tracks[i].mode = 'showing'
        } else {
          tracks[i].mode = 'hidden'
        }
      }
    }
  }, [selectedSubtitleIndex, subtitles])

  const containerClasses = `${getContainerClasses(variant, style, resolvedColorMode)} ${SIZE_MAP[size].width} ${SIZE_MAP[size].height} ${ASPECT_RATIO_MAP[aspectRatio]} ${className} ${reducedMotion ? 'transition-none' : ''}`
  const textColor = resolvedColorMode === 'dark' ? 'text-white' : 'text-gray-800'
  const bgColor = resolvedColorMode === 'dark' ? 'bg-black/80' : 'bg-white/95'
  const buttonBg = resolvedColorMode === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/8 hover:bg-gray-900/15 border border-gray-200/50'

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
      aria-label={ariaLabel || `Video player: ${title}`}
    >
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        poster={poster}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline={playsinline}
        onClick={togglePlay}
      >
        {subtitles.map((sub, i) => (
          <track
            key={i}
            kind='subtitles'
            src={sub.src}
            srcLang={sub.srclang}
            label={sub.label}
            default={sub.default}
          />
        ))}
      </video>

      {isBuffering && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-30'>
          <Loader2 className={`animate-spin ${textColor}`} size={48} />
        </div>
      )}

      {(showSkipIntro || showSkipOutro) && (
        <div className='absolute top-20 right-4 z-30'>
          <button
            onClick={() => skipToTime(showSkipIntro ? skipIntro![1] : skipOutro![1])}
            className={`px-4 py-2 ${bgColor} ${textColor} rounded-lg backdrop-blur-md hover:scale-105 transition-transform`}
          >
            {showSkipIntro ? 'Skip Intro' : 'Skip Outro'}
          </button>
        </div>
      )}

      <div
        className={`absolute inset-0 ${resolvedColorMode === 'dark'
          ? 'bg-linear-to-t from-black/90 via-transparent to-transparent'
          : 'bg-linear-to-t from-white/95 via-transparent to-transparent'
          } transition-opacity duration-300 pointer-events-none z-10 ${showControls ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {controls && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 z-20 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className='space-y-2'>
            <div
              className={`relative h-1 ${resolvedColorMode === 'dark' ? 'bg-white/20' : 'bg-gray-900/20'} rounded-full cursor-pointer group`}
              onMouseDown={(e) => {
                dragging.current = true
                handleSeek(e.clientX, e.currentTarget)
              }}
              onMouseMove={(e) => {
                if (dragging.current) {
                  handleSeek(e.clientX, e.currentTarget)
                }
              }}
              onMouseUp={() => (dragging.current = false)}
            >
              <div
                className={`absolute h-full ${resolvedColorMode === 'dark' ? 'bg-white/30' : 'bg-gray-900/25'} rounded-full`}
                style={{ width: `${buffered}%` }}
              />
              <div
                className='absolute h-full bg-emerald-500 rounded-full'
                style={{ width: `${progress}%` }}
              />
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 ${resolvedColorMode === 'dark' ? 'bg-white' : 'bg-emerald-600'} rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity`}
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                {onPrevious && (
                  <button
                    onClick={handlePrevious}
                    className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform`}
                    aria-label='Previous video'
                  >
                    <SkipBack size={20} />
                  </button>
                )}

                <button
                  onClick={togglePlay}
                  className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform`}
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? <Pause size={24} /> : <Play size={24} />}
                </button>

                {onNext && (
                  <button
                    onClick={handleNext}
                    className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform`}
                    aria-label='Next video'
                  >
                    <SkipForward size={20} />
                  </button>
                )}

                <div className='relative group'>
                  <button
                    onClick={toggleMute}
                    className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform`}
                    aria-label={volumeMuted ? 'Unmute' : 'Mute'}
                  >
                    {volumeMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto'>
                    <div
                      className={`w-8 h-24 ${bgColor} ${resolvedColorMode === 'dark' ? '' : 'border border-gray-200 shadow-lg'} rounded-lg backdrop-blur-md relative`}
                      onMouseDown={(e) => {
                        volumeDragging.current = true
                        handleVolumeChange(e.clientY, e.currentTarget)
                      }}
                      onMouseMove={(e) => {
                        if (volumeDragging.current) {
                          handleVolumeChange(e.clientY, e.currentTarget)
                        }
                      }}
                      onMouseUp={() => (volumeDragging.current = false)}
                    >
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-full ${resolvedColorMode === 'dark' ? 'bg-white/20' : 'bg-gray-900/20'} rounded-full`} />
                      <div
                        className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1 bg-emerald-500 rounded-full'
                        style={{ height: `${(volumeMuted ? 0 : volume) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <span className={`text-sm ${textColor}`}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                {subtitles.length > 0 && (
                  <div className='relative'>
                    <button
                      onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}
                      className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform ${selectedSubtitleIndex !== null ? 'bg-emerald-500/30' : ''}`}
                      aria-label='Subtitles menu'
                    >
                      <Subtitles size={20} />
                    </button>

                    {showSubtitlesMenu && (
                      <div className={`absolute bottom-full right-0 mb-2 w-48 ${bgColor} backdrop-blur-md rounded-lg shadow-xl p-2 space-y-1`}>
                        <div className='text-xs font-medium opacity-60 px-2 py-1'>Subtitles</div>

                        <button
                          onClick={() => {
                            setSelectedSubtitleIndex(null)
                            setShowSubtitlesMenu(false)
                          }}
                          className={`w-full text-left px-2 py-1 text-sm rounded ${selectedSubtitleIndex === null ? 'bg-emerald-500/20' : 'hover:bg-white/10'
                            }`}
                        >
                          Off
                        </button>

                        {subtitles.map((subtitle, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedSubtitleIndex(index)
                              setShowSubtitlesMenu(false)
                            }}
                            className={`w-full text-left px-2 py-1 text-sm rounded ${selectedSubtitleIndex === index ? 'bg-emerald-500/20' : 'hover:bg-white/10'
                              }`}
                          >
                            {subtitle.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className='relative'>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform`}
                    aria-label='Settings'
                  >
                    <Settings size={20} />
                  </button>

                  {showSettings && (
                    <div className={`absolute bottom-full right-0 mb-2 w-48 ${bgColor} ${resolvedColorMode === 'dark' ? '' : 'border border-gray-200 shadow-xl'} backdrop-blur-md rounded-lg p-2 space-y-1`}>
                      <div className='text-xs font-medium opacity-60 px-2 py-1'>Quality</div>
                      {sources.map((source) => (
                        <button
                          key={source.quality}
                          onClick={() => {
                            changeQuality(source.quality)
                            setShowSettings(false)
                          }}
                          className={`w-full text-left px-2 py-1 text-sm rounded ${selectedQuality === source.quality ? 'bg-emerald-500/20' : 'hover:bg-white/10'
                            }`}
                        >
                          {source.quality}
                        </button>
                      ))}

                      <div className='text-xs font-medium opacity-60 px-2 py-1 mt-2'>Speed</div>
                      {PLAYBACK_SPEEDS.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            changePlaybackRate(speed)
                            setShowSettings(false)
                          }}
                          className={`w-full text-left px-2 py-1 text-sm rounded ${playbackRate === speed ? 'bg-emerald-500/20' : 'hover:bg-white/10'
                            }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={togglePiP}
                  className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform ${isPiP ? 'bg-emerald-500/30' : ''}`}
                  aria-label='Picture in Picture'
                >
                  <PictureInPicture size={20} />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className={`p-2 ${buttonBg} rounded-lg ${textColor} hover:scale-110 transition-transform`}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='absolute top-4 right-4 z-20'>
        <div className={`flex items-center gap-2 ${bgColor} backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium ${textColor}`}>
          {getDeviceIcon(activeDeviceType, 14)}
          <span>{activeDeviceLabel}</span>
        </div>
      </div>
    </div>
  )
}