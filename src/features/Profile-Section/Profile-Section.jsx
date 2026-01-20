import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, Pencil } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContent";

export function ProfileSection() {
  const { userData } = useContext(AuthContext);

  const settingsList = [
    {
      name: "Name",
      value: userData?.displayName || "",
      icon: <Pencil />,
    },
    {
      name: "About",
      value: userData?.about || "",
      icon: <Pencil />,
    },
    {
      name: "Phone",
      value: userData?.phoneNumber || "",
      icon: <Copy />,
    },
  ];

  return (
    <div className="px-5 py-2.5">
      <div className="flex flex-col items-center gap-5">
        <p className="text-xl">Profile</p>
        <Avatar className="size-30">
          <AvatarImage src={userData?.avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-7 mt-10">
        {settingsList.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-2.5">
            <p className="text-sm text-gray-400">{item.name}</p>
            <div className="flex items-center justify-between w-full">
              <p>{item.value}</p>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                {item.icon}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
