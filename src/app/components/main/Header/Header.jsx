import { Button, Modal, Group, Text, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";
import { LoginForm } from "../../LoginWindow/form";

export function Header({ user }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Group position="center">
        <Button onClick={() => setOpened((o) => !o)}>Toggle dialog</Button>
      </Group>

      <Modal
        radius="md"
        withCloseButton={false}
        padding={0}
        size="md"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <LoginForm />
      </Modal>
    </>
  );
}
