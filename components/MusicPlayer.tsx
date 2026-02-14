'use client'

import React from 'react'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Plus, Loader2, Laptop, Smartphone, Volume2, VolumeX, Tablet, Monitor, Watch } from 'lucide-react'
import Hls from 'hls.js'
import { useAudioPlayer } from '@/contexts/AudioPlayerContext'

type Variant =
  | 'default'
  | 'glass'
  | 'minimal'
  | 'neon'
  | 'soft'
  | 'elevated'

type Style =
  | 'filled'
  | 'outline'
  | 'ghost'
  | 'soft'
  | 'blur'
  | 'flat'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type DeviceType = 'smartphone' | 'tablet' | 'laptop' | 'desktop' | 'watch' | 'unknown'

type Track = {
  id: string
  name: string
  artist: string
  cover: string
  audioSrc?: string
}

type VisualizerType = 'bars' | 'waveform' | 'circle' | 'none'

type ColorMode = 'light' | 'dark' | 'auto'

type MusicPlayerProps = {
  id?: string
  trackName: string
  artist: string
  cover: string
  audioSrc?: string

  variant?: Variant
  style?: Style
  size?: Size

  deviceLabel?: string
  deviceType?: DeviceType
  loading?: boolean
  initialProgress?: number

  playlist?: Track[]
  currentTrackIndex?: number

  visualizer?: VisualizerType
  visualizerColor?: string

  colorMode?: ColorMode
  reducedMotion?: boolean

  useGlobalState?: boolean

  onPlayToggle?: (playing: boolean) => void
  onNext?: () => void
  onPrevious?: () => void
  onShuffle?: () => void
  onAdd?: () => void
  onTrackChange?: (track: Track, index: number) => void

  className?: string
}

const SIZE_MAP: Record<Size, string> = {
  xs: 'w-56 p-3 text-xs',
  sm: 'w-64 p-4 text-sm',
  md: 'w-80 p-5 text-sm',
  lg: 'w-96 p-6 text-base',
  xl: 'w-[26rem] p-7 text-base',
  '2xl': 'w-[30rem] p-8 text-lg'
}

const CONTROL_SIZE_MAP: Record<Size, number> = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 22,
  xl: 24,
  '2xl': 28
}

function detectDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'

  const ua = navigator.userAgent.toLowerCase()
  const width = window.innerWidth

  if (/(iphone|ipod|android.*mobile|windows phone)/i.test(ua)) return 'smartphone'
  if (/(ipad|android(?!.*mobile)|tablet)/i.test(ua)) return 'tablet'
  if (/watch/i.test(ua)) return 'watch'
  if (width < 768) return 'smartphone'
  if (width < 1024) return 'tablet'
  if (/macintosh|mac os x/i.test(ua)) return 'laptop'

  return 'desktop'
}

function getDeviceIcon(deviceType: DeviceType, size: number = 14) {
  const icons: Record<DeviceType, React.JSX.Element> = {
    smartphone: <Smartphone size={size} />,
    tablet: <Tablet size={size} />,
    laptop: <Laptop size={size} />,
    desktop: <Monitor size={size} />,
    watch: <Watch size={size} />,
    unknown: <Laptop size={size} />
  }
  return icons[deviceType]
}

function getDeviceLabel(deviceType: DeviceType): string {
  const labels: Record<DeviceType, string> = {
    smartphone: 'SMARTPHONE',
    tablet: 'TABLET',
    laptop: 'LAPTOP',
    desktop: 'DESKTOP',
    watch: 'WATCH',
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
  const base = 'relative aspect-2/1 rounded-2xl overflow-hidden transition-all duration-300'

  const darkVariants: Record<Variant, string> = {
    default: 'text-white shadow-lg',
    glass: 'text-white shadow-lg backdrop-blur-xl',
    minimal: 'text-white/90',
    neon: 'text-white shadow-[0_0_30px_rgba(16,185,129,0.45)] border border-emerald-400/30',
    soft: 'text-white shadow-md bg-white/10 backdrop-blur-md',
    elevated: 'text-white shadow-2xl'
  }

  const lightVariants: Record<Variant, string> = {
    default: 'text-gray-900 shadow-lg',
    glass: 'text-gray-900 shadow-lg backdrop-blur-xl',
    minimal: 'text-gray-900/90',
    neon: 'text-gray-900 shadow-[0_0_30px_rgba(16,185,129,0.25)] border border-emerald-500/40',
    soft: 'text-gray-900 shadow-md bg-black/5 backdrop-blur-md',
    elevated: 'text-gray-900 shadow-2xl'
  }

  const variants = colorMode === 'dark' ? darkVariants : lightVariants

  const styles: Record<Style, string> = {
    filled: '',
    outline: colorMode === 'dark' ? 'border border-white/30' : 'border border-gray-900/30',
    ghost: 'shadow-none',
    soft: colorMode === 'dark' ? 'bg-white/5' : 'bg-black/5',
    blur: colorMode === 'dark' ? 'backdrop-blur-xl bg-white/10' : 'backdrop-blur-xl bg-black/10',
    flat: colorMode === 'dark' ? 'shadow-none border border-white/10' : 'shadow-none border border-gray-900/10'
  }

  return `${base} ${variants[variant]} ${styles[style]}`
}

function getOverlayClasses(variant: Variant, colorMode: 'light' | 'dark') {
  const darkOverlays: Record<Variant, string> = {
    default: 'bg-black/30 backdrop-blur-[1px]',
    glass: 'bg-black/20 backdrop-blur-sm',
    minimal: 'bg-black/40',
    neon: 'bg-emerald-950/40 backdrop-blur-[2px]',
    soft: 'bg-black/25 backdrop-blur-sm',
    elevated: 'bg-black/35 backdrop-blur-[1px]'
  }

  const lightOverlays: Record<Variant, string> = {
    default: 'bg-white/30 backdrop-blur-[1px]',
    glass: 'bg-white/40 backdrop-blur-sm',
    minimal: 'bg-white/50',
    neon: 'bg-emerald-50/50 backdrop-blur-[2px]',
    soft: 'bg-white/35 backdrop-blur-sm',
    elevated: 'bg-white/40 backdrop-blur-[1px]'
  }

  return colorMode === 'dark' ? darkOverlays[variant] : lightOverlays[variant]
}

function getVisualizerColor(variant: Variant, colorMode: 'light' | 'dark', customColor?: string): string {
  if (customColor) return customColor

  const darkColors: Record<Variant, string> = {
    default: 'rgba(255, 255, 255, 0.8)',
    glass: 'rgba(255, 255, 255, 0.9)',
    minimal: 'rgba(255, 255, 255, 0.7)',
    neon: 'rgba(16, 185, 129, 0.9)',
    soft: 'rgba(255, 255, 255, 0.85)',
    elevated: 'rgba(255, 255, 255, 0.9)'
  }

  const lightColors: Record<Variant, string> = {
    default: 'rgba(0, 0, 0, 0.8)',
    glass: 'rgba(0, 0, 0, 0.7)',
    minimal: 'rgba(0, 0, 0, 0.6)',
    neon: 'rgba(16, 185, 129, 0.9)',
    soft: 'rgba(0, 0, 0, 0.7)',
    elevated: 'rgba(0, 0, 0, 0.8)'
  }

  return colorMode === 'dark' ? darkColors[variant] : lightColors[variant]
}

function isHLS(url: string): boolean {
  return url.includes('.m3u8') || url.includes('.m3u')
}

function isDASH(url: string): boolean {
  return url.includes('.mpd')
}

function isFiniteDuration(duration?: number | null) {
  return typeof duration === 'number' && Number.isFinite(duration) && duration > 0
}

function isLiveAudio(audio?: HTMLAudioElement | null) {
  if (!audio) return true
  if (!isFiniteDuration(audio?.duration)) return true
  if (audio?.seekable && audio.seekable.length > 0) {
    const end = audio.seekable.end(audio.seekable.length - 1)
    if (!isFiniteDuration(end)) return true
  } else if (audio?.seekable && audio.seekable.length === 0) {
    return true
  }
  return false
}

export function MusicPlayer({
  id,
  trackName,
  artist,
  cover,
  audioSrc,

  variant = 'default',
  style = 'filled',
  size = 'md',

  deviceLabel,
  deviceType,
  loading = false,
  initialProgress = 0,

  playlist = [],
  currentTrackIndex = 0,

  visualizer = 'none',
  visualizerColor,

  colorMode = 'auto',
  reducedMotion = false,

  useGlobalState = false,

  onPlayToggle,
  onNext,
  onPrevious,
  onShuffle,
  onAdd,
  onTrackChange,

  className = ''
}: MusicPlayerProps) {
  const playerId = React.useId()
  const finalId = id || playerId

  const globalPlayer = useGlobalState ? useAudioPlayer() : null

  const [localPlaying, setLocalPlaying] = React.useState(false)
  const [localProgress, setLocalProgress] = React.useState(initialProgress)
  const [localVolume, setLocalVolume] = React.useState(1)
  const [localMuted, setLocalMuted] = React.useState(false)
  const [desktop, setDesktop] = React.useState(true)
  const [localBuffered, setLocalBuffered] = React.useState(0)
  const [localBuffering, setLocalBuffering] = React.useState(false)
  const [detectedDevice, setDetectedDevice] = React.useState<DeviceType>('desktop')
  const [localQueue, setLocalQueue] = React.useState<Track[]>([])
  const [localQueueIndex, setLocalQueueIndex] = React.useState(0)
  const [localCurrentTrack, setLocalCurrentTrack] = React.useState<Track | null>(null)
  const [resolvedColorMode, setResolvedColorMode] = React.useState<'light' | 'dark'>('dark')

  const playing = useGlobalState ? (globalPlayer?.state.isPlaying && globalPlayer.isActivePlayer(finalId)) : localPlaying
  const progress = useGlobalState ? globalPlayer?.state.progress ?? 0 : localProgress
  const volume = useGlobalState ? globalPlayer?.state.volume ?? 1 : localVolume
  const muted = useGlobalState ? globalPlayer?.state.muted : localMuted
  const buffered = useGlobalState ? globalPlayer?.state.buffered ?? 0 : localBuffered
  const isBuffering = useGlobalState ? globalPlayer?.state.isBuffering : localBuffering
  const queue = useGlobalState ? globalPlayer?.state.queue ?? [] : localQueue
  const queueIndex = useGlobalState ? globalPlayer?.state.queueIndex ?? 0 : localQueueIndex
  const currentTrack = useGlobalState ? globalPlayer?.state.currentTrack : localCurrentTrack

  const audioRef = React.useRef<HTMLAudioElement>(null)
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const volumeRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const dragging = React.useRef(false)
  const draggingVolume = React.useRef(false)
  const initializedRef = React.useRef(false)
  const audioContextRef = React.useRef<AudioContext | null>(null)
  const analyzerRef = React.useRef<AnalyserNode | null>(null)
  const sourceRef = React.useRef<MediaElementAudioSourceNode | null>(null)
  const animationIdRef = React.useRef<number | null>(null)
  const hlsRef = React.useRef<Hls | null>(null)

  const hasMediaSession = typeof navigator !== 'undefined' && 'mediaSession' in navigator

  React.useEffect(() => {
    if (useGlobalState && globalPlayer) {
      globalPlayer.registerPlayer(finalId)
      return () => globalPlayer.unregisterPlayer(finalId)
    }
  }, [useGlobalState, globalPlayer, finalId])

  React.useEffect(() => {
    const check = () => {
      setDesktop(window.innerWidth >= 768)
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

  React.useEffect(() => {
    if (!initializedRef.current && playlist.length > 0) {
      if (useGlobalState && globalPlayer) {
        globalPlayer.setQueue(playlist, currentTrackIndex)
      } else {
        setLocalQueue(playlist)
        if (currentTrackIndex < playlist.length) {
          setLocalQueueIndex(currentTrackIndex)
          setLocalCurrentTrack(playlist[currentTrackIndex])
        }
      }
      initializedRef.current = true
    }
  }, [])

  const activeDeviceType = deviceType || detectedDevice
  const activeDeviceLabel = deviceLabel || getDeviceLabel(activeDeviceType)
  const DeviceIcon = getDeviceIcon(activeDeviceType, 14)

  const setupHLS = React.useCallback((url: string) => {
    if (!audioRef.current) return

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }

      hlsRef.current = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      })

      hlsRef.current.loadSource(url)
      hlsRef.current.attachMedia(audioRef.current)

      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (useGlobalState) {
          globalPlayer?.setBuffering(false)
        } else {
          setLocalBuffering(false)
        }
      })

      hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS fatal error:', data)
          if (useGlobalState) {
            globalPlayer?.setBuffering(false)
          } else {
            setLocalBuffering(false)
          }
        }
      })
    } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      audioRef.current.src = url
    }
  }, [useGlobalState, globalPlayer])

  const setupAudioContext = React.useCallback(() => {
    if (!audioRef.current || sourceRef.current) return

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContextClass()

      analyzerRef.current = audioContextRef.current.createAnalyser()
      analyzerRef.current.fftSize = 256
      analyzerRef.current.smoothingTimeConstant = 0.8

      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
      sourceRef.current.connect(analyzerRef.current)
      analyzerRef.current.connect(audioContextRef.current.destination)
    } catch (error) {
      console.error('Failed to setup audio context:', error)
    }
  }, [])

  const drawVisualizer = React.useCallback(() => {
    if (!canvasRef.current || !analyzerRef.current || visualizer === 'none') return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bufferLength = analyzerRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!playing) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
          animationIdRef.current = null
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      animationIdRef.current = requestAnimationFrame(draw)
      analyzerRef.current!.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const color = getVisualizerColor(variant, resolvedColorMode, visualizerColor)

      if (visualizer === 'bars') {
        const barCount = 60
        const barWidth = canvas.width / barCount
        const step = Math.floor(bufferLength / barCount)

        for (let i = 0; i < barCount; i++) {
          const barHeight = (dataArray[i * step] / 255) * canvas.height * 0.8
          const x = i * barWidth
          const y = canvas.height - barHeight

          ctx.fillStyle = color
          ctx.fillRect(x, y, barWidth - 1, barHeight)
        }
      } else if (visualizer === 'waveform') {
        ctx.lineWidth = 2
        ctx.strokeStyle = color
        ctx.beginPath()

        const sliceWidth = canvas.width / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 255.0
          const y = v * canvas.height

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          x += sliceWidth
        }

        ctx.stroke()
      } else if (visualizer === 'circle') {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = Math.min(canvas.width, canvas.height) * 0.3

        ctx.strokeStyle = color
        ctx.lineWidth = 2

        const points = 64
        const step = Math.floor(bufferLength / points)

        ctx.beginPath()
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2
          const amp = dataArray[i * step] / 255
          const r = radius + amp * radius * 0.5
          const x = centerX + Math.cos(angle) * r
          const y = centerY + Math.sin(angle) * r

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.stroke()
      }
    }

    draw()
  }, [playing, variant, visualizer, visualizerColor, resolvedColorMode])

  React.useEffect(() => {
    if (playing && visualizer !== 'none') {
      drawVisualizer()
    }
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
    }
  }, [playing, visualizer, drawVisualizer])

  const playTrack = React.useCallback(async (index: number) => {
    if (index < 0 || index >= queue.length) return

    const track = queue[index]

    if (useGlobalState && globalPlayer) {
      globalPlayer.setQueue(queue, index)
      await globalPlayer.play(finalId, track)
    } else {
      setLocalQueueIndex(index)
      setLocalCurrentTrack(track)

      if (audioRef.current && track.audioSrc) {
        if (isHLS(track.audioSrc)) {
          setupHLS(track.audioSrc)
        } else {
          audioRef.current.src = track.audioSrc
        }
        await audioRef.current.play()
        setLocalPlaying(true)
      }
    }

    onTrackChange?.(track, index)
  }, [queue, useGlobalState, globalPlayer, finalId, onTrackChange, setupHLS])

  const handleNext = React.useCallback(() => {
    if (queue.length > 0) {
      const nextIndex = (queueIndex + 1) % queue.length
      playTrack(nextIndex)
    } else if (useGlobalState && globalPlayer) {
      globalPlayer.next()
    }
    onNext?.()
  }, [queue.length, queueIndex, playTrack, useGlobalState, globalPlayer, onNext])

  const handlePrevious = React.useCallback(() => {
    if (queue.length > 0) {
      const prevIndex = (queueIndex - 1 + queue.length) % queue.length
      playTrack(prevIndex)
    } else if (useGlobalState && globalPlayer) {
      globalPlayer.previous()
    }
    onPrevious?.()
  }, [queue.length, queueIndex, playTrack, useGlobalState, globalPlayer, onPrevious])

  const handleShuffle = React.useCallback(() => {
    if (useGlobalState && globalPlayer) {
      globalPlayer.shuffle()
    } else if (queue.length > 0) {
      const currentTrackData = queue[queueIndex]
      const shuffled = [...queue].sort(() => Math.random() - 0.5)
      const newIndex = shuffled.findIndex(t => t.id === currentTrackData.id)

      setLocalQueue(shuffled)
      setLocalQueueIndex(newIndex >= 0 ? newIndex : 0)
    }
    onShuffle?.()
  }, [queue, queueIndex, useGlobalState, globalPlayer, onShuffle])

  const updateMetadata = React.useCallback(() => {
    if (!hasMediaSession) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack?.name || trackName,
      artist: currentTrack?.artist || artist,
      album: 'Web Player',
      artwork: [
        { src: currentTrack?.cover || cover, sizes: '48x48', type: 'image/png' },
        { src: currentTrack?.cover || cover, sizes: '96x96', type: 'image/png' },
        { src: currentTrack?.cover || cover, sizes: '192x192', type: 'image/png' },
        { src: currentTrack?.cover || cover, sizes: '512x512', type: 'image/png' },
        { src: currentTrack?.cover || cover, sizes: '1024x1024', type: 'image/png' }
      ]
    })
  }, [trackName, artist, cover, currentTrack, hasMediaSession])

  const updatePlaybackState = React.useCallback((state: 'playing' | 'paused') => {
    if (!hasMediaSession) return
    navigator.mediaSession.playbackState = state
  }, [hasMediaSession])

  const updatePositionState = React.useCallback(() => {
    if (!hasMediaSession) return
    const audio = audioRef.current
    if (!audio || !isFiniteDuration(audio.duration)) return
    try {
      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        position: audio.currentTime,
        playbackRate: audio.playbackRate
      })
    } catch { }
  }, [hasMediaSession])

  const registerHandlers = React.useCallback(() => {
    if (!hasMediaSession) return
    const audio = audioRef.current
    if (!audio) return

    navigator.mediaSession.setActionHandler('play', async () => {
      await audio.play()
      if (useGlobalState && globalPlayer) {
        await globalPlayer.play(finalId)
      } else {
        setLocalPlaying(true)
      }
      updatePlaybackState('playing')
    })

    navigator.mediaSession.setActionHandler('pause', () => {
      audio.pause()
      if (useGlobalState && globalPlayer) {
        globalPlayer.pause(finalId)
      } else {
        setLocalPlaying(false)
      }
      updatePlaybackState('paused')
    })

    navigator.mediaSession.setActionHandler('previoustrack', handlePrevious)
    navigator.mediaSession.setActionHandler('nexttrack', handleNext)
  }, [hasMediaSession, handleNext, handlePrevious, updatePlaybackState, useGlobalState, globalPlayer, finalId])

  React.useEffect(() => {
    updateMetadata()
    registerHandlers()
  }, [updateMetadata, registerHandlers])

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgressState = () => {
      if (!audio.duration) return
      const newProgress = (audio.currentTime / audio.duration) * 100

      if (useGlobalState && globalPlayer) {
        globalPlayer.setProgress(newProgress)
      } else {
        setLocalProgress(newProgress)
      }

      updatePositionState()

      if (audio.buffered.length > 0) {
        const end = audio.buffered.end(audio.buffered.length - 1)
        const newBuffered = (end / audio.duration) * 100

        if (useGlobalState && globalPlayer) {
          globalPlayer.setBuffered(newBuffered)
        } else {
          setLocalBuffered(newBuffered)
        }
      }
    }

    const onWaiting = () => {
      if (useGlobalState && globalPlayer) {
        globalPlayer.setBuffering(true)
      } else {
        setLocalBuffering(true)
      }
    }

    const onPlaying = () => {
      if (useGlobalState && globalPlayer) {
        globalPlayer.setBuffering(false)
      } else {
        setLocalBuffering(false)
      }
    }

    const onCanPlay = () => {
      if (useGlobalState && globalPlayer) {
        globalPlayer.setBuffering(false)
      } else {
        setLocalBuffering(false)
      }
    }

    const onEnded = () => {
      if (queue.length > 0) handleNext()
    }

    audio.addEventListener('timeupdate', updateProgressState)
    audio.addEventListener('ratechange', updateProgressState)
    audio.addEventListener('loadedmetadata', updateProgressState)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('stalled', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('canplaythrough', onCanPlay)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgressState)
      audio.removeEventListener('ratechange', updateProgressState)
      audio.removeEventListener('loadedmetadata', updateProgressState)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('stalled', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('ended', onEnded)
    }
  }, [updatePositionState, queue.length, handleNext, useGlobalState, globalPlayer])

  React.useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!sourceRef.current && visualizer !== 'none') {
      setupAudioContext()
    }

    if (playing) {
      audio.pause()
      if (useGlobalState && globalPlayer) {
        globalPlayer.pause(finalId)
      } else {
        setLocalPlaying(false)
      }
      updatePlaybackState('paused')
      onPlayToggle?.(false)
    } else {
      if (audioSrc) {
        if (isHLS(audioSrc)) {
          setupHLS(audioSrc)
        } else if (!audio.src || audio.src !== audioSrc) {
          audio.src = audioSrc
        }
      }

      await audio.play()
      if (useGlobalState && globalPlayer) {
        await globalPlayer.play(finalId, currentTrack || { id: finalId, name: trackName, artist, cover, audioSrc })
      } else {
        setLocalPlaying(true)
      }
      updatePlaybackState('playing')
      onPlayToggle?.(true)
    }
  }

  const updateProgress = (clientX: number) => {
    if (!sliderRef.current || !audioRef.current) return
    const audio = audioRef.current
    if (!isFiniteDuration(audio.duration)) return
    const rect = sliderRef.current.getBoundingClientRect()
    let value = (clientX - rect.left) / rect.width
    value = Math.min(Math.max(value, 0), 1)
    audio.currentTime = value * audio.duration

    const newProgress = value * 100
    if (useGlobalState && globalPlayer) {
      globalPlayer.setProgress(newProgress)
    } else {
      setLocalProgress(newProgress)
    }
    updatePositionState()
  }

  const startDrag = (clientX: number) => {
    dragging.current = true
    updateProgress(clientX)
  }

  React.useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && updateProgress(e.clientX)
    const up = () => (dragging.current = false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  const updateVolume = (clientY: number) => {
    if (!volumeRef.current || !audioRef.current) return
    const rect = volumeRef.current.getBoundingClientRect()
    let value = 1 - (clientY - rect.top) / rect.height
    value = Math.min(Math.max(value, 0), 1)
    audioRef.current.volume = value

    if (useGlobalState && globalPlayer) {
      globalPlayer.setVolume(value)
      globalPlayer.setMuted(value === 0)
    } else {
      setLocalVolume(value)
      setLocalMuted(value === 0)
    }
  }

  const startVolumeDrag = (clientY: number) => {
    draggingVolume.current = true
    updateVolume(clientY)
  }

  React.useEffect(() => {
    const move = (e: MouseEvent) => draggingVolume.current && updateVolume(e.clientY)
    const up = () => (draggingVolume.current = false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  const containerClasses = `${getContainerClasses(variant, style, resolvedColorMode)} ${SIZE_MAP[size]} ${className} ${reducedMotion ? 'transition-none' : ''}`
  const controlSize = CONTROL_SIZE_MAP[size]
  const isLive = isLiveAudio(audioRef.current)

  const displayTrack = currentTrack || { name: trackName, artist, cover }
  const displayAudioSrc = currentTrack?.audioSrc || audioSrc

  const textColor = resolvedColorMode === 'dark' ? 'text-white' : 'text-gray-900'
  const badgeBg = resolvedColorMode === 'dark' ? 'bg-emerald-200' : 'bg-emerald-100'
  const badgeText = resolvedColorMode === 'dark' ? 'text-emerald-900' : 'text-emerald-800'

  return (
    <article
      className={containerClasses}
      style={{
        backgroundImage: `url(${displayTrack.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      role='region'
      aria-label={`Music player for ${displayTrack.name} by ${displayTrack.artist}`}
      tabIndex={0}
    >
      {displayAudioSrc && <audio ref={audioRef} preload='metadata' crossOrigin='anonymous' />}

      <div className={`absolute inset-0 ${getOverlayClasses(variant, resolvedColorMode)}`} />

      {visualizer !== 'none' && (
        <canvas
          ref={canvasRef}
          className='absolute inset-0 w-full h-full opacity-40 pointer-events-none z-5'
          width={800}
          height={400}
        />
      )}

      {(loading || isBuffering) && (
        <div className='absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm'>
          <Loader2 className={`animate-spin ${textColor} ${reducedMotion ? 'motion-reduce:animate-none' : ''}`} size={32} />
        </div>
      )}

      <div className={`relative z-10 flex h-full flex-col justify-between ${textColor}`}>
        <div className='flex items-center justify-between'>
          {DeviceIcon}
          <div className={`flex items-center gap-1 rounded-full ${badgeBg} px-2 py-1 text-xs font-medium ${badgeText}`}>
            {DeviceIcon}
            <span>{activeDeviceLabel}</span>
          </div>
        </div>

        <div className='flex items-center justify-between w-full'>
          <div>
            <h4 className='font-semibold'>{displayTrack.name}</h4>
            <p className='opacity-80'>{displayTrack.artist}</p>
            {queue.length > 0 && (
              <p className='text-xs opacity-60 mt-1'>
                {queueIndex + 1} / {queue.length}
              </p>
            )}
          </div>
          {isLive && playing && <span className='text-xs font-medium uppercase tracking-wide text-emerald-400 ml-2'>LIVE</span>}
        </div>

        <div className='flex items-center justify-center gap-4 mt-2'>
          {(onPrevious || queue.length > 0) && (
            <ActionButton onClick={handlePrevious} style={style} size={size} colorMode={resolvedColorMode} reducedMotion={reducedMotion}>
              <SkipBack size={controlSize} />
            </ActionButton>
          )}

          <ActionButton onClick={togglePlay} style={style} size={size} colorMode={resolvedColorMode} reducedMotion={reducedMotion}>
            {playing ? <Pause size={controlSize + 6} /> : <Play size={controlSize + 6} />}
          </ActionButton>

          {(onNext || queue.length > 0) && (
            <ActionButton onClick={handleNext} style={style} size={size} colorMode={resolvedColorMode} reducedMotion={reducedMotion}>
              <SkipForward size={controlSize} />
            </ActionButton>
          )}

          {onShuffle && (
            <ActionButton onClick={handleShuffle} style={style} size={size} colorMode={resolvedColorMode} reducedMotion={reducedMotion}>
              <Shuffle size={controlSize} />
            </ActionButton>
          )}

          {onAdd && (
            <ActionButton onClick={onAdd} style={style} size={size} colorMode={resolvedColorMode} reducedMotion={reducedMotion}>
              <Plus size={controlSize} />
            </ActionButton>
          )}

          <div
            ref={sliderRef}
            onMouseDown={(e) => { if (!isFiniteDuration(audioRef.current?.duration)) return; startDrag(e.clientX) }}
            className={`relative h-2 w-full ${isFiniteDuration(audioRef.current?.duration) ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
            role='slider'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label='Track progress'
          >
            <div className={`absolute inset-0 rounded-full ${resolvedColorMode === 'dark' ? 'bg-white/20' : 'bg-black/20'}`} style={{ width: `${buffered}%` }} />
            <div className={`absolute left-0 top-0 h-2 rounded-full ${resolvedColorMode === 'dark' ? 'bg-white' : 'bg-gray-900'}`} style={{ width: `${progress}%` }} />
            <div className={`absolute top-1/2 h-4 w-2 -translate-y-1/2 rounded ${resolvedColorMode === 'dark' ? 'bg-white' : 'bg-gray-900'}`} style={{ left: `calc(${progress}% - 4px)` }} />
          </div>

          <div className='relative flex items-center'>
            <div className='relative flex flex-col items-center group'>
              <ActionButton
                onClick={() => {
                  if (!audioRef.current) return
                  const newMuted = !muted
                  audioRef.current.muted = newMuted
                  if (useGlobalState && globalPlayer) {
                    globalPlayer.setMuted(newMuted)
                  } else {
                    setLocalMuted(newMuted)
                  }
                }}
                style={style}
                size={size}
                colorMode={resolvedColorMode}
                reducedMotion={reducedMotion}
                aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
              >
                {muted || volume === 0 ? <VolumeX size={controlSize} /> : <Volume2 size={controlSize} />}
              </ActionButton>

              {desktop && (
                <div
                  ref={volumeRef}
                  onMouseDown={(e) => startVolumeDrag(e.clientY)}
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 h-20 w-6 flex-col items-center justify-end opacity-0 invisible group-hover:visible group-hover:opacity-100 ${reducedMotion ? 'transition-none' : 'transition-opacity duration-150'}`}
                  role='slider'
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={volume * 100}
                  aria-label='Volume'
                >
                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-full' />
                  <div className={`absolute bottom-0 left-1/2 mb-1.5 -translate-x-1/2 h-full w-2 rounded ${resolvedColorMode === 'dark' ? 'bg-white/20' : 'bg-black/20'}`} />
                  <div className={`absolute bottom-0 left-1/2 mb-1.5 -translate-x-1/2 h-full w-2 rounded ${resolvedColorMode === 'dark' ? 'bg-white' : 'bg-gray-900'}`} style={{ transform: `scaleY(${muted ? 0 : volume})`, transformOrigin: 'bottom' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function ActionButton({
  onClick,
  children,
  style = 'filled',
  size = 'md',
  colorMode = 'dark',
  reducedMotion = false,
  ...props
}: {
  onClick?: () => void
  children: React.ReactNode
  style?: Style
  size?: Size
  colorMode?: 'light' | 'dark'
  reducedMotion?: boolean
  'aria-label'?: string
}) {
  const sizePadding: Record<Size, string> = { xs: 'p-1.5', sm: 'p-2', md: 'p-2', lg: 'p-2.5', xl: 'p-3', '2xl': 'p-3.5' }

  const darkStyleMap: Record<Style, string> = {
    filled: 'bg-white/30 hover:bg-white/40',
    outline: 'border border-white/40 hover:bg-white/20',
    ghost: 'hover:bg-white/10',
    soft: 'bg-white/10 hover:bg-white/20',
    blur: 'backdrop-blur-md bg-white/20 hover:bg-white/30',
    flat: 'border border-white/10 hover:bg-white/10'
  }

  const lightStyleMap: Record<Style, string> = {
    filled: 'bg-black/20 hover:bg-black/30',
    outline: 'border border-black/40 hover:bg-black/20',
    ghost: 'hover:bg-black/10',
    soft: 'bg-black/10 hover:bg-black/20',
    blur: 'backdrop-blur-md bg-black/15 hover:bg-black/25',
    flat: 'border border-black/10 hover:bg-black/10'
  }

  const styleMap = colorMode === 'dark' ? darkStyleMap : lightStyleMap
  const textColor = colorMode === 'dark' ? 'text-white' : 'text-gray-900'

  return (
    <button
      onClick={onClick}
      className={`group cursor-pointer rounded-lg ${textColor} ${reducedMotion ? '' : 'transition hover:scale-105'} ${sizePadding[size]} ${styleMap[style]}`}
      {...props}
    >
      {children}
    </button>
  )
}