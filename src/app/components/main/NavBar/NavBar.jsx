import React, { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  NavLink,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconMessage2,
} from "@tabler/icons";

import { Link, useLocation } from "react-router-dom";

const mockdata = [
  { icon: <IconGauge />, label: "Dashboard", to: "/" },
  { icon: <IconMessage2/>, label: "Messenger", to: "/messenger" },
  { icon: <IconCalendarStats/>, label: "Games", to: "/games" },
  { icon: <IconSettings/>, label: "Settings", to: "/settings" },
];

export function NavbarMinimal() {
  const location = useLocation();
  const links = mockdata.map((link) => (
    <Tooltip key={link.label} label={link.label} position="right" transitionDuration={0}>
      <NavLink
        icon={link.icon}
        component={Link}
        to={link.to}
        active={location.pathname == link.to}
      />
    </Tooltip>
  ));

  return (
    <Navbar height={"100vh"} width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" /> */}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
