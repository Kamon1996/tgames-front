import {
  Group,
  Avatar,
  Menu,
  UnstyledButton,
  ActionIcon,
  Title,
} from "@mantine/core";
import { Icons } from "assets/icons";
import { useGetProfileQuery, useLogOutMutation } from "store/tgamesapi/profile";

export const ProfileMenu: React.FC = () => {
  const { data: profile } = useGetProfileQuery();
  const [fetchLoginOut] = useLogOutMutation();

  const handleLoginOut = () => {
    fetchLoginOut();
  };

  return (
    <Group position="center">
      <Menu withArrow>
        <Menu.Target>
          <UnstyledButton>
            <Group>
              <Avatar
                size={44}
                src={"https://i.ytimg.com/vi/tdBdkxwQY-Q/maxresdefault.jpg"}
                radius={20}
              />
              <Title size={18} order={5}>
                {profile?.username}
              </Title>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            icon={
              <ActionIcon size={20}>
                <Icons.Moon classes={""} />
              </ActionIcon>
            }
          >
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<Icons.Moon classes={""} />}>
            Change Account
          </Menu.Item>
          <Menu.Item
            onClick={handleLoginOut}
            color="red"
            icon={<Icons.Moon classes={""} />}
          >
            Login out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
