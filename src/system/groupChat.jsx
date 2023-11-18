import "react-chat-elements/dist/main.css";

import { ChatList, MessageList } from "react-chat-elements";
import SystemHeader from "./header";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AiOutlineLeft } from "react-icons/ai";

const MyMessageList = styled(MessageList)`
  .rce-mbox-text {
    max-width: 300px;
    border-radius: 12px;
  }

  .rce-mbox:not(.rce-mbox-right) {
    margin-right: 30%;
  }

  .rce-mbox.rce-mbox-right {
    margin-left: 30%;
  }
`;

const getMessagesByGroupId = (groupId) => {
  return [
    {
      position: "left",
      type: "text",
      title: "Kursat",
      text: "Give me a message list example!",
      avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    },
    {
      position: "left",
      type: "text",
      title: "Emre",
      text: "That's all.",
      avatar: "https://avatars.githubusercontent.com/u/805406",
    },
    {
      position: "right",
      type: "text",
      title: "Backdoor",
      text: "When should we submit the code?",
      avatar: "https://avatars.githubusercontent.com/u/20609724",
    },
    {
      position: "left",
      type: "text",
      title: "Kursat",
      text: "Give me a message list example!",
      avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    },
    {
      position: "left",
      type: "text",
      title: "Emre",
      text: "That's all.",
      avatar: "https://avatars.githubusercontent.com/u/805406",
    },
    {
      position: "left",
      type: "text",
      title: "Kursat",
      text: "Give me a message list example!",
      avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    },
    {
      position: "left",
      type: "text",
      title: "Emre",
      text: "That's all.",
      avatar: "https://avatars.githubusercontent.com/u/805406",
    },
    {
      position: "left",
      type: "text",
      title: "Kursat",
      text: "Give me a message list example!",
      avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    },
  ];
};

function GroupChat({ funs, fresh }) {
  let [animation, setAnimation] = useState("ani_scale_in");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const groups = [
    {
      id: 1,
      avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
      alt: "kursat_avatar",
      title: "Polkadot Hackathon 2023",
      subtitle: "Backdoor: When should we submit the code?", // Latest group messages
      date: new Date(),
      unread: 3,
    },
  ];

  const sendMessage = () => {
    setMessages([
      ...messages,
      {
        position: "right",
        type: "text",
        title: "Backdoor",
        text: input,
        avatar: "https://avatars.githubusercontent.com/u/20609724",
      },
    ]);
    setInput("");
  };

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogScrollRef = useRef(null);

  useEffect(() => {
    if (dialogScrollRef.current) {
      dialogScrollRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <div id="page" className={animation}>
      <SystemHeader funs={funs} setAnimation={setAnimation} title="GroupChat" />
      <ChatList
        className="chat-list"
        dataSource={groups}
        onClick={(group) => {
          setSelectedGroup(group);
          setMessages(getMessagesByGroupId(group.id));
          setIsDialogOpen(true);
        }}
      />
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="bg-body-tertiary px-2 d-flex align-items-center">
          <button className="btn" onClick={() => setIsDialogOpen(false)}>
            <AiOutlineLeft size={24}></AiOutlineLeft>
          </button>
          <DialogTitle>{selectedGroup.title}</DialogTitle>
        </div>
        <DialogContent className="py-4">
          <MyMessageList
            className="message-list"
            lockable={false}
            toBottomHeight={"100%"}
            dataSource={messages}
          />
          {/* Invisible element, at the bottom of messages */}
          <p ref={dialogScrollRef}></p>
        </DialogContent>
        <DialogActions className="">
          <input
            className="form-control"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            className="btn btn-md btn-primary"
            type="button"
            onClick={sendMessage}
          >
            Send
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GroupChat;
