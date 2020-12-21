import React, { useState, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import styled from "styled-components";
import classNames from "classnames";
import axios from "axios";

import { Color } from "../constants/color";
import { Animation } from "../constants/animation";

import { usePlaylist } from "../contexts/Playlist";

const videoIdRegEx = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const AddingVideoForm: React.FC = () => {
  const { addToPlaylist } = usePlaylist();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const addVideo = useCallback(
    async (url: string) => {
      const matchedValues = url.match(videoIdRegEx);

      if (!matchedValues || !matchedValues[1]) {
        setIsError(true);
        return;
      }

      setIsLoading(true);

      const video = (
        await axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "snippet",
            id: matchedValues[1],
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
        })
      ).data.items[0].snippet;

      addToPlaylist({
        url: `https://youtu.be/${matchedValues[1]}`,
        title: video.title,
        thumbnail: video.thumbnails.maxres?.url || video.thumbnails.medium?.url,
      });

      setInput("");
      setIsLoading(false);
      setIsError(false);
    },
    [addToPlaylist]
  );

  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className={classNames("url-input", { error: isError })}
          placeholder="Youtube URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="add-button"
          onClick={() => addVideo(input)}
          disabled={isLoading || input.length === 0}
        >
          {isLoading ? (
            <ImSpinner2 className="loading-icon" />
          ) : (
            <AiOutlinePlus className="add-icon" />
          )}
        </button>
      </form>
      {isError && <div className="error-message">잘못된 URL입니다</div>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 60px;

  padding: 1%;

  box-sizing: border-box;

  > form {
    width: 100%;
    height: 60px;

    display: flex;

    > .url-input {
      height: 100%;

      flex: 1;

      padding: 1%;
      margin-right: 1%;

      box-sizing: border-box;

      border: 0;
      border-radius: 2px;

      background-color: ${Color.BlackTransparency50};

      font-size: 0.9rem;
      color: ${Color.Grey};

      outline: none;

      &.error {
        border: 1px solid ${Color.DarkRed};
      }
    }

    > .add-button {
      width: 15%;

      border: 1px solid ${Color.Grey};
      border-radius: 2px;

      background-color: transparent;

      outline: none;

      transition: background-color 0.2s;

      &:hover {
        background-color: ${Color.Grey};

        > .add-icon,
        .loading-icon {
          color: ${Color.Black};
        }
      }

      > .add-icon {
        font-size: 1rem;
        color: ${Color.LightGrey};

        object-fit: contain;

        transition: color 0.2s;
      }

      > .loading-icon {
        font-size: 1rem;
        color: ${Color.LightGrey};

        object-fit: contain;

        ${Animation.InfiniteSpin()}
      }
    }
  }

  > .error-message {
    font-size: 0.7rem;
    color: ${Color.DarkRed};
  }
`;
