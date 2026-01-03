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
import { useTheme } from "next-themes";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContent";

const topNavList = [
  {
    name: "chats",
    icon: MessageSquareText,
    sectionName: "chat-section",
  },
  {
    name: "status",
    icon: CircleDashed,
    sectionName: "status-section",
  },
  {
    name: "channels",
    icon: MessageCircleDashed,
    sectionName: "channel-section",
  },
  {
    name: "communities",
    icon: Users,
    sectionName: "community-section",
  },
];

export const navButtonStyle =
  "rounded-full cursor-pointer p-5 [&:hover]:bg-bg-tertiary";

export function SideNavBar() {
  const { theme, setTheme } = useTheme();
  const { setAuthSection } = useContext(AuthContext);
  return (
    <div className="border h-screen flex flex-col justify-between items-center py-2.5 bg-bg-primary">
      <div className="flex flex-col gap-2.5">
        {topNavList.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={navButtonStyle}
            onClick={() => setAuthSection(item.sectionName)}
          >
            <item.icon
              strokeWidth={2.5}
              absoluteStrokeWidth
              className="size-5"
            />
          </Button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2.5 pb-2.5">
        <Button
          variant="ghost"
          className={navButtonStyle}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={navButtonStyle}
          onClick={() => setAuthSection("settings-section")}
        >
          <Settings strokeWidth={2.5} absoluteStrokeWidth className="size-5" />
        </Button>
        <Avatar className="size-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
