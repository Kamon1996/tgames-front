import React, { useState, useEffect, Fragment } from "react";
import { Avatar, ScrollArea, ActionIcon, Center } from "@mantine/core";
import ContentEditable from "react-contenteditable";
import { IconSend } from "@tabler/icons";

import "./index.scss";
import { useGetProfileQuery } from "store/tgamesapi/profile";
import {
  useActionCable,
  useChannel,
} from "helpers/hooks/ActionCable/ActionCable";
import { ChatsNavBar } from "./ChatsNavBar/ChatsNavBar";
import { showNotification } from "@mantine/notifications";
import { useGetRoomsQuery } from "store/tgamesapi/rooms";

type Message = {
  id: number;
  sender_id: number;
  recipient_type: string;
  recipient_id: string;
  body: string;
  updated_at: string;
};

export default function Messenger() {
  const [inputState, setInput] = useState("");
  const [messages, setMessages] = useState<Message[] | []>([]);
  const { data: profile } = useGetProfileQuery();
  const { actionCable } = useActionCable("ws://localhost:3000/cable");
  const { subscribe, unsubscribe } = useChannel(actionCable);
  const { data: rooms } = useGetRoomsQuery();

  useEffect(() => {
    subscribe(
      {
        channel: "MessagesChannel",
      },
      {
        received: (message: Message) => {
          setMessages((prev) => [...prev, message]);
        },
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:3000/messages", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: profile?.name,
        text: inputState,
      }),
    });
  };

  return (
    <div className="messenger">
      <ChatsNavBar rooms={rooms} />
      <div className="messenger__window">
        <div className="messenger__messages">
          {messages.length
            ? messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`user-message ${
                    msg.recipient_id === profile?.id
                      ? "user-message--recipient"
                      : ""
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
                      <div className="user-message__full-name">Michael</div>
                      <div className="user-message__time">{msg.created_at}</div>
                    </div>
                    <div className="user-message__value">{msg.body}</div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="messenger__input-wrapper">
          <Avatar
            size={34}
            src={
              "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"
            }
            radius={40}
          />
          <ContentEditable
            className="messenger__input"
            html={inputState}
            disabled={false}
            onChange={(e) => setInput(e.target.value)}
          />
          <ActionIcon onClick={handleSubmit} mb={2} variant="transparent">
            <IconSend color="white" size={22} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}
