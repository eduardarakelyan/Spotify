import React, { FC, useEffect, useState } from "react";
import {
  addItemsToPlaylist,
  getAlbumTracks,
  getNewReleases,
  getPlaylistItems,
  getUsersPlaylists,
} from "../services/service";
import { ResponseType } from "../utils/uitypes";
import {
  AlbumReleasesType,
  AlbumsListType,
  AlbumTracksType,
  getUsersPlaylistType,
  playlistItemsType,
} from "../utils/type";
import { Dropdown, Menu } from "antd";
import { CardForHomePage } from "../components/CardForHomePage";
import { DownOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { List, Avatar } from "antd";
import { notification } from "antd";

export const Albums: FC<AlbumsType> = function ({ albums }: AlbumsType) {
  const [albumReleases, setAlbumReleases] = useState<AlbumReleasesType | null>(
    null
  );
  const [playlists, setPlaylists] = useState<getUsersPlaylistType | null>(null);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [albumsViewNumber, setAlbumsViewNumber] = useState<number>(0);

  const [prev, setPrev] = useState(false);
  // if offset is 95, then remove the next link in the UI
  const [albumTracks, setAlbumTracks] = useState<AlbumTracksType | null>(null);
  const [albumId, setAlbumId] = useState<string | null>(null);
  const [trackUri, setTrackUri] = useState<string | null>(null);
  const [playlistItems, setPlaylistItems] = useState<
    playlistItemsType | null | undefined
  >(null);
  const [albumReleasesHeader, setAlbumReleasesHeader] = useState<string | null>(
    ""
  );

  const [linkText, setLinkText] = useState<string | null>("Add Track");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nextText, setNextText] = useState<string | null>("");

  const openNotification = () => {
    notification.open({
      message: "Track Added",
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const nextSetOfItems = (offset: number) => {
    if (offset === 0) {
      setPrev(false);
    } else if (offset > 0) {
      setPrev(true);
    }
    if (offset <= 95) {
      setAlbumsViewNumber(offset);
      getNewReleases({
        params: {
          country: "US",
          limit: 5,
          offset: offset,
        },
      })
        .then(({ data }: ResponseType<AlbumsListType>) => {
          setAlbumReleases(data.albums);
        })
        .catch((error: string) => {});
    }
  };

  const previousSetOfItems = (offset: number) => {
    if (offset === 0) {
      setPrev(false);
    }
    if (offset >= 0) {
      setAlbumsViewNumber(offset);
      getNewReleases({
        params: {
          country: "US",
          limit: 5,
          offset: offset,
        },
      })
        .then(({ data }: ResponseType<AlbumsListType>) => {
          setAlbumReleases(data.albums);
        })
        .catch((error: string) => {});
    }
  };
  const checkIfTrackAlreadyExistsInPlaylist = (
    playlistTracks: Array<any> | undefined,
    newTrackId: string | null
  ) => {
    if (!playlistTracks) {
      return false;
    }
    return playlistTracks.reduce(function (acc: any, track: any) {
      if (!acc) {
        acc = track.track.id === newTrackId;
      }
      return acc;
    }, false);
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
        showModal();
      })
      .catch((error: string) => {});
  };

  const getAlbumTracksInfo = () => {
    getAlbumTracks({
      segments: {
        id: albumId,
      },
      params: {
        limit: 20,
        market: "US",
        offset: 1,
      },
    })
      .then(({ data }: ResponseType<AlbumTracksType>) => {
        setAlbumTracks(data);
      })
      .catch((error: string) => {});
  };

  const addToPlaylist = (
    playlistId: string | null,
    uri: string | null,
    id: string | null
  ) => {
    addItemsToPlaylist({
      segments: {
        playlist_id: playlistId,
      },
      body: {
        uris: [uri],
      },
    })
      .then(({ data }: ResponseType<string>) => {
        getAllPlayListItems(playlistId);
        openNotification();
      })
      .catch((error: string) => {});
  };

  const menu = (
    <Menu className="bg-gray-200">
      {playlists?.items.map((playlistItem, index) => {
        return (
          <Menu.Item
            key={playlistItem.id}
            onClick={() => {
              setPlaylistId(playlistItem.id);
              getAllPlayListItems(playlistItem.id);
              getAlbumTracksInfo();
            }}
          >
            {playlistItem.name}{" "}
          </Menu.Item>
        );
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
  useEffect(() => {
    if (albums) {
      setAlbumReleases(albums);
    } else {
      nextSetOfItems(0);
      setAlbumReleasesHeader("Albums");
      setNextText("next");
    }
  }, [albums]);

  return (
    <div>
      <div className="mt-3">
        <div className="flow-root">
          <h2 className="float-left ml-20 text-2xl font-bold text-gray-200">
            {albumReleasesHeader}
          </h2>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-center">
            {prev ? (
              <h2 className="float-right text-base font-bold text-gray-200 hover:underline">
                <a
                  className="hover:text-gray-200"
                  href="#"
                  onClick={() => previousSetOfItems(albumsViewNumber - 1)}
                >
                  prev
                </a>
              </h2>
            ) : (
              <h2 className="float-right text-base font-bold text-gray-200 opacity-0 hover:underline">
                <a
                  className="hover:text-gray-200"
                  href="#"
                  onClick={() => previousSetOfItems(albumsViewNumber - 1)}
                >
                  prev
                </a>
              </h2>
            )}

            {albumReleases?.items?.map(({ id, name, images, release_date }) => (
              <CardForHomePage
                key={id}
                title={name}
                image={images?.length > 0 ? images[0].url : ""}
                description={release_date}
                menu={
                  <Dropdown overlay={menu}>
                    <span
                      className="py-1 px-2 text-xs"
                      onMouseEnter={() => setAlbumId(id)}
                    >
                      Add to playlist <DownOutlined />
                    </span>
                  </Dropdown>
                }
              />
            ))}

            <h2 className="float-right text-base font-bold text-gray-200 hover:underline">
              <a
                className="hover:text-gray-200"
                href="#"
                onClick={() => nextSetOfItems(albumsViewNumber + 1)}
              >
                {nextText}
              </a>
            </h2>
          </div>
        </div>

        <div>
          <Modal
            title="Add Tracks To Playlist"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            centered
          >
            <List
              itemLayout="horizontal"
              dataSource={albumTracks?.items}
              renderItem={(item) => (
                <List.Item
                  onMouseEnter={() => {
                    setTrackUri(item.uri);
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2" />
                    }
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={<p>{item.artists[0].name}</p>}
                  />
                  {checkIfTrackAlreadyExistsInPlaylist(
                    playlistItems?.items,
                    item.id
                  ) ? (
                    <div className="font-bold">Already Added</div>
                  ) : (
                    <a
                      onClick={() => {
                        addToPlaylist(playlistId, item.uri, item.id);
                      }}
                    >
                      {linkText}
                    </a>
                  )}
                </List.Item>
              )}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

type AlbumsType = {
  albums?: AlbumReleasesType | null;
};
