import { useContext, useState } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext/AuthContent";
import { LoginPage } from "./features/Auth/LoginPage";
import { OTPVerificationPage } from "./features/Auth/OtpVerificationPage";
import { ChatPage } from "./layout/ChatPage";

export const LOCAL_BASE_URL = import.meta.env.VITE_BASE_LOCAL_URL;
export const VERCEL_BASE_URL = import.meta.env.VITE_BASE_VERCEL_URL;

function App() {
  const { authPage } = useContext(AuthContext);
  const [confirmationResult, setConfirmationResult] = useState(null);
  return (
    <>
      {authPage === "login-page" && (
        <LoginPage setConfirmationResult={setConfirmationResult} />
      )}
      {authPage === "verify-otp" && (
        <OTPVerificationPage confirmationResult={confirmationResult} />
      )}
      {authPage === "chat-page" && <ChatPage />}
    </>
  );
}

export default App;
