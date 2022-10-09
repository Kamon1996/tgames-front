import {
  Group,
  Avatar,
  Menu,
  UnstyledButton,
  ActionIcon,
  Title,
} from "@mantine/core";
import { Icons } from "assets/icons";
import { useLogOutMutation } from "store/tgamesapi/profile";

interface IProps {
  img: string | null;
  username: string;
}

export const ProfileManu: React.FC<IProps> = ({ img, username }) => {
  const [fetchLoginOut] = useLogOutMutation();

  const handleLoginOut = () => {
    fetchLoginOut()
  }

  return (
    <Group position="center">
      <Menu withArrow>
        <Menu.Target>
          <UnstyledButton>
            <Group>
              <Avatar size={44} src={img} radius={20} />
              <Title size={18} order={5}>
                {username}
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
