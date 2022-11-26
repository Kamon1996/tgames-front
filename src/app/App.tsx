import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import { myTheme } from "../assets/styles/MantineTheme";
import { Layout } from "./components/Layout/Layout";
import { useGetProfileQuery } from "store/tgamesapi/profile";
import { publickRoutes, privateRoutes } from "./routes/router";
import { NoMatch } from "./Pages/NoMatch/NoMatch";


export default function App() {
  const { data, isLoading } = useGetProfileQuery();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
      <NotificationsProvider limit={5} position="top-center" zIndex={9999}>
        <div className="App">
          {isLoading ? (
            <LoadingOverlay
              transitionDuration={300}
              overlayOpacity={1}
              visible={isLoading}
              overlayColor="#e3f5ff"
            />
          ) : (
            <Routes>
              <Route path="/" element={<Layout />}>
                {publickRoutes.map((route, i) => (
                  <Route
                    key={i}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
                {data &&
                  privateRoutes.map((route, i) => (
                    <Route
                      key={i}
                      path={route.path}
                      element={<route.element />}
                    />
                  ))}
              </Route>
              <Route path="*" element={<Navigate to="404" replace />} />
              <Route path="404" element={<NoMatch />} />
            </Routes>
          )}
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}
