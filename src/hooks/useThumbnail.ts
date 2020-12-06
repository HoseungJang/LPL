import { useQuery } from "react-query";
import axios from "axios";

type ThumbnailQueryResult =
  | {
      status: "loading";
    }
  | {
      status: "success";
      url: string;
    };

export const useThumbnail = (videoKey: string) => {
  const thumbnailQuery = useQuery(videoKey, () =>
    axios
      .get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "snippet",
          id: videoKey,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
      .then((result) => (result.data as any).items[0].snippet.thumbnails.maxres.url)
  );

  return {
    status: thumbnailQuery.status,
    url: thumbnailQuery.data,
  } as ThumbnailQueryResult;
};
