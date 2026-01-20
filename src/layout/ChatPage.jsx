import { useContext, useEffect } from "react";
import { Chats } from "../features/Chats/Chats";
import { Conversations } from "../features/Conversations/Conversations";
import { SettingsSection } from "../features/Settings-Section/Settings-Section";
import { SideNavBar } from "../features/Side-Nav-Section/Side-Nav-Bar";
import { AuthContext } from "../AuthContext/AuthContent";
import { ChannelSection } from "../features/Channels-Section/Channel-Section";
import { CommunitiesSection } from "../features/Communities-Section/Communities-Section";
import { StatusSection } from "../features/Status-Section/Status-Section";
import { AllUsers } from "../features/All-Users/All-users";
import { ProfileSection } from "../features/Profile-Section/Profile-Section";

export function ChatPage() {
  const { authSection, setUserId } = useContext(AuthContext);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <div className="flex bg-[#161717]">
      <div className="w-25 h-screen">
        <SideNavBar />
      </div>
      <div className="bg-[#161717] w-180 border-r border-r-white-100">
        {authSection === "chat-section" && <Chats />}
        {authSection === "all-users" && <AllUsers />}
        {authSection === "settings-section" && <SettingsSection />}
        {authSection === "channel-section" && <ChannelSection />}
        {authSection === "community-section" && <CommunitiesSection />}
        {authSection === "status-section" && <StatusSection />}
        {authSection === "profile-section" && <ProfileSection />}
      </div>
      <div className="w-full">
        <Conversations />
      </div>
    </div>
  );
}
