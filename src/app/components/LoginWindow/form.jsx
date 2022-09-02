import React from "react";
import { z } from "zod";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  NumberInput,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../../store/reducers/users/userReducer";
import { useForm, zodResolver } from "@mantine/form";

export function LoginForm() {
  const dispatch = useDispatch();

  const schema = z.object({
    name: z.string().min(2, { message: "Name should have at least 2 letters" }),
    sername: z
      .string()
      .min(2, { message: "Sername should have at least 2 letters" }),
    email: z.string().email({ message: "Invalid email" }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: "",
      sername: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    dispatch(fetchLogin(values));
  };

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Title mb={"sm"} align="center">
          Login
        </Title>
        <TextInput
          withAsterisk
          required
          label="name"
          placeholder="name"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          required
          label="sername"
          placeholder="sername"
          {...form.getInputProps("sername")}
        />
        <TextInput
          withAsterisk
          required
          label="email"
          placeholder="email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          required
          label="password"
          placeholder="password"
          {...form.getInputProps("password")}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button disabled={() => form.isValid()} type="submit" fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </form>
  );
}
