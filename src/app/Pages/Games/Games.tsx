import { GameCard } from "app/components/GameCard/GameCard";
import React from "react";
import { useGetGamesQuery } from "store/tgamesapi/games";

export const Games = () => {
  const { data: games } = useGetGamesQuery();

  return (
    <>
      {games?.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </>
  );
};
