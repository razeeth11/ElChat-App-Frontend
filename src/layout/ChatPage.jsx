import { useContext } from "react";
import { Chats } from "../features/Chats/Chats";
import { Conversations } from "../features/Conversations/Conversations";
import { SettingsSection } from "../features/Settings-Section/Settings-Section";
import { SideNavBar } from "../features/Side-Nav-Section/Side-Nav-Bar";
import { AuthContext } from "../AuthContext/AuthContent";
import { ChannelSection } from "../features/Channels-Section/Channel-Section";
import { CommunitiesSection } from "../features/Communities-Section/Communities-Section";
import { StatusSection } from "../features/Status-Section/Status-Section";
import { AllUsers } from "../features/All-Users/All-users";

export function ChatPage() {
  const { authSection } = useContext(AuthContext);
  return (
    <div className="flex">
      <div className="w-25 h-screen">
        <SideNavBar />
      </div>
      <div className="bg-bg-secondary w-180">
        {authSection === "chat-section" && <Chats />}
        {authSection === "all-users" && <AllUsers />}
        {authSection === "settings-section" && <SettingsSection />}
        {authSection === "channel-section" && <ChannelSection />}
        {authSection === "community-section" && <CommunitiesSection />}
        {authSection === "status-section" && <StatusSection />}
      </div>
      <div className="w-full">
        <Conversations />
      </div>
    </div>
  );
}
