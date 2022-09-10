import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";

const container = document.getElementById("root") || document.body;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
