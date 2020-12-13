import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

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
      <input
        className="duration-bar"
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onChange={(e) => setPlayed(parseFloat(e.target.value))}
        onMouseUp={() => playerRef.current?.seekTo(played)}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  z-index: 1;

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
  }
`;
