import { useState } from "react";
import { AuthContext } from "./AuthContent";

export function AuthProvider({ children }) {
  const [authPage, setAuthPage] = useState("login-page");
  const [authSection, setAuthSection] = useState("chat-section");

  return (
    <AuthContext.Provider
      value={{ authPage, setAuthPage, authSection, setAuthSection }}
    >
      {children}
    </AuthContext.Provider>
  );
}
