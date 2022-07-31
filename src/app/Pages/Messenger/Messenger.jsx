import React, { useState, useEffect } from "react";
import { Avatar, ScrollArea, ActionIcon, Center } from "@mantine/core";
import ContentEditable from "react-contenteditable";
import { IconSend } from "@tabler/icons";

import "./index.scss";
import { useSelector } from "react-redux";
import { CableApp } from "../../../constants/Cabels/Cables";

export default function Messenger() {
  const [inputState, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { profile } = useSelector((state) => state.users);

  useEffect(() => {
    if (profile.id) {
      fetch(`/api/users/${profile.id}/message_history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: profile.id,
          recipient_id: 2,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setMessages(data);
          });
        }
      });
    }
  }, [profile.id, setMessages]);

  useEffect(() => {
    if (profile.id) {
      CableApp.cable.subscriptions.create(
        {
          channel: "ChatsChannel",
          user_id: profile.id,
          recipient_id: 2,
        },
        {
          received: (message) => {
            setMessages([...messages, message]);
          },
        }
      );
    }
  }, [profile.id, CableApp.cable.subscriptions, setMessages, messages]);

  return (
    <div className="messenger">
      <div className="messenger__window">
        <div className="user-message">
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
              <div className="user-message__time">13:30</div>
            </div>
            <div className="user-message__value">Hahah, and I'm already</div>
          </div>
        </div>
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
        <ActionIcon mb={2} variant="transparent">
          <IconSend color="white" size={22} />
        </ActionIcon>
      </div>
    </div>
  );
}
