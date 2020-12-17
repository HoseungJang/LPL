import React, { useState } from "react";
import styled from "styled-components";

import { Color } from "./constants/color";

import { Background } from "./components/Background";
import { Player } from "./components/Player";
import { AddingVideoForm } from "./components/AddingVideoForm";
import { Playlist } from "./components/Playlist";

import { Video } from "./contexts/Playlist";

export const App: React.FC = () => {
  const [nowPlayingVideo, setNowPlayingVideo] = useState<Video | null>(null);
  const [nextVideo, setNextVideo] = useState<Video | null>(null);

  return (
    <>
      <Background imageURL={nowPlayingVideo?.thumbnail ?? null} />
      <Container>
        <div className="primary">
          {nowPlayingVideo && (
            <Player video={nowPlayingVideo} onVideoEnded={() => setNowPlayingVideo(nextVideo)} />
          )}
        </div>
        <div className="secondary">
          <AddingVideoForm />
          <Playlist
            nowPlayingVideo={nowPlayingVideo}
            setNowPlayingVideo={setNowPlayingVideo}
            setNextVideo={setNextVideo}
          />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;

  z-index: 1;

  width: 100%;
  height: 100%;

  display: flex;

  padding: 10%;

  box-sizing: border-box;

  > .primary {
    width: 50%;

    padding-right: 3%;

    box-sizing: border-box;
  }

  > .secondary {
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;

    background-color: ${Color.BlackTransparency50};
  }
`;
