import { Button, Card, createStyles, Image, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFollowMutation, useUnfollowMutation } from "store/tgamesapi/people";
import { MessageNewModal } from "./MessageNewModal/MessageNewModal";

interface IProps extends IUser {
  status: string;
  invite_id: number;
}

export const UserCard = ({
  username,
  name,
  created_at,
  email,
  user_id,
  invite_id,
  status,
}: IProps) => {
  const useStyles = createStyles((theme) => ({
    card: {
      maxWidth: 220,
      minWidth: 190,
    },
    button: {
      backgroundImage: "linear-gradient(45deg, #748ffc 0%, #3bc9db 100%)",
    },
  }));

  const [followUser] = useFollowMutation();
  const [unfollow, {}] = useUnfollowMutation();
  const [opened, setOpened] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setOpened(true);
  };

  const statusActions = {
    friend: { title: "Remove Friend", action: () => unfollow(invite_id) },
    following: { title: "Unfollow", action: () => unfollow(invite_id) },
    follower: {
      title: "Accept Friend",
      action: () => followUser(user_id),
    },
    new: {
      title: "Add Friend",
      action: () => followUser(user_id),
    },
  };

  const { classes } = useStyles();

  return (
    <Card component={Link} to={`#`} radius="md" p="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://mult34.com/wp-content/uploads/2020/05/Avatar-porn-pics-045.jpg"
          height={120}
        />
      </Card.Section>
      <Card.Section>
        <Text align="center" size="lg" weight={700}>
          {username}
        </Text>
      </Card.Section>
      <Card.Section>
        <Button
          variant="gradient"
          size="xs"
          radius={0}
          fullWidth={true}
          className={classes.button}
          onClick={openModal}
        >
          Send message
        </Button>
        <MessageNewModal
          opened={opened}
          onClose={() => setOpened(false)}
          user_id={user_id}
          avatar={
            "https://mult34.com/wp-content/uploads/2020/05/Avatar-porn-pics-045.jpg"
          }
          username={username}
        />
      </Card.Section>
      <Card.Section>
        <Button
          variant="gradient"
          size="xs"
          radius={0}
          fullWidth={true}
          className={classes.button}
          onClick={statusActions[status].action}
        >
          {statusActions[status].title}
        </Button>
      </Card.Section>
    </Card>
  );
};
