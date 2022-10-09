import { flashSuccess } from "app/components/Common/Notification/flashs";
import { tgamesApi } from ".";

declare global {
  type Room = {
    id: number;
    owner_id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };

  type RoomCreateParams = {
    name: string;
  };

  type RoomUpdateParams = {
    name: string;
    id: number;
  };
}

const roomsApi = tgamesApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<Room[] | [], void>({
      query: () => ({
        url: `/rooms`,
      }),
    }),
    getOneRoom: builder.query<Room, number>({
      query: (id) => ({
        url: `/rooms/${id}`,
      }),
    }),
    createRoom: builder.mutation<void, RoomCreateParams>({
      query: (body) => ({
        url: `/rooms`,
        method: "POST",
        body,
      }),
      async onQueryStarted(body, { queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Create Room",
            message: "Room Successfully Created",
          });
        } catch {}
      },
    }),
    updateRoom: builder.mutation<void, RoomUpdateParams>({
      query: ({ id, name }) => ({
        url: `/rooms/${id}`,
        method: "PUT",
        body: name,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Update Room",
            message: "Room Successfully Updated",
          });
        } catch {}
      },
    }),
    destroyRoom: builder.mutation<void, number>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(body, { queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Delete Room",
            message: "Room Successfully Deleted",
          });
        } catch {}
      },
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetOneRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDestroyRoomMutation,
} = roomsApi;
