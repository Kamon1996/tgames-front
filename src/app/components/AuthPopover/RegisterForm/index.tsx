import React from "react";
import { z } from "zod";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "store";
import {
  flashError,
  flashSuccess,
} from "app/components/Common/Notification/flashs";
import { fetchRegister } from "store/reducers/profile/profileReducer";

interface IProps {
  closePopover: () => void;
  toggleForm: () => void;
}

export const RegisterForm: React.FC<IProps> = ({
  closePopover,
  toggleForm,
}) => {
  const profile = useAppSelector((store) => store.profile);

  const dispatch = useAppDispatch();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password should have at least 6 letters" }),
    username: z
      .string()
      .min(3, { message: "Username should have at least 3 letters" }),
    name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  });

  const handleError = (errors) => {};

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (payload: RegisterData) => {
    try {
      await dispatch(fetchRegister(payload)).unwrap();
      flashSuccess({ title: "Register", message: "Success Register" });
      closePopover();
    } catch (message) {
      flashError({ title: "Register", message });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <LoadingOverlay visible={profile.status === "loading"} overlayBlur={1} />
      <Paper withBorder shadow="md" p="18px 24px 20px 24px" radius="md">
        <TextInput
          withAsterisk
          required
          label="Username"
          placeholder="Kuro_137"
          {...form.getInputProps("username")}
        />
        <TextInput
          withAsterisk
          required
          label="Name"
          placeholder="Elon Musk"
          {...form.getInputProps("full_name")}
        />
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
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={toggleForm}
            size="xs"
          >
            {"Already have an account? Login"}
          </Anchor>
          <Button type="submit" fullWidth mt="xs">
            {"Create Account"}
          </Button>
        </Group>
      </Paper>
    </form>
  );
};
