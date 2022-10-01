import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { rtkQueryErrorLogger } from "./middlewares/rtkQueryErrorLogger";
import profileReducer from "./reducers/profile/profileReducer";
import { tgamesApi } from "./tgamesapi";

export const store = configureStore({
  reducer: {
    [tgamesApi.reducerPath]: tgamesApi.reducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tgamesApi.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
