import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../store/reducers/users/userReducer";
import { PasswordStrength } from "./components/passwordField";
import { MantineProvider } from "@mantine/core";
import { LoginForm } from "./components/form";

function App() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.users.profile);

  useEffect(() => {
    dispatch(
      fetchLogin({ email: "dmitriu355@gmail.com", password: "Tenes1996aaa" })
    );
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <header className="App-header">
          <LoginForm />
          <button>Click me!</button>
        </header>
      </div>
    </MantineProvider>
  );
}

export default App;
