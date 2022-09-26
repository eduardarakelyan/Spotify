import { Logo } from "./Logo";
import { Menu } from "antd";
import React, { FC } from "react";
import Sider from "antd/es/layout/Sider";
import {
  HomeOutlined,
  FolderOpenOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

export const Side: FC = function () {
  return (
    <div>
      <Sider className="h-screen bg-black">
        <Logo />
        <Menu className="mt-3 border-transparent bg-transparent text-white">
          <Menu.Item key="home">
            <HomeOutlined style={{ fontSize: "20px" }} />
            <a className="ml-3 text-white" href="/home">
              Home
            </a>
          </Menu.Item>
          <Menu.Item key="search">
            <PlusSquareOutlined style={{ fontSize: "20px" }} />
            <a className="ml-3 text-white" href="/playlist">
              Add Playlist
            </a>
          </Menu.Item>
          <Menu.Item key="library">
            <FolderOpenOutlined style={{ fontSize: "20px" }} />
            <a className="ml-3 text-white" href="/library">
              Your Library
            </a>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};
