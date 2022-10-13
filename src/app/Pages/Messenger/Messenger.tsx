import React, { useState } from "react";
import { Avatar, ActionIcon, Textarea } from "@mantine/core";

import { IconSend } from "@tabler/icons";

import "./index.scss";

import { ChatsNavBar } from "./ChatsNavBar/ChatsNavBar";
import { useGetRoomsQuery } from "store/tgamesapi/rooms";

import { useParams } from "react-router-dom";
import MessagesWindow from "./MessagesWindow/MessagesWindow";
import { getHotkeyHandler } from "@mantine/hooks";

declare global {
  type Message = {
    body: string;
    created_at: string;
    id: number;
    receivable_id: number;
    receivable_type: "PrivateRoom" | "Room";
    sender_id: number;
    updated_at: string;
  };
}

export default function Messenger() {
  const [inputState, setInput] = useState("");
  const { data: rooms } = useGetRoomsQuery();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/messages", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: inputState,
        id,
      }),
    });
    setInput("");
  };

  return (
    <div className="messenger">
      {<ChatsNavBar rooms={rooms} />}
      <div className="messenger__window">
        <MessagesWindow />
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
      </div>
    </div>
  );
}
