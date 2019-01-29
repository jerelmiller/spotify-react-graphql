declare namespace Spotify {
  export type onSpotifyWebPlaybackSDKReady = (() => void) | null

  export enum RepeatMode {
    NONE = 0,
    ONCE,
    FULL
  }

  export type TrackContentType = 'track' | 'episode' | 'ad'
  export type TrackMediaType = 'audio' | 'video'

  export interface Artist {
    id: string
    uri: string
    name: string
  }

  export interface Album {
    id: string
    uri: string
    name: string
    images: Image[]
  }

  export interface Image {
    url: string
  }

  export interface WebPlaybackTrack {
    id: string
    uri: string
    type: TrackContentType
    media_type: TrackMediaType
    name: string
    is_playable: boolean
    album: Album
    artists: Artist[]
  }

  export interface WebPlaybackState {
    context: {
      uri: string
      metadata: {} | null
    }
    disallows: {
      pausing: boolean
      peeking_next: boolean
      peeking_prev: boolean
      resuming: boolean
      seeking: boolean
      skipping_next: boolean
      skipping_prev: boolean
    }
    duration: number
    timestamp: number
    paused: boolean
    position: number
    repeat_mode: RepeatMode
    shuffle: boolean
    track_window: {
      current_track: WebPlaybackTrack
      previous_tracks: WebPlaybackTrack[]
      next_tracks: WebPlaybackTrack[]
    }
  }

  export class Player {
    constructor(options: {
      name: string
      getOAuthToken: (fn: (token: string) => void) => void
    })
    addListener(name: string, fn: (...args: any[]) => void): void
    connect(): Promise<void>
    disconnect(): void
    getCurrentState(): Promise<WebPlaybackState>
    pause(): void
    resume(): void
    nextTrack(): void
    previousTrack(): void
    togglePlay(): void
    seek(ms: number): void
  }

  export type Base = {
    Player: Player
  }
}

declare var onSpotifyWebPlaybackSDKReady: Spotify.onSpotifyWebPlaybackSDKReady
declare var Spotify: Spotify.Base
