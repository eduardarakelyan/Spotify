import React, { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { Layout } from "antd";
import { Side } from "../components/Side";
import { Home } from "../pages/Home";
import { Playlist } from "../pages/Playlist";
import { Library } from "../pages/Library";

export const Routes: FC = function () {
  const { authentication } = useContext(AuthenticationContext);

  useEffect(() => {
    console.log(authentication);
  }, [authentication]);

  return (
    <Router>
      {authentication?.token ? (
        <Layout>
          <Side />
          <Layout className="h-screen overflow-y-auto bg-gradient-to-b from-sky-700 to-black">
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/playlist">
                <Playlist />
              </Route>
              <Route path="/library">
                <Library />
              </Route>
            </Switch>
          </Layout>
        </Layout>
      ) : (
        <Layout className="h-screen bg-gradient-to-b from-sky-700 to-sky-900">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Layout>
      )}
    </Router>
  );
};
