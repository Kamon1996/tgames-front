import React from "react";
import { HeaderMain } from "./Header/Header";
import { NavbarMinimal } from "./NavBar/NavBarMain";
import { Outlet } from "react-router-dom";
import { AppShell, createStyles } from "@mantine/core";

export const Layout: React.FC = () => {
  const useStyles = createStyles((theme) => ({
    appShell: {
      padding: "0 40px",
      maxWidth: 2000,
      margin: "0 auto",
      backgroundColor: theme.colors.blue[0],
      height: "100vh",
    },
    body: {
      height: "calc(100vh - 88px)",
    },
  }));
  const { classes } = useStyles();

  return (
    <AppShell
      classNames={{ root: classes.appShell, body: classes.body }}
      padding={40}
      fixed={false}
      navbar={<NavbarMinimal />}
      header={<HeaderMain />}
    >
      <Outlet />
    </AppShell>
  );
};
