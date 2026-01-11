import { useState } from "react";
import { AuthContext } from "./AuthContent";

export function AuthProvider({ children }) {
  let authPageValue = localStorage.getItem("authPage");
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
