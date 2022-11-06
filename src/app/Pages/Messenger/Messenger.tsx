import React, { useEffect, useState } from "react";
import { Avatar, ActionIcon, Textarea } from "@mantine/core";

import { IconSend } from "@tabler/icons";

import "./index.scss";

import { ChatsNavBar } from "./ChatsNavBar/ChatsNavBar";
import { useGetRoomsQuery } from "store/tgamesapi/rooms";

import { useParams } from "react-router-dom";
import MessagesWindow from "./MessagesWindow/MessagesWindow";
import { getHotkeyHandler } from "@mantine/hooks";
import { useSendMessageMutation } from "store/tgamesapi/messages";

export default function Messenger() {
  const [inputState, setInput] = useState("");
  const { data: rooms, refetch } = useGetRoomsQuery();
  const [sendMessage] = useSendMessageMutation();
  const { id } = useParams();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = (e) => {
    if (!id) return;
    e.preventDefault();
    const receivable_type = +id < 0 ? "Room" : "PrivateRoom";
    sendMessage({
      body: inputState,
      receivable_id: Math.abs(+id),
      receivable_type,
    });
    setInput("");
  };
  

  return (
    <div className="messenger">
      {<ChatsNavBar rooms={rooms} />}
      <div className="messenger__window">
        <MessagesWindow />
        {id ? (
          <div className="messenger__input-wrapper">
            <Avatar
              size={34}
              src={
                "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
              }
              radius={40}
            />
            <form className="messenger__form" onSubmit={handleSubmit}>
              <Textarea
                placeholder="type something..."
                autosize
                minRows={1}
                maxRows={4}
                value={inputState}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
                className="messenger__input"
              />
              <ActionIcon
                component="button"
                type="submit"
                mb={2}
                variant="transparent"
              >
                <IconSend color="white" size={22} />
              </ActionIcon>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
