import { flashSuccess } from "app/components/Common/Notification/flashs";
import { tgamesApi } from ".";

declare global {
  type Message = {
    id: number;
    body: string;
    created_at: string;
    receivable_id: number;
    receivable_type: "PrivateRoom" | "Room";
    sender_id: number;
    updated_at: string;
  };

  type MessageCreateParams = {
    body: string;
    receivable_type: "PrivateRoom" | "Room" | "User";
    receivable_id: number;
  };

  type MessageUpdateParams = {
    id: number;
    body: string;
  };
}

const messagesApi = tgamesApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<void, MessageCreateParams>({
      query: (body) => ({
        url: `/messages`,
        method: "POST",
        body,
      }),
      async onQueryStarted(body, { queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Create Message",
            message: "Message Successfully Sended",
          });
        } catch {}
      },
    }),
    updateMessage: builder.mutation<void, MessageUpdateParams>({
      query: ({ id, body }) => ({
        url: `/messages/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(body, { queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Update Messages",
            message: "Message Successfully Updated",
          });
        } catch {}
      },
    }),
    removeMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(body, { queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Delete Message",
            message: "Message Successfully Deleted",
          });
        } catch {}
      },
    }),
  }),
});

export const {
  useRemoveMessageMutation,
  useSendMessageMutation,
  useUpdateMessageMutation,
} = messagesApi;
