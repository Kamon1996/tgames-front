import { Group, Navbar } from "@mantine/core";
import { useState } from "react";
import { useStyles } from "./Styles";

type Props = {
  rooms: [] | Room[] | undefined
};

export const ChatsNavBar = ({ rooms }: Props) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = rooms?.map((chat) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: chat.label === active,
      })}
      href={chat.link}
      key={chat.id}
      onClick={(event) => {
        event.preventDefault();
        setActive(chat.label);
      }}
    >
      <chat.avatar className={classes.linkIcon} stroke={1.5} />
      <span>{chat.label}</span>
    </a>
  ));

  return (
    <Navbar height="100%" width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {"Private Messages"}
        </Group>
        {links}
      </Navbar.Section>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {"Group Chats"}
        </Group>
        {links}
      </Navbar.Section>
    </Navbar>
  );
};
