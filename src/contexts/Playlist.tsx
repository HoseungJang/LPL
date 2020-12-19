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
  currentVideo: Video | null;
  playVideo: (video: Video | null) => void;
  goToPrevVideo: () => void;
  goToNextVideo: () => void;
};

const LOCAL_STORAGE_KEY = "LPL_playlist";

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

export const PlaylistContextProvider: React.FC = ({ children }) => {
  const [playlist, setPlaylist] = useState<Video[]>(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  });

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = useCallback((video: Pick<Video, "url" | "title" | "thumbnail">) => {
    const id = nanoid();
    setPlaylist((prev) => [...prev, { id, ...video }]);
  }, []);

  const removeFromPlaylist = useCallback((id: string) => {
    setPlaylist((prev) => prev.filter((video) => video.id !== id));
  }, []);

  const goToPrevVideo = useCallback(() => {
    if (currentVideo) {
      const currentVideoIndex = playlist.findIndex((v) => v.id === currentVideo.id);
      setCurrentVideo(playlist[currentVideoIndex - 1] ?? playlist[playlist.length - 1]);
    }
  }, [playlist, currentVideo]);

  const goToNextVideo = useCallback(() => {
    if (currentVideo) {
      const currentVideoIndex = playlist.findIndex((v) => v.id === currentVideo.id);
      setCurrentVideo(playlist[currentVideoIndex + 1] ?? playlist[0]);
    }
  }, [playlist, currentVideo]);

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        currentVideo,
        playVideo: setCurrentVideo,
        goToPrevVideo,
        goToNextVideo,
      }}
    >
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
