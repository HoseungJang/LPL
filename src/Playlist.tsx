import React, { useRef } from "react";
import ReactPlayer from "react-player";

import { useThumbnail } from "./hooks/useThumbnail";

export const Playlist: React.FC = () => {
  const ref = useRef<ReactPlayer>(null);

  const query = useThumbnail("V4p8He3vP40");

  return (
    <>
      {!query.isLoading && <img src={query.url} />}
      <ReactPlayer ref={ref} url={"https://youtu.be/V4p8He3vP40"} loop={true} />
    </>
  );
};
