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

export function Chats() {
  const { setAuthSection } = useContext(AuthContext);

  const userId = localStorage.getItem("userId");

  const { data } = useQuery({
    queryKey: ["chats", userId],
    queryFn: async () => {
      const result = await axios.get(`${LOCAL_BASE_URL}/chat/${userId}`);
      return result.data;
    },
  });

  return (
    <div className="flex flex-col gap-2.5 px-5 py-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">ElChatApp</h2>
        <div className="flex items-center gap-2.5">
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
          <Button variant="ghost" size="icon" className={navButtonStyle}>
            <EllipsisVertical
              strokeWidth={2.5}
              absoluteStrokeWidth
              className="size-5"
            />
          </Button>
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
      </div>
      <ScrollArea className="rounded-md cursor-pointer h-[80vh]">
        <div className="flex flex-col gap-1 overflow-hidden">
          {data?.chats.map((_, i) => (
            <div key={i}>
              <ChatSection />
            </div>
          ))}
        </div>
        {data?.chats.length === 0 && <div>No Chats</div>}
      </ScrollArea>
    </div>
  );
}

export function ChatSection() {
  return (
    <div className="flex items-start gap-2.5 [&:hover]:bg-bg-tertiary p-2.5 rounded-sm">
      <div>
        <Avatar className="size-11">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h3 className="">Abdul Razeeth</h3>
        <p className="w-70 whitespace-nowrap text-ellipsis overflow-x-hidden text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Consequuntur, iure?
        </p>
      </div>
      <div className="text-[12px] ml-auto">
        <p>10:50pm</p>
      </div>
    </div>
  );
}
