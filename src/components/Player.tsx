import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

import { Color } from "../constants/color";

import { Video } from "../contexts/Playlist";

export const Player: React.FC<{ video: Video }> = ({ video }) => {
  const [playing, setPlaying] = useState(true);
  const [played, setPlayed] = useState(0);

  const playerRef = useRef<ReactPlayer | null>(null);

  return (
    <Container>
      <ReactPlayer
        ref={playerRef}
        className="player"
        url={video.url}
        playing={playing}
        onProgress={({ played }) => setPlayed(played)}
      />
      <img className="player-image" src={video.thumbnail} />
      <div className="duration-bar">
        <RangeBar
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={(e) => setPlayed(parseFloat(e.target.value))}
          onMouseUp={() => playerRef.current?.seekTo(played)}
        />
      </div>
      <div className="controls"></div>
    </Container>
  );
};

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
`;

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

    background-color: ${Color.Grey};

    cursor: pointer;
  }
`;
