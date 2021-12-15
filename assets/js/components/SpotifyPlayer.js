/* @jsx jsx */
import { Fragment } from 'react'
import LazyImage from 'components/LazyImage'
import PlayIcon from 'components/PlayIcon'
import PauseIcon from 'components/PauseIcon'
import NextTrackIcon from 'components/NextTrackIcon'
import PrevTrackIcon from 'components/PrevTrackIcon'
import ShuffleIcon from 'components/ShuffleIcon'
import useSpotifyContext from 'hooks/useSpotifyContext'
import useShuffleMutation from 'hooks/useShuffleMutation'
import RepeatIcon from 'components/RepeatIcon'
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'
import Timestamp from 'components/Timestamp'
import posed, { PoseGroup } from 'react-pose'
import { color, textColor, typography } from 'styles/utils'
import { Link } from 'react-router-dom'
import LoudVolumeIcon from 'components/LoudVolumeIcon'

const PLAYBAR_SIZE = '4px'
const ICON_SIZE = '1.1rem'

const ArtistLink = styled(Link)`
  font-size: 0.8rem;
  color: ${textColor('muted')};
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid transparent;
  align-self: flex-start;

  &:hover {
    color: ${textColor('primary')};
    border-bottom-color: ${textColor('primary')};
  }
`

const AlbumLink = styled(Link)`
  font-size: 0.9rem;
  color: ${color('white')};
`

const TimeInfo = styled(Timestamp)`
  ${typography('xs')};
  width: 2rem;

  &:first-of-type {
    justify-self: end;
  }

  &:last-of-type {
    justify-self: start;
  }
`

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Info = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, auto);
  justify-content: start;
  height: 64px;
  color: ${color('offWhite')};
  align-items: center;
`

const CenterControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const RightControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0.5rem;
  justify-self: end;
  align-items: center;
`

const TimeControls = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 500px auto;
  align-items: center;
  color: ${color('offWhite')};
`

const ControlButton = ({ fill, icon: Icon, ...props }) => (
  <button
    css={(theme) => css`
      color: ${color('offWhite', { theme })};
      background: none;
      padding: 0;
      border: none;
      cursor: pointer;
      transition: 0.15s ease-in-out;

      &:hover:not(:disabled) {
        color: ${color('white', { theme })};
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.2;
      }
    `}
    {...props}
  >
    <Icon size={ICON_SIZE} fill={fill ? 'currentColor' : 'none'} />
  </button>
)

const PlayButton = ({ paused, ...props }) => (
  <ControlButton
    css={css`
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      border: 1px solid currentColor;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        transform: scale(1.1);
      }

      svg {
        margin-left: ${paused ? '3px' : null};
      }
    `}
    fill
    icon={paused ? PlayIcon : PauseIcon}
    {...props}
  />
)

const ControlButtons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  grid-gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Playbar = styled.div`
  height: ${PLAYBAR_SIZE};
  background: #393939;
  border-radius: ${PLAYBAR_SIZE};
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    background: ${color('offWhite')};
    top: 0;
    bottom: 0;
    left: 0;
    width: ${({ progress }) => progress * 100}%;
    border-radius: ${PLAYBAR_SIZE};
  }
`

const VolumeBar = styled(Playbar)`
  width: 100px;
`

const Container = styled(
  posed.footer({
    enter: {
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 14, mass: 0.9 },
    },
    exit: { y: '100%' },
  })
)`
  grid-area: footer;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  align-items: center;
  background: #282828;
  padding: 1.25rem;
  color: ${color('offWhite')};
`

const SpotifyPlayer = ({ token }) => {
  const {
    allowedActions,
    isPlayingThroughPlayer,
    currentTrack,
    currentTime,
    paused,
    duration,
    playNextTrack,
    playPreviousTrack,
    togglePlayback,
    seek,
    setVolume,
    shuffle: shuffleState,
  } = useSpotifyContext()

  const shuffle = useShuffleMutation()
  const { album, name: trackName, artists } = currentTrack || {}

  return (
    <PoseGroup>
      {isPlayingThroughPlayer && (
        <Container key="player">
          <Info>
            <Link to={`/albums/${album.id}`}>
              <LazyImage width="64px" height="64px" src={album.images[0].url} />
            </Link>
            <SongInfo>
              <AlbumLink to={`/albums/${album.id}`}>{trackName}</AlbumLink>
              <div>
                {artists.map((artist, idx) => (
                  <Fragment key={artist.id}>
                    <ArtistLink to={`/artists/${artist.id}`}>
                      {artist.name}
                    </ArtistLink>
                    {idx !== artists.length - 1 && ', '}
                  </Fragment>
                ))}
              </div>
            </SongInfo>
          </Info>
          <CenterControls>
            <ControlButtons>
              <ControlButton
                icon={ShuffleIcon}
                css={(theme) =>
                  shuffleState &&
                  css`
                    color: ${color('green', { theme })};

                    &:hover:not(:disabled) {
                      color: ${color('lightGreen', { theme })};
                    }
                  `
                }
                onClick={() => shuffle(!shuffleState)}
              />
              <ControlButton
                icon={PrevTrackIcon}
                fill
                disabled={!allowedActions.playPrevTrack}
                onClick={playPreviousTrack}
              />
              <PlayButton paused={paused} onClick={togglePlayback} />
              <ControlButton
                icon={NextTrackIcon}
                fill
                disabled={!allowedActions.playNextTrack}
                onClick={playNextTrack}
              />
              <ControlButton icon={RepeatIcon} />
            </ControlButtons>
            <TimeControls>
              <TimeInfo milliseconds={currentTime}>{currentTime}</TimeInfo>
              <Playbar
                progress={currentTime / duration}
                onClick={({ clientX, target: { offsetLeft, clientWidth } }) =>
                  seek(
                    Math.floor(
                      ((clientX - offsetLeft) / clientWidth) * duration
                    )
                  )
                }
              />
              <TimeInfo milliseconds={duration}>{duration}</TimeInfo>
            </TimeControls>
          </CenterControls>
          <RightControls>
            <ControlButton icon={LoudVolumeIcon} />
            <VolumeBar
              progress={50 / 100}
              onClick={({ clientX, target: { offsetLeft, clientWidth } }) =>
                setVolume((clientX - offsetLeft) / clientWidth)
              }
            />
          </RightControls>
        </Container>
      )}
    </PoseGroup>
  )
}

export default SpotifyPlayer
