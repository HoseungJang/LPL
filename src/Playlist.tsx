import React, { useEffect, useState } from "react";

import { Player } from "./components/Player";
import { usePlaylist } from "./contexts/Playlist";
import { useThumbnail } from "./hooks/useThumbnail";

export const Playlist: React.FC = () => {
  const { playlist, addToPlaylist } = usePlaylist();

  const thumbnail = useThumbnail("V4p8He3vP40");

  useEffect(() => {
    if (thumbnail.status === "success") {
      addToPlaylist({
        title: "I'm the trend",
        url: "https://youtu.be/V4p8He3vP40",
        thumbnail: thumbnail.url,
      });
    }
  }, [thumbnail.status]);

  return playlist.length > 0 ? <Player video={playlist[0]} /> : null;
};
