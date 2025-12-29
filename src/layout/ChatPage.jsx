import { Chats } from "../features/Chats/Chats";
import { Conversations } from "../features/Conversations/Conversations";
import { SideNavBar } from "../features/Side-Nav-Section/Side-Nav-Bar";

export function ChatPage() {
  return (
    <div className="flex">
      <div className="w-25 h-screen">
        <SideNavBar />
      </div>
      <div className="bg-bg-secondary w-180">
        <Chats />
      </div>
      <div className="w-full">
        <Conversations />
      </div>
    </div>
  );
}
