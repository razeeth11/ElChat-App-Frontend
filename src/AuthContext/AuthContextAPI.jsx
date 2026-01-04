import { useState } from "react";
import { AuthContext } from "./AuthContent";

export function AuthProvider({ children }) {
  let authPageValue = localStorage.getItem("authPage");
  const [authPage, setAuthPage] = useState(authPageValue || "login-page");
  const [authSection, setAuthSection] = useState("chat-section");

  return (
    <AuthContext.Provider
      value={{ authPage, setAuthPage, authSection, setAuthSection }}
    >
      {children}
    </AuthContext.Provider>
  );
}
