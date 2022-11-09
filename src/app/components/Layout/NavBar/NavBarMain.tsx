import React from "react";
import { Navbar, createStyles, Stack } from "@mantine/core";
import { useLocation, NavLink } from "react-router-dom";
import "./styles.scss";
import { Icons } from "assets/icons";
import { useAppSelector } from "store";

const startPath = (path) => {
  return "/" + path.split("/")[1];
};

const mockdata = [
  {
    icon: <Icons.Home classes={""} />,
    label: "Dashboard",
    to: "/",
    protectedRoute: false,
  },
  {
    icon: <Icons.Messanger classes={""} />,
    label: "Messenger",
    to: "/conversations",
    protectedRoute: true,
  },
  {
    icon: <Icons.Controller classes={""} />,
    label: "Games",
    to: "/games",
    protectedRoute: false,
  },
  {
    icon: <Icons.Settings classes={""} />,
    label: "Settings",
    to: "/settings",
    protectedRoute: true,
  },
  {
    icon: <Icons.Profile classes={""} />,
    label: "Account",
    to: "/account",
    protectedRoute: true,
  },
  {
    icon: <Icons.Moon classes={""} />,
    label: "Theme",
    to: "/theme",
    protectedRoute: false,
  },
  {
    icon: <Icons.Moon classes={""} />,
    label: "Friends",
    to: "/friends",
    protectedRoute: true,
  },
];

export const NavbarMinimal: React.FC = () => {
  const { pathname } = useLocation();
  const isActive = (to) => startPath(pathname) === to;
  const isLogged = useAppSelector((store) => store.profile.isLogged);

  const links = mockdata
    .filter(
      ({ protectedRoute }) => !protectedRoute || (protectedRoute && isLogged)
    )
    .map(({ icon, label, to }) => {
      return (
        <NavLink
          key={label}
          to={to}
          className={`nav-link ${isActive(to) ? "nav-link--active" : ""}`}
        >
          {icon}
          <span>{label}</span>
        </NavLink>
      );
    });

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
