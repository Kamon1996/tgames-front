import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Messenger from "./Pages/Messenger/Messenger";
import { NotificationsProvider } from "@mantine/notifications";
import { myTheme } from "../assets/styles/MantineTheme";
import { Layout } from "./components/Layout/Layout";
import { useGetProfileQuery } from "store/tgamesapi";

function App() {
  const { isLoading } = useGetProfileQuery();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
      <NotificationsProvider position="top-center" zIndex={2077}>
        <div className="App">
          <LoadingOverlay
            transitionDuration={300}
            overlayOpacity={1}
            visible={isLoading}
            overlayColor="#e3f5ff"
          />
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
