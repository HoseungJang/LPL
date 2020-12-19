import React from "react";
import styled from "styled-components";
import { IoMdTrash } from "react-icons/io";
import classNames from "classnames";

import { Color } from "../constants/color";

import { usePlaylist } from "../contexts/Playlist";

export const Playlist: React.FC = () => {
  const { playlist, removeFromPlaylist, currentVideo, playVideo, goToNextVideo } = usePlaylist();

  return (
    <Container>
      {playlist.map((video) => (
        <div
          key={video.id}
          className={classNames("video", { playing: !!(currentVideo?.id === video.id) })}
          onClick={() => playVideo(video)}
        >
          <img className="thumbnail" src={video.thumbnail} alt="thumbnail" />
          <div className="title">{video.title}</div>
          <button
            className="remove-button"
            onClick={(e) => {
              e.stopPropagation();
              goToNextVideo();
              removeFromPlaylist(video.id);
            }}
          >
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
      border-bottom: 1px solid ${Color.DarkGreyTransparency50};
    }
  }

  > .video {
    width: 100%;
    height: 100px;

    display: flex;
    align-items: center;

    cursor: pointer;

    &:hover,
    &.playing {
      background-color: ${Color.DarkGreyTransparency50};
    }

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

      color: ${Color.Grey};

      outline: none;

      cursor: pointer;

      &:hover {
        color: ${Color.White};
      }

      > .icon {
        width: 30px;
        height: 30px;
      }
    }
  }
`;
