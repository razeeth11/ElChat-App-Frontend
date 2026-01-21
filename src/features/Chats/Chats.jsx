import { EllipsisVertical, MessageSquarePlus, Search } from "lucide-react";
import { navButtonStyle } from "../Side-Nav-Section/Side-Nav-Bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "../../AuthContext/AuthContent";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LOCAL_BASE_URL } from "../../App";
import dayjs from "dayjs";
import clsx from "clsx";
import GlobalTooltip from "../../components/ui/GlobalTooltip";
export function Chats() {
  const { setAuthSection, userId } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["chats", userId],
    queryFn: async ({ queryKey }) => {
      const result = await axios.get(`${LOCAL_BASE_URL}/chat/${queryKey[1]}`);
      return result.data;
    },
    enabled: !!userId,
  });

  return (
    <div className="flex flex-col gap-2.5 px-5 py-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">ElChatApp</h2>
        <div className="flex items-center gap-2.5">
          <GlobalTooltip content="Find User" position="down">
            <Button
              variant="ghost"
              size="icon"
              className={navButtonStyle}
              onClick={() => setAuthSection("all-users")}
            >
              <MessageSquarePlus
                strokeWidth={2.5}
                absoluteStrokeWidth
                className="size-5"
              />
            </Button>
          </GlobalTooltip>
          <GlobalTooltip content="Menu" position="down">
            <Button variant="ghost" size="icon" className={navButtonStyle}>
              <EllipsisVertical
                strokeWidth={2.5}
                absoluteStrokeWidth
                className="size-5"
              />
            </Button>
          </GlobalTooltip>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-full relative">
          <Search className="size-5 absolute top-2.5 left-5" />
          <Input
            className="rounded-full pl-13 focus-visible:ring-0 h-10"
            placeholder="Search"
          />
        </div>
        {data?.chats.length ? (
          <div className="flex items-center gap-2">
            {["All", "Unread", "Favourites", "Groups"].map((list, index) => (
              <Button
                key={index}
                variant="ghost"
                className="border rounded-full py-1 px-4 cursor-pointer"
              >
                {list}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
      <ScrollArea className="cursor-pointer h-[80vh]">
        <div className="flex flex-col gap-1 overflow-hidden">
          {data?.chats.map((chat, i) => (
            <div key={i}>
              <ChatSection chat={chat} userId={userId} />
            </div>
          ))}
        </div>
        {data?.chats.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10">
            <div>No chats yet!</div>
            <div>Find users from top right</div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export function ChatSection({ chat, userId }) {
  const { setConversationId, conversationId, setReceiverId } =
    useContext(AuthContext);

  const usersQuery = useQuery({
    queryKey: ["usersApi"],
    queryFn: async () => {
      const result = await axios.get(`${LOCAL_BASE_URL}/user/allUsers`);
      return result.data;
    },
    select: (data) => {
      return {
        ...data,
        users: data.users?.filter((user) => user._id != userId),
      };
    },
  });

  const { data: allUsersList } = usersQuery;

  const receiverId = chat?.users.filter((u) => u != userId);
  const userDetail = allUsersList?.users.find((u) => u._id === receiverId[0]);

  function selectConvo(chat) {
    setConversationId(chat._id);
    setReceiverId(userDetail?._id);
  }

  return (
    <div
      role="button"
      className={clsx(
        "flex items-start gap-2.5 [&:hover]:bg-bg-tertiary p-2.5 rounded-sm",
        chat._id === conversationId && "bg-bg-tertiary",
      )}
      onClick={() => selectConvo(chat)}
    >
      <div>
        <Avatar className="size-11">
          <AvatarImage src={userDetail?.avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h3 className="">{userDetail?.displayName}</h3>
        <p className="w-70 whitespace-nowrap text-ellipsis overflow-x-hidden text-sm">
          {chat.lastMessage}
        </p>
      </div>
      <div className="text-[12px] ml-auto">
        <p>{dayjs(chat.lastUpdatedAt).format("HH:mm")}</p>
      </div>
    </div>
  );
}
