import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { LOCAL_BASE_URL } from "../../App";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContent";
import { toast } from "sonner";

export function AllUsers() {
  const { userId, setConversationId, setAuthSection, setReceiverId } =
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

  const { data } = usersQuery;

  const createChatMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await axios.post(
        `${LOCAL_BASE_URL}/chat/createChat`,
        payload
      );
      return result.data;
    },

    onSuccess: (response) => {
      setConversationId(response?.conversationId);
      setAuthSection("chat-section");
    },

    onError: (err) => {
      toast.error(err.response.data.message || "Internal server error");
    },
  });

  function selectUserChatHandler(receiverId) {
    createChatMutation.mutate([userId, receiverId]);
    setReceiverId(receiverId);
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <h2 className="text-xl font-medium">All Users</h2>
      <div className="w-full relative">
        <Search className="size-5 absolute top-2.5 left-5" />
        <Input
          className="rounded-full pl-13 focus-visible:ring-0 h-10"
          placeholder="Search"
        />
      </div>
      <ScrollArea className="rounded-md h-[80vh]">
        <div className="flex flex-col gap-1 overflow-hidden">
          {data?.users.map((user, i) => (
            <AllUsersChat
              key={i}
              user={user}
              selectUserChatHandler={selectUserChatHandler}
            />
          ))}
        </div>
        {data?.users.length === 0 && (
          <div className="text-center">No Users Found</div>
        )}
      </ScrollArea>
    </div>
  );
}

function AllUsersChat({ user, selectUserChatHandler }) {
  const { avatarUrl, displayName, about } = user;
  return (
    <div
      role="button"
      className="flex items-start gap-2.5 [&:hover]:bg-bg-tertiary p-2.5 rounded-sm cursor-pointer"
      onClick={() => selectUserChatHandler(user._id)}
    >
      <div>
        <Avatar className="size-11 object-cover">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h3 className="">{displayName}</h3>
        <p className="w-70 whitespace-nowrap text-ellipsis overflow-x-hidden text-sm">
          {about}
        </p>
      </div>
    </div>
  );
}
