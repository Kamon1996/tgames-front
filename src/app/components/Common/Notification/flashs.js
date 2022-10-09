import { showNotification } from "@mantine/notifications";

const flashSuccess = ({ title, message }) => {
  return showNotification({
    id: title,
    autoClose: 3000,
    title,
    message,
    color: "green",
    sx: { whiteSpace: "pre-wrap" },
  });
};

const flashError = ({ title, message }) => {
  console.log("====================================");
  console.log({ title, message });
  console.log("====================================");
  return showNotification({
    id: title,
    autoClose: 3000,
    title,
    message,
    color: "red",
    sx: { whiteSpace: "pre-wrap" },
  });
};

export { flashSuccess, flashError };
