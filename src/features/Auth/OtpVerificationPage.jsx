import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContent";

export function OTPVerificationPage() {
  const { setAuthValue } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center gap-10 text-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-4xl">Check your mobile</h2>
        <p className="text-lg">
          Please enter the six digit verification code sent
        </p>
        <p>+91 6383884482</p>
      </div>
      <div>
        <InputOTPDemo />
      </div>
      <div className="flex flex-col gap-2.5">
        <Button className="cursor-pointer rounded-full">Confirm</Button>
        <p className="mt-5">Didn't receive the code?</p>
        <Button
          variant="ghost"
          className="cursor-pointer rounded-full"
          onClick={() => setAuthValue("login-page")}
        >
          <MoveLeft /> Back
        </Button>
      </div>
    </div>
  );
}

export function InputOTPDemo() {
  const styles = "size-13 text-xl!";

  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} className={styles} />
        <InputOTPSlot index={1} className={styles} />
        <InputOTPSlot index={2} className={styles} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} className={styles} />
        <InputOTPSlot index={4} className={styles} />
        <InputOTPSlot index={5} className={styles} />
      </InputOTPGroup>
    </InputOTP>
  );
}
