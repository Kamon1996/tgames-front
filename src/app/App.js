import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { Layout } from "./components/main/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Messenger from "./Pages/Messenger/Messenger";
import { fetchProfile } from "../store/reducers/profile/profileReducer";
import { NotificationsProvider } from "@mantine/notifications";
import { myTheme } from "../assets/styles/MantineTheme.ts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
      <NotificationsProvider position="top-center" zIndex={2077}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Home</div>} />
              <Route path="messenger" element={<Messenger />} />
              <Route path="games" element={<div>Games</div>} />
              <Route path="account" element={<div>Account</div>} />
              <Route path="settings" element={<div>Settings</div>} />
              <Route path="theme" element={<div>Theme</div>} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Account</div>} />
              <Route path="/register" element={<div>Account</div>} />
            </Route>
          </Routes>
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
