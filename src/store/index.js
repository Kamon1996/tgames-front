import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profile/profileReducer";
import userReducer from "./reducers/users/userReducer";

export default configureStore({
  reducer: {
    users: userReducer,
    profile: profileReducer,
  },
});
