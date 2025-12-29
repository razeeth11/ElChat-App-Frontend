import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, Plus, Search, SendHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navButtonStyle } from "../Side-Nav-Section/Side-Nav-Bar";
import { messageList } from "./convos";
import clsx from "clsx";

export function Conversations() {
  return (
    <div className="relative">
      <div className="flex items-start gap-2.5 p-2">
        <div>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="">Abdul Razeeth</h3>
          <p className="text-sm">Online</p>
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
          {messageList.map((msg, i) => (
            <ChatMessage key={i} msg={msg} />
          ))}
        </div>
      </ScrollArea>

      <div className="flex items-center absolute bottom-0 w-full bg-bg-primary py-2 border-t border-gray-900">
        <Button variant="ghost" className={navButtonStyle}>
          <Plus strokeWidth={2.5} absoluteStrokeWidth className="size-5" />
        </Button>
        <div className="w-full relative">
          <Input className="focus-visible:ring-0 border-none h-12 bg-bg-tertiary" />
        </div>
        <Button variant="ghost" className={navButtonStyle}>
          <SendHorizontal strokeWidth={2.5} absoluteStrokeWidth />
        </Button>
      </div>
    </div>
  );
}

function ChatMessage({ msg }) {
  return (
    <div
      className={clsx(
        "flex items-end gap-3 w-fit max-w-[60%] p-2 rounded-sm",
        msg.senderId === "user_2" ? "bg-bg-tertiary" : "bg-bg-secondary",
        msg.senderId === "user_2" && "ml-auto"
      )}
    >
      <div>{msg.textMessage}</div>
      <p className="text-[10px] text-gray-500">2:50pm</p>
    </div>
  );
}
