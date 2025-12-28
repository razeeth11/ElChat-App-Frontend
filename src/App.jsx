import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext/AuthContent";
import { LoginPage } from "./features/Auth/LoginPage";
import { OTPVerificationPage } from "./features/Auth/OtpVerificationPage";
import { ChatPage } from "./layout/ChatPage";

export const LOCAL_BASE_URL = import.meta.env.VITE_BASE_LOCAL_URL;
export const VERCEL_BASE_URL = import.meta.env.VITE_BASE_VERCEL_URL;

function App() {
  const { authValue } = useContext(AuthContext);
  return (
    <>
      {authValue === "login-page" && <LoginPage />}
      {authValue === "verify-otp" && <OTPVerificationPage />}
      {authValue === "chat-page" && <ChatPage />}
    </>
  );
}

export default App;
