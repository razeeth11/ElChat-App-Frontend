import { useState } from "react";
import { AuthContext } from "./AuthContent";

export function AuthProvider({ children }) {
  const [authValue, setAuthValue] = useState("login-page");

  return (
    <AuthContext.Provider value={{ authValue, setAuthValue }}>
      {children}
    </AuthContext.Provider>
  );
}
