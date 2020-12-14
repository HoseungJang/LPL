import React from "react";
import styled from "styled-components";

import { Color } from "./constants/color";

import { Background } from "./components/Background";
import { Player } from "./components/Player";
import { AddingVideoForm } from "./components/AddingVideoForm";
import { Playlist } from "./components/Playlist";

import { usePlaylist } from "./contexts/Playlist";

export const App: React.FC = () => {
  return (
    <>
      <Background imageURL={usePlaylist().playlist[0].thumbnail} />
      <Container>
        <div className="primary">
          <Player video={usePlaylist().playlist[0]} />
        </div>
        <div className="secondary">
          <AddingVideoForm />
          <Playlist />
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
  }

  > .secondary {
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;

    background-color: ${Color.BlackTransparency50};
  }
`;
