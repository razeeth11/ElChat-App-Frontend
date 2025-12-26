import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext/AuthContent";
import { LoginPage } from "./features/Auth/LoginPage";
import { OTPVerificationPage } from "./features/Auth/OtpVerificationPage";
import { ChatPage } from "./layout/ChatPage";

function App() {
  const { authValue } = useContext(AuthContext);
  return (
    <>
      {authValue === "login-page" && <LoginPage />}
      {authValue === "otp-verify" && <OTPVerificationPage />}
      {authValue === "chat-page" && <ChatPage />}
    </>
  );
}

export default App;
