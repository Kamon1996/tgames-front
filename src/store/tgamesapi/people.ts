import { flashSuccess } from "app/components/Common/Notification/flashs";
import { tgamesApi } from ".";

declare global {
  interface IPeople {
    all: IUser[] | [];
    friends: IUser[] | [];
    following: IUser[] | [];
    followers: IUser[] | [];
  }

  interface IUser {
    created_at: string;
    email: string;
    user_id: number;
    name: string;
    username: string;
  }
}

const peopleApi = tgamesApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvites: builder.query<IPeople, void>({
      query: () => ({
        url: `/invites`,
      }),
      providesTags: ["People"],
    }),
    follow: builder.mutation<void, number>({
      query: (recipient_id) => ({
        url: `/invites`,
        method: "POST",
        body: { recipient_id },
      }),
      invalidatesTags: ["People"],
      async onQueryStarted(body, { queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Create Follow",
            message: "Successfully Following",
          });
        } catch {}
      },
    }),
    unfollow: builder.mutation<void, number>({
      query: (id) => ({
        url: `/invites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["People"],
      async onQueryStarted(body, { queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Unfollow",
            message: "Successfully Unfollow",
          });
        } catch {}
      },
    }),
  }),
});

export const { useFollowMutation, useUnfollowMutation, useGetInvitesQuery } =
  peopleApi;
