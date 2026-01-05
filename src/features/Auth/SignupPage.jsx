import { SignupForm } from "@/components/signup-form";
import { useState } from "react";

export function SignupPage() {
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    about: "I'm busy right now!",
    profileImg: "",
  });

  return (
    <div className="flex items-center justify-center">
      <SignupForm userDetails={userDetails} setUserDetails={setUserDetails} />
    </div>
  );
}
