import React, { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  AppShell,
} from "@mantine/core";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Icons } from "../../../../assets/icons.tsx";
import "./styles.scss";
import { Header } from "../Header/Header";

const startPath = (path) => {
  return "/" + path.split("/")[1];
};

const mockdata = [
  { icon: <Icons.Home />, label: "Dashboard", to: "/" },
  { icon: <Icons.Messanger />, label: "Messenger", to: "/messenger" },
  { icon: <Icons.Controller />, label: "Games", to: "/games" },
  { icon: <Icons.Settings />, label: "Settings", to: "/settings" },
  { icon: <Icons.Profile />, label: "Account", to: "/account" },
  { icon: <Icons.Moon />, label: "Theme", to: "/theme" },
];

export function NavbarMinimal() {
  const { pathname } = useLocation();
  const isActive = (to) => startPath(pathname) === to;

  const links = mockdata.map(({ icon, label, to }) => (
    <NavLink
      key={label}
      to={to}
      className={`nav-link ${isActive(to) ? "nav-link--active" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  ));

  const useStyles = createStyles((theme) => ({
    navbar: {
      backgroundColor: "transparent",
      paddingTop: 72,
      width: 220,
      height: "100%",
    },
  }));
  const { classes } = useStyles();

  return (
    <Navbar withBorder={false} className={classes.navbar}>
      <Stack justify="center" spacing={0}>
        {links}
      </Stack>
    </Navbar>
  );
}
