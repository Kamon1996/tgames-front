import React from "react";
import { useForm } from "react-hook-form";
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
} from "@mantine/core";
import { emailRegExp } from "../../constants/regexp";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/reducers/users/userReducer";

export function LoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = ({ email, password }) => {
    dispatch(fetchLogin({ email, password }));
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?
        <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            {...register("email", {
              required: "required",
              pattern: { value: emailRegExp, message: "Некорректная почта" },
            })}
            label="email"
            placeholder="email"
            className={errors.email && "red"}
          />
          <div className="error">{errors.email && errors.email.message}</div>
          <PasswordInput
            label="password"
            placeholder="password"
            mt="md"
            {...register("password", {
              required: "required",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
          />
          <div className="error">
            {errors.password && errors.password.message}
          </div>
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
          <Button disabled={!isValid} type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
