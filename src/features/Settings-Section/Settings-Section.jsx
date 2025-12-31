import {
  Bell,
  Keyboard,
  KeyRound,
  LockKeyhole,
  LogOut,
  MessageCircleQuestionMark,
  MessageSquareMore,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const optionsList = [
  {
    icon: KeyRound,
    title: "Account",
    text: "Security notifications, account info",
  },
  {
    icon: LockKeyhole,
    title: "Privacy",
    text: "Bloacked contacts, disappearing messages",
  },
  {
    icon: MessageSquareMore,
    title: "Chats",
    text: "Theme, wallpaper, chat settings",
  },
  {
    icon: Bell,
    title: "Notifications",
    text: "Messages, groups, sounds",
  },
  {
    icon: Keyboard,
    title: "Keyboard shortcuts",
    text: "Quick actions",
  },
  {
    icon: MessageCircleQuestionMark,
    title: "Help and feedback",
    text: "Help center, contact us, privacy policy",
  },
];

export function SettingsSection() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <h2 className="text-2xl">Settings</h2>
      </div>
      <div className="w-full relative">
        <Search className="size-5 absolute top-2.5 left-5" />
        <Input
          className="rounded-full pl-13 focus-visible:ring-0 h-10"
          placeholder="Search"
        />
      </div>
      <div>
        <div className="flex items-center gap-2.5 [&:hover]:bg-bg-tertiary p-2.5 rounded-sm">
          <div>
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3>Abdul Razeeth</h3>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        {optionsList.map((option, index) => (
          <Options option={option} key={index} />
        ))}
        <Button
          variant="outline"
          className="w-full p-5 mt-10 font-medium! text-red-700 border-2 border-red-900! [&:hover]:text-red-900 [&:hover]:border-red-900! [&:hover]:bg-red-900! hover:text-white! cursor-pointer"
        >
          <LogOut />
          Log out
        </Button>
      </div>
    </div>
  );
}

function Options({ option }) {
  return (
    <div className="flex items-center gap-5 [&:hover]:bg-bg-tertiary p-3 rounded-sm">
      <div>
        <option.icon />
      </div>
      <div>
        <h3 className="">{option.title}</h3>
        <p className="w-70 whitespace-nowrap text-ellipsis overflow-x-hidden text-sm">
          {option.text}
        </p>
      </div>
    </div>
  );
}
