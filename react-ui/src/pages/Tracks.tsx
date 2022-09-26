import React, { FC, useEffect, useState } from "react";
import {
  addItemsToPlaylist,
  getTrackRecommendations,
  getUsersPlaylists,
} from "../services/service";
import {
  AlbumTracksType,
  getUsersPlaylistType,
  TrackRecommendationsType,
} from "../utils/type";
import { ResponseType } from "../utils/uitypes";
import { CardForHomePage } from "../components/CardForHomePage";
import { Dropdown, Menu, message, notification, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const Tracks: FC<TrackType> = function ({
  recommendedTracks,
}: TrackType) {
  const [tracks, setTracks] = useState<TrackRecommendationsType | null>(null);
  const [prev, setPrev] = useState<boolean>(false);
  const [firstIndex, setFirstIndex] = useState<number>(0);
  const [secondIndex, setSecondIndex] = useState<number>(5);
  const [playlists, setPlaylists] = useState<getUsersPlaylistType | null>(null);
  const [trackUri, setTrackUri] = useState<string | null>(null);
  const [trackRecommendationsHeader, setTrackRecommendationsHeader] = useState<
    string | null
  >("");
  const [nextText, setNextText] = useState<string | null>("");

  const clickHandlerIncrement = () => {
    console.log(firstIndex, secondIndex);
    setPrev(true);
    if (secondIndex < 20) {
      setFirstIndex(firstIndex + 1);
      setSecondIndex(secondIndex + 1);
    }
  };

  const clickHandlerDecrement = () => {
    console.log(firstIndex, secondIndex);
    if (firstIndex >= 1) {
      setFirstIndex(firstIndex - 1);
      setSecondIndex(secondIndex - 1);
    } else if (firstIndex === 0) {
      setPrev(false);
    }
  };

  const openNotification = () => {
    notification.open({
      message: "Track Added",
    });
  };

  const trackRecommendations = () => {
    getTrackRecommendations({
      params: {
        seed_genres: "country,rock,pop music,electronic music,techno",
        market: "US",
      },
    })
      .then(({ data }: ResponseType<TrackRecommendationsType>) => {
        setTracks(data);
        setTrackRecommendationsHeader("Tracks");
        setNextText("next");
      })
      .catch((error: string) => {});
  };
  useEffect(() => {
    if (recommendedTracks) {
      setTracks({ tracks: recommendedTracks.items });
    } else {
      trackRecommendations();
    }
    // };
  }, [recommendedTracks]);

  const addToPlaylist = (playlistId: string) => {
    addItemsToPlaylist({
      segments: {
        playlist_id: playlistId,
      },
      body: {
        uris: [trackUri],
      },
    })
      .then(({ data }: ResponseType<getUsersPlaylistType>) => {
        openNotification();
      })
      .catch((error: string) => {});
  };
  const menu = (
    <Menu
      className="bg-gray-200"
      onClick={(item) => {
        addToPlaylist(item.key);
      }}
    >
      {playlists?.items.map((val, index) => {
        return <Menu.Item key={val.id}>{val.name}</Menu.Item>;
      })}
    </Menu>
  );
  useEffect(() => {
    getUsersPlaylists({
      segments: {
        userId: "31ljkqnfcinakesmezij4gybaycq",
      },
      params: {
        limit: 20,
      },
    })
      .then(({ data }: ResponseType<getUsersPlaylistType>) => {
        setPlaylists(data);
      })
      .catch((error: string) => {});
  }, []);

  return (
    <div className="mt-3">
      <div className="flow-root">
        <h2 className="float-left ml-20 text-2xl font-bold text-gray-200">
          {trackRecommendationsHeader}
        </h2>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-center">
          {prev ? (
            <h2 className="float-right text-base font-bold text-gray-200 hover:underline">
              <a
                className="hover:text-gray-200"
                href="#"
                onClick={() => clickHandlerDecrement()}
              >
                prev
              </a>
            </h2>
          ) : (
            <h2 className="float-right text-base font-bold text-gray-200 opacity-0 hover:underline">
              <a
                className="hover:text-gray-200"
                href="#"
                onClick={() => clickHandlerDecrement()}
              >
                prev
              </a>
            </h2>
          )}
          {tracks?.tracks
            .slice(firstIndex, secondIndex)
            .map(({ id, name, album, uri }) => (
              <CardForHomePage
                key={id}
                title={name}
                image={album.images[0]?.url}
                description={album.artists[0].name}
                menu={
                  <Dropdown overlay={menu}>
                    <span
                      className="py-1 px-2 text-xs"
                      onMouseEnter={() => setTrackUri(uri)}
                    >
                      Add to playlist <DownOutlined />
                    </span>
                  </Dropdown>
                }
              />
            ))}
          <h2 className="float-right text-base font-bold text-gray-200 hover:text-gray-200 hover:underline">
            <a
              className="hover:text-gray-200"
              href="#"
              onClick={() => clickHandlerIncrement()}
            >
              {nextText}
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
};

type TrackType = {
  recommendedTracks?: AlbumTracksType | null;
};
