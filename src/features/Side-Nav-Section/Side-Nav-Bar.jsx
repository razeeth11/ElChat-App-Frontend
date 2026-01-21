import {
  CircleDashed,
  MessageCircleDashed,
  MessageSquareText,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContent";
import GlobalTooltip from "../../components/ui/GlobalTooltip";
import clsx from "clsx";

const topNavList = [
  {
    name: "Chats",
    icon: MessageSquareText,
    sectionName: "chat-section",
  },
  {
    name: "Status",
    icon: CircleDashed,
    sectionName: "status-section",
  },
  {
    name: "Channels",
    icon: MessageCircleDashed,
    sectionName: "channel-section",
  },
  {
    name: "Communities",
    icon: Users,
    sectionName: "community-section",
  },
];

export const navButtonStyle =
  "rounded-full cursor-pointer p-5 [&:hover]:bg-[#4b4b4b]!";

export function SideNavBar() {
  const { authSection, setAuthSection, userData } = useContext(AuthContext);

  return (
    <div className="border h-screen flex flex-col justify-between items-center py-2.5 bg-[#1d1f1f]">
      <div className="flex flex-col gap-2.5">
        {topNavList.map((item, index) => (
          <GlobalTooltip key={index} content={item.name} side={"right"}>
            <Button
              variant="ghost"
              size="icon"
              className={clsx(
                navButtonStyle,
                authSection === item.sectionName && "bg-[#4b4b4b]",
              )}
              onClick={() => setAuthSection(item.sectionName)}
            >
              <item.icon
                strokeWidth={2.5}
                absoluteStrokeWidth
                className="size-5"
              />
            </Button>
          </GlobalTooltip>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2.5 pb-2.5">
        <GlobalTooltip content="Settings" side={"right"}>
          <Button
            variant="ghost"
            size="icon"
            className={clsx(
              navButtonStyle,
              authSection === "settings-section" && "bg-[#4b4b4b]",
            )}
            onClick={() => setAuthSection("settings-section")}
          >
            <Settings
              strokeWidth={2.5}
              absoluteStrokeWidth
              className="size-5"
            />
          </Button>
        </GlobalTooltip>
        <GlobalTooltip content="Profile" side={"right"}>
          <Button
            variant="ghost"
            size="icon"
            className={clsx(
              navButtonStyle,
              authSection === "profile-section" && "bg-[#4b4b4b]",
            )}
            onClick={() => setAuthSection("profile-section")}
          >
            <Avatar className="size-7">
              <AvatarImage src={userData?.avatarUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </GlobalTooltip>
      </div>
    </div>
  );
}
