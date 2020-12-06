import React, { useState, createContext, useEffect, useCallback, useContext } from "react";
import { nanoid } from "nanoid";

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
};

type PlaylistContextValue = {
  playlist: Video[];
  addToPlaylist: (video: Omit<Video, "id">) => void;
  removeFromPlaylist: (id: string) => void;
};

const LOCAL_STORAGE_KEY = "LPL_playlist";

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

export const PlaylistContextProvider: React.FC = ({ children }) => {
  const [playlist, setPlaylist] = useState<Video[]>(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = useCallback((video: Omit<Video, "id">) => {
    const id = nanoid();
    setPlaylist((prev) => [...prev, { id, ...video }]);
  }, []);

  const removeFromPlaylist = useCallback((id: string) => {
    setPlaylist((prev) => prev.filter((video) => video.id !== id));
  }, []);

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const playlist = useContext(PlaylistContext);

  if (!playlist) {
    throw new Error("PlaylistContext must be provided before use it");
  }

  return playlist;
};
