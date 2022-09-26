import React, { FC, useEffect, useState } from "react";
import {
  getPlaylistItems,
  getUsersPlaylists,
  removePlaylistItems,
} from "../services/service";
import { getUsersPlaylistType, playlistItemsType } from "../utils/type";
import { CardForLibraryPage } from "../components/CardForLibraryPage";
import { ResponseType } from "../utils/uitypes";
import { Modal } from "antd";
import { List, Avatar } from "antd";
import { notification } from "antd";

export const Library: FC = function () {
  const [playlists, setPlaylists] = useState<getUsersPlaylistType | null>(null);
  const [playlistId, setPlaylistId] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playlistItems, setPlaylistItems] = useState<
    playlistItemsType | null | undefined
  >(null);
  const [playlistName, setPlaylistName] = useState<string | null>("");
  const [libraryHeader, setLibaryHeader] = useState<string>("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const openNotification = () => {
    notification.open({
      message: "Track Removed",
    });
  };

  const getAllPlayListItems = (playlistId: string | null) => {
    getPlaylistItems({
      segments: {
        playlist_id: playlistId,
      },
      params: {
        limit: 50,
        market: "US",
      },
    })
      .then(({ data }: ResponseType<getUsersPlaylistType>) => {
        setPlaylistItems(data);
      })
      .catch((error: string) => {});
  };

  const removePlaylistItem = (
    playlistId: string,
    uri: string,
    trackId: string
  ) => {
    removePlaylistItems({
      segments: {
        playlist_id: playlistId,
      },
      body: {
        tracks: [{ uri }],
      },
    })
      .then(({ data }: ResponseType<playlistItemsType>) => {
        deleteItem(trackId, playlistItems?.items);
        openNotification();
      })
      .catch((error: string) => {});
  };

  useEffect(() => {
    getUsersPlaylists({
      segments: {
        userId: "31ljkqnfcinakesmezij4gybaycq",
      },
      params: {
        limit: 10,
      },
    })
      .then(({ data }: ResponseType<getUsersPlaylistType>) => {
        setLibaryHeader("Your Library");
        setPlaylists(data);
      })
      .catch((error: string) => {});
  }, []);

  const deleteItem = (id: string, items: any) => {
    const filteredItems = items.filter((item: any) => item.track.id !== id);
    //playlistItems! -  non-null assertion operator. It tells TypeScript that even
    // though something looks like it could be null, it can trust you that it's not
    setPlaylistItems({ ...playlistItems!, items: filteredItems });
  };

  return (
    <div className="mt-3">
      <h2 className="ml-20 mt-10 text-2xl font-bold text-gray-200">
        {libraryHeader}
      </h2>

      <div className="flex flex-wrap items-start justify-center">
        {playlists?.items?.map(({ id, name, images, description }) => (
          <CardForLibraryPage
            key={id}
            title={name}
            image="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
            description={description}
            menu={
              <span
                onClick={() => {
                  setPlaylistId(id), showModal(), setPlaylistName(name);
                  getAllPlayListItems(id);
                }}
                className="py-1 px-2 text-xs"
              >
                Show Playlist
              </span>
            }
          />
        ))}
      </div>

      <Modal
        title={playlistName}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <List
          itemLayout="horizontal"
          dataSource={playlistItems?.items}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2" />
                }
                title={<a href="https://ant.design">{item.track.name}</a>}
                description={
                  <p>
                    {item.track.artists[0]?.name} {item.track.artists[1]?.name}
                    {item.track.artists[2]?.name}
                  </p>
                }
              />

              <a
                onClick={() =>
                  removePlaylistItem(playlistId, item.track.uri, item.track.id)
                }
              >
                Remove Track
              </a>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};
