import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import { BsSkipStartFill, BsSkipEndFill } from "react-icons/bs";
import styled from "styled-components";

import { Color } from "../constants/color";

import { usePlaylist } from "../contexts/Playlist";

export const Player: React.FC = () => {
  const { currentVideo, goToPrevVideo, goToNextVideo } = usePlaylist();

  const [playing, setPlaying] = useState(true);

  const [played, setPlayed] = useState(0);
  const [isFixingProgress, setIsFixingProgress] = useState(false);

  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return !currentVideo ? null : (
    <Container key={currentVideo.id}>
      <ReactPlayer
        ref={playerRef}
        className="player"
        url={currentVideo.url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={({ played }) => !isFixingProgress && setPlayed(played)}
        onEnded={() => goToNextVideo()}
      />
      <img className="player-image" src={currentVideo.thumbnail} />
      <div className="duration-bar">
        <RangeBar
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onMouseDown={() => setIsFixingProgress(true)}
          onChange={(e) => setPlayed(parseFloat(e.target.value))}
          onMouseUp={() => {
            setIsFixingProgress(false);
            playerRef.current?.seekTo(played);
          }}
        />
      </div>
      <div className="controls">
        <button
          className="skip-button"
          onClick={() => {
            if (played > 0.01) {
              setPlayed(0);
              playerRef.current?.seekTo(0);
            } else {
              goToPrevVideo();
            }
          }}
        >
          <BsSkipStartFill className="icon" />
        </button>
        {playing ? (
          <button className="pause-button" onClick={() => setPlaying(false)}>
            <FaPause className="icon" />
          </button>
        ) : (
          <button className="play-button" onClick={() => setPlaying(true)}>
            <FaPlay className="icon" />
          </button>
        )}
        <button className="skip-button" onClick={() => goToNextVideo()}>
          <BsSkipEndFill className="icon" />
        </button>
        <div className="volume-controller">
          {muted || volume === 0 ? (
            <button
              onClick={() => {
                setMuted(false);
                if (volume === 0) {
                  setVolume(0.5);
                }
              }}
            >
              <GiSpeakerOff className="icon" />
            </button>
          ) : (
            <button onClick={() => setMuted(true)}>
              <GiSpeaker className="icon" />
            </button>
          )}
          <RangeBar
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </Container>
  );
};

const RangeBar = styled.input`
  -webkit-appearance: none;

  flex: 1;

  height: 8px;

  border-radius: 5px;

  background-color: ${Color.BlackTransparency50};

  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;

    width: 17px;
    height: 17px;

    border-radius: 50%;

    background-color: ${Color.White};

    cursor: pointer;

    &:hover {
      background-color: ${Color.WhiteHover};
    }
  }
`;

const Container = styled.div`
  -webkit-appearance: none;

  flex: 1;

  > .player {
    display: none;
  }

  > .player-image {
    width: 100%;

    object-fit: contain;
  }

  > .duration-bar {
    width: 100%;

    display: flex;
  }

  > .controls {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 1%;

    > button {
      box-sizing: border-box;

      border: 0;
      border-radius: 50%;

      background-color: ${Color.White};

      outline: none;

      cursor: pointer;

      &:hover {
        background-color: ${Color.WhiteHover};
      }

      &:not(:last-child) {
        margin-right: 1%;
      }

      > .icon {
        width: 100%;
        height: 100%;

        color: ${Color.BlackTransparency50};
      }
    }

    > .skip-button {
      width: 35px;
      height: 35px;

      padding: 5px;
    }

    > .play-button {
      width: 50px;
      height: 50px;

      padding: 13px;
      padding-left: 16px;
    }

    > .pause-button {
      width: 50px;
      height: 50px;

      padding: 13px;
    }

    > .volume-controller {
      position: absolute;

      right: 0;
      bottom: 0;

      display: flex;
      align-items: center;

      > button {
        border: 0;

        background-color: transparent;

        outline: none;

        cursor: pointer;

        &:hover {
          > .icon {
            color: ${Color.WhiteHover};
          }
        }

        > .icon {
          width: 30px;
          height: 30px;

          color: ${Color.White};
        }
      }

      > ${RangeBar} {
        width: 80px;
      }
    }
  }
`;
