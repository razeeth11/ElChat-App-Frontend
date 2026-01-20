import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LOCAL_BASE_URL } from "../App";

export function useCurrentUser() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      if (!token) return null;

      const res = await axios.get(`${LOCAL_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.userDetails;
    },
    enabled: !!userId,
  });
}
