import React from "react";
import { Navbar, createStyles, Stack } from "@mantine/core";
import { useLocation, NavLink } from "react-router-dom";
import "./styles.scss";
import { Icons } from "assets/icons";

const startPath = (path) => {
  return "/" + path.split("/")[1];
};

const mockdata = [
  { icon: <Icons.Home classes={""} />, label: "Dashboard", to: "/" },
  {
    icon: <Icons.Messanger classes={""} />,
    label: "Messenger",
    to: "/conversations",
  },
  { icon: <Icons.Controller classes={""} />, label: "Games", to: "/games" },
  { icon: <Icons.Settings classes={""} />, label: "Settings", to: "/settings" },
  { icon: <Icons.Profile classes={""} />, label: "Account", to: "/account" },
  { icon: <Icons.Moon classes={""} />, label: "Theme", to: "/theme" },
  { icon: <Icons.Moon classes={""} />, label: "Friends", to: "/friends" },
];

export const NavbarMinimal: React.FC = () => {
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
};
