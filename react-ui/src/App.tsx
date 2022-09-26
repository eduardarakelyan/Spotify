import React, { FC, useState } from "react";
import { Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;

import { Main } from "./components/Main";
const { SubMenu } = Menu;
// 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
const code = new URLSearchParams(window.location.search).get("code");

export const App: FC<any> = function () {
  const [title, setTitle] = useState("");

  return <Main />;
};

export default App;
