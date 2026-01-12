import { SignupForm } from "@/components/signup-form";
import { useState } from "react";

export function SignupPage({ confirmationResult }) {
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    about: "I'm busy right now!",
    avatarUrl: "",
    avatarFile: "",
    phoneNumber: confirmationResult.phone,
  });

  return (
    <div className="flex items-center justify-center h-screen bg-[#161717] select-none">
      <SignupForm userDetails={userDetails} setUserDetails={setUserDetails} />
    </div>
  );
}
