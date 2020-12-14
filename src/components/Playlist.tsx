import React from "react";
import styled from "styled-components";
import { IoMdTrash } from "react-icons/io";
import { usePlaylist } from "../contexts/Playlist";

import { Color } from "../constants/color";

export const Playlist: React.FC = () => {
  const { playlist, removeFromPlaylist } = usePlaylist();

  return (
    <Container>
      {playlist.map((video) => (
        <div key={video.id} className="video">
          <img className="thumbnail" src={video.thumbnail} alt="thumbnail" />
          <div className="title">{video.title}</div>
          <button className="remove-button" onClick={() => removeFromPlaylist(video.id)}>
            <IoMdTrash className="icon" />
          </button>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  border-radius: 1px;

  overflow-y: scroll;

  > * {
    &:not(:last-child) {
      border-bottom: 1px solid ${Color.GreyTransparency50};
    }
  }

  > .video {
    width: 100%;
    height: 100px;

    display: flex;
    align-items: center;

    > * {
      margin: 0 10px;
    }

    > .thumbnail {
      width: 80px;
      height: 80px;

      border-radius: 50%;
    }

    > .title {
      flex: 1;

      font-size: 0.9rem;
      color: ${Color.LightGrey};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    > .remove-button {
      border: 0;

      background-color: transparent;

      outline: none;

      color: ${Color.LightGrey};

      &:hover {
        color: ${Color.Grey};
      }

      > .icon {
        width: 25px;
        height: 25px;
      }
    }
  }
`;
