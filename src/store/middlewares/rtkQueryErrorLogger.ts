import {
  MiddlewareAPI,
  isRejectedWithValue,
  AnyAction,
} from "@reduxjs/toolkit";
import { flashError } from "app/components/Common/Notification/flashs";
import {
  isDataWithTitleAndMessage,
  isFetchBaseQueryError,
} from "helpers/rtkQueryErrorTypePredicate";

export const rtkQueryErrorLogger =
  (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
    if (isRejectedWithValue(action)) {
      const { payload } = action;
      if (isFetchBaseQueryError(payload)) {
        const { status, data } = payload;
        if (status >= 500) {
          flashError({
            title: "Unexpected error",
            message: "Please, contact our support team dmitriu355@gmail.com",
          });
        } else if (status === 401) {
          flashError({
            title: "Unauthorized",
            message: "Full authentication is required to access this resource",
          });
        } else if (isDataWithTitleAndMessage(data)) {
          const { title, message } = data;
          flashError({
            title,
            message: typeof message === "string" ? message : message.join("\n"),
          });
        }
      }
    }
    return next(action);
  };
