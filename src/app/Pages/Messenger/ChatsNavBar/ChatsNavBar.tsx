import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Box,
  NavLink,
} from "@mantine/core";
import { IconNotes, IconCalendarStats } from "@tabler/icons";
import { Link, useParams } from "react-router-dom";
import { useGetProfileQuery } from "store/tgamesapi/profile";

type Props = {
  rooms: Rooms | undefined;
};

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export const ChatsNavBar = ({ rooms }: Props) => {
  const params = useParams();
  const { classes } = useStyles();
  const group_rooms = rooms?.group_rooms.map((room: GroupRoom) => (
    <NavLink
      key={room.id}
      label={room.name}
      component={Link}
      to={`/conversations/${room.id}`}
      active={params.id === String(room.id)}
    />
  ));
  const private_rooms = rooms?.private_rooms.map((room: PrivateRoom) => (
    <NavLink
      key={room.id}
      label={room.participant.username}
      component={Link}
      to={`/conversations/${room.id}`}
      active={params.id === String(room.id)}
    />
  ));

  return (
    <Box>
      <Navbar
        height="100%"
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            {"LOGO"}
            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
          </Group>
        </Navbar.Section>
        <NavLink
          label="Private Chats"
          icon={""}
          childrenOffset={0}
          defaultOpened
        >
          {private_rooms}
        </NavLink>

        <NavLink label="Group Chats" icon={""} childrenOffset={0} defaultOpened>
          {group_rooms}
        </NavLink>
      </Navbar>
    </Box>
  );
};
