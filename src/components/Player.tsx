import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

import { Video } from "../contexts/Playlist";

export const Player: React.FC<{ video: Video }> = ({ video }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [played, setPlayed] = useState(0);

  const playerRef = useRef<ReactPlayer | null>(null);

  return (
    <Container>
      <ReactPlayer
        ref={playerRef}
        className="player"
        url={video.url}
        playing={true}
        onReady={() => setIsPlayerReady(true)}
        onProgress={({ played }) => setPlayed(played)}
      />
      <h1>{video.title}</h1>
      <img className="player-image" src={video.thumbnail} />
      <input
        className="duration-bar"
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onChange={(e) => setPlayed(parseFloat(e.target.value))}
        onMouseUp={() => isPlayerReady && playerRef.current.seekTo(played)}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 600px;

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
