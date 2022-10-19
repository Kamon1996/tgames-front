import { Modal, Button, Group, Textarea, Avatar, Text } from "@mantine/core";
import { useState } from "react";
import { useSendMessageMutation } from "store/tgamesapi/messages";

interface IProps {
  opened: boolean;
  onClose: () => void;
  avatar: string;
  username: string;
  user_id: number;
}

export const MessageNewModal = ({
  opened,
  onClose,
  avatar,
  username,
  user_id,
}: IProps) => {
  const [sendMessage] = useSendMessageMutation();

  const [body, setBody] = useState<string>("");

  const handleSendMessage = () => {
    sendMessage({ body, receivable_type: "User", receivable_id: user_id });
    setBody("");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      radius="md"
      onClose={onClose}
      title="Новое сообщение"
    >
      <Group noWrap mb="md">
        <Avatar src={avatar} size={70} radius="md" />
        <Text size="md">{username}</Text>
      </Group>
      <form action="">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          minRows={4}
          maxRows={4}
          mb="md"
        ></Textarea>
        <Group noWrap position="right">
          <Button variant="gradient" size="xs" onClick={handleSendMessage}>
            Send
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
