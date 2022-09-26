import React, { FC } from "react";
import { AuthenticationProvider } from "../context/AuthenticationContext";
import { Routes } from "../routes/Routes";

export const Main: FC = function () {
  return (
    <div>
      <AuthenticationProvider>
        <Routes />
      </AuthenticationProvider>
    </div>
  );
};
