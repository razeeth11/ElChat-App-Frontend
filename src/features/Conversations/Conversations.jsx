import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, Plus, Search, SendHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navButtonStyle } from "../Side-Nav-Section/Side-Nav-Bar";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { socket } from "../../socket";
import { AuthContext } from "../../AuthContext/AuthContent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LOCAL_BASE_URL } from "../../App";
import dayjs from "dayjs";
import { queryClient } from "../../main";

export function Conversations() {
  const { userId, conversationId, receiverId } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const userDetailsQuery = useQuery({
    queryKey: ["selectedUserDetails", receiverId],
    queryFn: async ({ queryKey }) => {
      const result = await axios.get(`${LOCAL_BASE_URL}/user/${queryKey[1]}`);
      return result.data.userDetails;
    },
    enabled: !!receiverId,
  });

  const conversationsQuery = useQuery({
    queryKey: ["conversations", conversationId],
    queryFn: async ({ queryKey }) => {
      const result = await axios.get(
        `${LOCAL_BASE_URL}/conversation/${queryKey[1]}`
      );
      return result.data;
    },
    enabled: !!conversationId,
  });

  const { data: convosList } = conversationsQuery;
  const { data: userDetails } = userDetailsQuery;

  useEffect(() => {
    if (convosList?.conversations) {
      setMessages(convosList.conversations);
    }
  }, [convosList]);

  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.connect();

    socket.emit("register-user", userId);

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  function sendMessage() {
    if (!message.trim()) return;

    const payload = {
      conversationId,
      receiverId,
      senderId: userId,
      text: message,
      sendedAt: dayjs().format("YYYY-MM-DD HH:mm"),
    };

    setMessages((prev) => [...prev, payload]);

    socket.emit("send-message", payload);
    setMessage("");

    setTimeout(() => {
      queryClient.invalidateQueries(["chats"]);
    }, 2000);
  }

  return (
    <>
      {conversationId ? (
        <div className="relative">
          <div className="flex items-start gap-2.5 p-2">
            <div>
              <Avatar className="size-10">
                <AvatarImage src={userDetails?.avatarUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="">{userDetails?.displayName}</h3>
              <p className="text-sm">{userDetails?.about}</p>
            </div>
            <div className="ml-auto">
              <Button variant="ghost" className={navButtonStyle}>
                <EllipsisVertical
                  strokeWidth={2.5}
                  absoluteStrokeWidth
                  className="size-5"
                />
              </Button>
            </div>
          </div>
          <Separator />
          <ScrollArea className="cursor-pointer h-[92vh] p-5">
            <div className="flex flex-col gap-2.5 pb-15">
              {messages.map((msg, i) => (
                <ChatMessage key={i} msg={msg} userId={userId} />
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center absolute bottom-0 w-full bg-bg-primary py-2 border-t border-gray-900">
            <Button variant="ghost" className={navButtonStyle}>
              <Plus strokeWidth={2.5} absoluteStrokeWidth className="size-5" />
            </Button>
            <div className="w-full relative">
              <Input
                className="focus-visible:ring-0 border-none h-12 bg-bg-tertiary"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
            </div>
            <Button
              variant="ghost"
              className={navButtonStyle}
              onClick={sendMessage}
            >
              <SendHorizontal strokeWidth={2.5} absoluteStrokeWidth />
            </Button>
          </div>
        </div>
      ) : (
        <div>Vanakam da mapla</div>
      )}
    </>
  );
}

function ChatMessage({ msg, userId }) {
  return (
    <div
      className={clsx(
        "flex items-end gap-3 w-fit max-w-[60%] p-2 rounded-sm",
        msg.senderId === userId ? "bg-bg-tertiary" : "bg-bg-secondary",
        msg.senderId === userId && "ml-auto"
      )}
    >
      <div>{msg.text}</div>
      <p className="text-[10px] text-gray-500">
        {dayjs(msg.sendedAt).format("HH:mm")}
      </p>
    </div>
  );
}
