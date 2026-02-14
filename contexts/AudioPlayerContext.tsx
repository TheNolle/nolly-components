'use client'

import React from 'react'

type Track = {
  id: string
  name: string
  artist: string
  cover: string
  audioSrc?: string
}

type AudioPlayerState = {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  muted: boolean
  progress: number
  buffered: number
  isBuffering: boolean
  queue: Track[]
  queueIndex: number
  activePlayerId: string | null
}

type AudioPlayerContextType = {
  state: AudioPlayerState
  play: (playerId: string, track?: Track) => Promise<void>
  pause: (playerId: string) => void
  setVolume: (volume: number) => void
  setMuted: (muted: boolean) => void
  setProgress: (progress: number) => void
  setBuffered: (buffered: number) => void
  setBuffering: (isBuffering: boolean) => void
  setQueue: (queue: Track[], startIndex?: number) => void
  next: () => void
  previous: () => void
  shuffle: () => void
  registerPlayer: (playerId: string) => void
  unregisterPlayer: (playerId: string) => void
  isActivePlayer: (playerId: string) => boolean
}

const AudioPlayerContext = React.createContext<AudioPlayerContextType | null>(null)

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AudioPlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 1,
    muted: false,
    progress: 0,
    buffered: 0,
    isBuffering: false,
    queue: [],
    queueIndex: 0,
    activePlayerId: null
  })

  const registeredPlayers = React.useRef<Set<string>>(new Set())

  const registerPlayer = React.useCallback((playerId: string) => {
    registeredPlayers.current.add(playerId)
  }, [])

  const unregisterPlayer = React.useCallback((playerId: string) => {
    registeredPlayers.current.delete(playerId)
    if (state.activePlayerId === playerId) {
      setState(prev => ({ ...prev, activePlayerId: null, isPlaying: false }))
    }
  }, [state.activePlayerId])

  const isActivePlayer = React.useCallback((playerId: string) => {
    return state.activePlayerId === playerId
  }, [state.activePlayerId])

  const play = React.useCallback(async (playerId: string, track?: Track) => {
    setState(prev => ({
      ...prev,
      activePlayerId: playerId,
      isPlaying: true,
      currentTrack: track || prev.currentTrack
    }))
  }, [])

  const pause = React.useCallback((playerId: string) => {
    if (state.activePlayerId === playerId) {
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  }, [state.activePlayerId])

  const setVolume = React.useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume }))
  }, [])

  const setMuted = React.useCallback((muted: boolean) => {
    setState(prev => ({ ...prev, muted }))
  }, [])

  const setProgress = React.useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress }))
  }, [])

  const setBuffered = React.useCallback((buffered: number) => {
    setState(prev => ({ ...prev, buffered }))
  }, [])

  const setBuffering = React.useCallback((isBuffering: boolean) => {
    setState(prev => ({ ...prev, isBuffering }))
  }, [])

  const setQueue = React.useCallback((queue: Track[], startIndex = 0) => {
    setState(prev => ({
      ...prev,
      queue,
      queueIndex: startIndex,
      currentTrack: queue[startIndex] || prev.currentTrack
    }))
  }, [])

  const next = React.useCallback(() => {
    setState(prev => {
      if (prev.queue.length === 0) return prev
      const nextIndex = (prev.queueIndex + 1) % prev.queue.length
      return {
        ...prev,
        queueIndex: nextIndex,
        currentTrack: prev.queue[nextIndex]
      }
    })
  }, [])

  const previous = React.useCallback(() => {
    setState(prev => {
      if (prev.queue.length === 0) return prev
      const prevIndex = (prev.queueIndex - 1 + prev.queue.length) % prev.queue.length
      return {
        ...prev,
        queueIndex: prevIndex,
        currentTrack: prev.queue[prevIndex]
      }
    })
  }, [])

  const shuffle = React.useCallback(() => {
    setState(prev => {
      if (prev.queue.length === 0) return prev
      const currentTrack = prev.queue[prev.queueIndex]
      const shuffled = [...prev.queue].sort(() => Math.random() - 0.5)
      const newIndex = shuffled.findIndex(t => t.id === currentTrack.id)
      return {
        ...prev,
        queue: shuffled,
        queueIndex: newIndex >= 0 ? newIndex : 0
      }
    })
  }, [])

  const value: AudioPlayerContextType = {
    state,
    play,
    pause,
    setVolume,
    setMuted,
    setProgress,
    setBuffered,
    setBuffering,
    setQueue,
    next,
    previous,
    shuffle,
    registerPlayer,
    unregisterPlayer,
    isActivePlayer
  }

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = React.useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  }
  return context
}