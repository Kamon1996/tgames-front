import React from "react";
import { z } from "zod";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { fetchLogin } from "../../../../store/reducers/profile/profileReducer";
import { useForm, zodResolver } from "@mantine/form";
import { flashError, flashSuccess } from "../../Common/Notification/flashs";
import { useAppDispatch, useAppSelector } from "store";

interface IProps {
  closePopover: () => void;
  toggleForm: () => void;
}

export const LoginForm: React.FC<IProps> = ({ closePopover, toggleForm }) => {
  const profile = useAppSelector((store) => store.profile);

  const dispatch = useAppDispatch();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password should have at least 6 letters" }),
  });

  const handleError = (errors) => {};

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (payload: LoginData) => {
    try {
      await dispatch(fetchLogin(payload)).unwrap();
      flashSuccess({ title: "Login", message: "Success Login" });
      closePopover();
    } catch (message) {
      flashError({ title: "Login", message });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <LoadingOverlay visible={profile.status === "loading"} overlayBlur={1} />
      <Paper withBorder shadow="md" p="18px 24px 20px 24px" radius="md">
        <TextInput
          withAsterisk
          required
          label="Email"
          placeholder="steffan_cat@kitty.meow"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          required
          label="Password"
          placeholder="Your Password"
          {...form.getInputProps("password")}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor
            onClick={(event: React.MouseEvent<HTMLElement>) =>
              event.preventDefault()
            }
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Group position="apart" mt="md">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={toggleForm}
            size="xs"
          >
            {"Don't have an account? Register"}
          </Anchor>
          <Button type="submit" fullWidth mt="xs">
            {"Login"}
          </Button>
        </Group>
      </Paper>
    </form>
  );
};
