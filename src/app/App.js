import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { Layout } from "./components/main/Layout/Layout";
import { LoginForm } from "./components/LoginWindow/form";
import { Routes, Route } from "react-router-dom";
import Messenger from "./Pages/Messenger/Messenger";
import { fetchProfile } from "../store/reducers/users/userReducer";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  const profile = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!profile.id) {
      dispatch(fetchProfile());
    }
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="top-right" zIndex={2077}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Home</div>} />
              <Route path="messenger" element={<Messenger />} />
              <Route path="games" element={<div>Games</div>} />
              <Route path="account" element={<div>Account</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
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
