import { useState } from "react";
import { AuthContext } from "./AuthContent";

export function AuthProvider({ children }) {
  const [authValue, setAuthValue] = useState("chat-page");

  return (
    <AuthContext.Provider value={{ authValue, setAuthValue }}>
      {children}
    </AuthContext.Provider>
  );
}
