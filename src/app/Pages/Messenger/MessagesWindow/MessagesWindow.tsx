import {
  Avatar,
  createStyles,
  LoadingOverlay,
  ScrollArea,
} from "@mantine/core";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { baseUrl } from "constants/evn";
import {
  useActionCable,
  useChannel,
} from "helpers/hooks/ActionCable/ActionCable";
import { useScrollBottom } from "helpers/hooks/useScrollBottom";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "store/tgamesapi/profile";
import { useGetOneRoomQuery } from "store/tgamesapi/rooms";

const useStyles = createStyles((theme) => ({
  scrollArea: {
    position: "relative",
    flex: 1,
    borderRadius: 6,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.blue[1],
    ".mantine-ScrollArea-thumb": {
      backgroundColor: theme.colors.dark[1],
    },
    ".mantine-ScrollArea-scrollbar": {
      background: "transparent",
    },
  },
}));

export default function MessagesWindow() {
  const { actionCable } = useActionCable(baseUrl[process.env.NODE_ENV]);
  const { subscribe, unsubscribe } = useChannel(actionCable);
  const [messages, setMessages] = useState<Message[] | []>([]);

  const { id } = useParams();

  const { data: profile } = useGetProfileQuery();
  const { data: room, isFetching } = useGetOneRoomQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const { targetRef, scrollableRef, resetScrolledBottom } = useScrollBottom({
    isFetching,
    content: messages,
    setContent: setMessages,
  });

  useEffect(() => {
    !isFetching && room && setMessages(room?.messages);
  }, [isFetching, room]);

  useEffect(() => {
    id &&
      subscribe(
        {
          channel: `MessagesChannel`,
          id,
        },
        {
          received: (message: Message) => {
            console.log(message);

            setMessages((prev) => [...prev, message]);
          },
        }
      );
    return () => {
      unsubscribe();
      resetScrolledBottom();
    };
  }, [id]);

  const { classes } = useStyles();

  return (
    <ScrollArea
      scrollbarSize={6}
      type="hover"
      ref={scrollableRef}
      className={classes.scrollArea}
    >
      {isFetching ? (
        <LoadingOverlay
          transitionDuration={300}
          overlayOpacity={0}
          visible={isFetching}
          overlayColor="#e3f5ff"
        />
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`user-message ${
              msg.sender_id === profile?.id ? "user-message--recipient" : ""
            }`}
          >
            <Avatar
              size={44}
              src={
                "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
              }
              radius={40}
            />
            <div className="user-message__data">
              <div className="user-message__head">
                <div className="user-message__full-name">{msg.sender_name}</div>
                <div className="user-message__time">{msg.created_at}</div>
              </div>
              <div className="user-message__value">{msg.body}</div>
            </div>
          </div>
        ))
      )}
      <div ref={targetRef} />
    </ScrollArea>
  );
}
