import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/users/userReducer";

export default configureStore({
  reducer: {
    users: userReducer,
  },
});
