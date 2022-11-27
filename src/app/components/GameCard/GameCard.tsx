import {
  Card,
  Flex,
  Image,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { Icons } from "assets/icons";
import { Carousel } from "@mantine/carousel";
import React, { useMemo } from "react";
import { number } from "zod";

const sliderImages = [
  "https://s5-goods.ozstatic.by/2000/479/831/10/10831479_0.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_10.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_11.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_12.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_13.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_14.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_15.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_16.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_17.jpg",
  "https://s5-frame.ozstatic.by/1000/479/831/10/10831479_18.jpg",
];

const difficultSmilesConfig = {
  easy: <Icons.HappySmile />,
  medium: <Icons.MediumSmile />,
  hard: <Icons.SadSmile />,
};

export const GameCard = ({
  title,
  description,
  min_players,
  max_players,
  avg_duration,
  difficult_level,
  image,
  otherImages,
}: IGameCard) => {
  const minMaxPlayers = useMemo(
    () =>
      min_players === max_players
        ? min_players
        : `${min_players} - ${max_players}`,
    [min_players, max_players]
  );
  return (
    <Card bg={"#0000001a"} radius={"lg"} maw={500}>
      <Flex align={"center"} gap={15}>
        <Carousel
          height={200}
          slideGap="md"
          miw={150}
          styles={{
            control: {
              "&[data-inactive]": {
                opacity: 0,
                cursor: "default",
              },
            },
          }}
        >
          <Carousel.Slide>
            <Image src={image} fit={"cover"} height={200} />
          </Carousel.Slide>
          {otherImages?.map((imgSrc) => (
            <Carousel.Slide>
              <Image src={imgSrc} fit={"cover"} height={200} />
            </Carousel.Slide>
          ))}
        </Carousel>
        <Stack miw={230}>
          <Title order={1}>{title}</Title>
          <Text fz="xs" lineClamp={5}>
            {description}
          </Text>
          <Flex gap="xs" justify={"space-between"}>
            <PlayersCountLabel label={minMaxPlayers} />
            <DurationLabel label={avg_duration} />
            <DifficultLabel label={difficult_level} />
          </Flex>
        </Stack>
      </Flex>
    </Card>
  );
};

export const DurationLabel = ({ label }: { label: number }) => {
  return (
    <Tooltip label={`Средняя продолжительность игры ${label} минут`}>
      <Flex align={"center"} gap={3}>
        <ThemeIcon variant={"filled"} radius={"xl"} color={"transparent"}>
          <Icons.Time classes="" />
        </ThemeIcon>
        <Text size={"sm"}>{`${label} мин`}</Text>
      </Flex>
    </Tooltip>
  );
};

export const PlayersCountLabel = ({ label }: { label: string | number }) => {
  return (
    <Tooltip label={`Игра предназначена для ${label} игроков`}>
      <Flex align={"center"} gap={3}>
        <ThemeIcon variant={"filled"} radius={"xl"} color={"transparent"}>
          <Icons.Man classes="" />
        </ThemeIcon>
        <Text size={"sm"}>{label}</Text>
      </Flex>
    </Tooltip>
  );
};

export const DifficultLabel = ({ label }: { label: GameLevel }) => {
  return (
    <Tooltip label={`Сложность игры "${label}"`}>
      <Flex align={"center"} gap={3}>
        <ThemeIcon variant={"filled"} radius={"xl"} color={"transparent"}>
          {difficultSmilesConfig[label]}
        </ThemeIcon>
        <Text size={"sm"}>{label}</Text>
      </Flex>
    </Tooltip>
  );
};
