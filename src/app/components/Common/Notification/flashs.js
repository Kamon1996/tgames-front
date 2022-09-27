import { showNotification } from "@mantine/notifications";

const flashSuccess = ({ title, message }) => {
  return showNotification({
    autoClose: 3000,
    title,
    message,
    color: "green",
    sx: { whiteSpace: "pre-wrap" },
  });
};

const flashError = ({ title, message }) => {
  return showNotification({
    autoClose: 50000,
    title,
    message,
    color: "red",
    sx: { whiteSpace: "pre-wrap" },
  });
};

export { flashSuccess, flashError };
