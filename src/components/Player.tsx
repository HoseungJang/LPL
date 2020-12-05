import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

import { useThumbnail } from "../hooks/useThumbnail";

export const Player: React.FC = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [played, setPlayed] = useState(0);

  const playerRef = useRef<ReactPlayer | null>(null);

  const query = useThumbnail("V4p8He3vP40");

  return (
    <Container>
      <ReactPlayer
        ref={playerRef}
        className="player"
        url={"https://youtu.be/V4p8He3vP40"}
        playing={true}
        onReady={() => setIsPlayerReady(true)}
        onProgress={({ played }) => setPlayed(played)}
      />
      {!query.isLoading && <img className="player-image" src={query.url} />}
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

  > .player-image {
    width: 100%;

    object-fit: contain;
  }

  > .player {
    display: none;
  }

  > .duration-bar {
    width: 100%;
  }
`;
