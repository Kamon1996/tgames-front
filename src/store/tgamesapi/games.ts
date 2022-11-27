import { flashSuccess } from "app/components/Common/Notification/flashs";
import { tgamesApi } from ".";

declare global {
  interface IGameCard {
    id: number;
    title: string;
    description: string;
    min_players: number;
    max_players: number;
    avg_duration: number;
    difficult_level: GameLevel;
    image: string;
    otherImages?: string[];
  }

  type GameLevel = "easy" | "medium" | "hard";
}

const gamesApi = tgamesApi.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<IGameCard[], void>({
      query: () => ({
        url: `/games`,
      }),
      providesTags: ["Games"],
    }),

    getOneGame: builder.query<IGameCard, number | string>({
      query: (id) => ({
        url: `/games/${id}`,
      }),
    }),
  }),
});

export const { useGetGamesQuery, useGetOneGameQuery } = gamesApi;
