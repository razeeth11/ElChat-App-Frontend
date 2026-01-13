import { useState } from "react";
import { AuthContext } from "./AuthContent";

export function AuthProvider({ children }) {
  let authPageValue = localStorage.getItem("authPage");
  const [userId, setUserId] = useState("");
  const [authPage, setAuthPage] = useState(authPageValue || "login-page");
  const [authSection, setAuthSection] = useState("chat-section");
  const [conversationId, setConversationId] = useState("");
  const [receiverId, setReceiverId] = useState("");

  return (
    <AuthContext.Provider
      value={{
        authPage,
        setAuthPage,
        authSection,
        setAuthSection,
        userId,
        setUserId,
        conversationId,
        setConversationId,
        receiverId,
        setReceiverId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
