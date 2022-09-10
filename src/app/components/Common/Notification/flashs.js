import { showNotification } from "@mantine/notifications";

const flashSuccess = ({ title, message }) => {
  return showNotification({
    autoClose: 3000,
    title,
    message,
    color: "green",
  });
};

const flashError = ({ title, message }) => {
  return showNotification({
    autoClose: 3000,
    title,
    message,
    color: "red",
  });
};

export { flashSuccess, flashError };
