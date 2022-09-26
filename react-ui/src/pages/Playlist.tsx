import React, { FC, useEffect, useState } from "react";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Button, Radio } from "antd";
import { createPlaylist, getUsersPlaylists } from "../services/service";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
import { CreateAPlaylistType, getUsersPlaylistType } from "../utils/type";
import { ResponseType } from "../utils/uitypes";

export const Playlist: FC = function (props) {
  const [playlistTitle, setPlaylistTitle] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");
  const history = useHistory();
  const [playlists, setPlaylists] = useState<
    getUsersPlaylistType | null | undefined
  >(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSave = () => {
    setPlaylistTitle("");
    setPlaylistDescription("");
    showModal();
  };

  const createAPlaylist = () => {
    createPlaylist({
      segments: {
        userId: "31ljkqnfcinakesmezij4gybaycq",
      },
      body: {
        name: playlistTitle,
        description: playlistDescription,
        public: false,
      },
    })
      .then(({ data }: ResponseType<CreateAPlaylistType>) => {
        onSave();
      })
      .catch((error: string) => {});
  };
  const handleClick = () => {
    history.push("/library");
  };
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
      <div></div>
      <h2 className="ml-20 mb-3 mt-10 text-2xl font-bold text-gray-200">
        Create Playlist
      </h2>
      <div className="flex h-96 items-center justify-center">
        <div className="mx-auto flow-root w-5/12">
          <div className="float-left">
            <a>
              <img
                className="rounded"
                src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
                alt="music image"
              />
            </a>
          </div>
          <div className="float-right">
            <Input
              value={playlistTitle}
              placeholder="name of playlist"
              className="rounded"
              onChange={(e) => setPlaylistTitle(e.target.value)}
            />
            <br />
            <TextArea
              rows={7}
              placeholder="add an optional description"
              maxLength={40}
              className="mt-3 w-72 rounded"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
            />
          </div>
          <div className="float-right w-3/5">
            <Button
              type="primary"
              className="float-right mt-2 rounded"
              onClick={createAPlaylist}
            >
              Save
            </Button>
          </div>

          <Modal
            title="Playlist Created"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            centered
          >
            <div className="flex items-center justify-center">
              <a onClick={handleClick} className="text-center">
                <Button type="primary" className="text-black">
                  Go to all Playlists
                </Button>
              </a>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
