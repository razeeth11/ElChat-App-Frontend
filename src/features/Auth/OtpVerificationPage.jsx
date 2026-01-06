import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContent";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LOCAL_BASE_URL } from "../../App";
import { Spinner } from "../../components/ui/spinner";

export function OTPVerificationPage({ confirmationResult }) {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const { setAuthPage } = useContext(AuthContext);

  const verifyOtpMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await axios.post(
        `${LOCAL_BASE_URL}/auth/verify-otp`,
        payload
      );
      return result.data;
    },

    onSuccess: (response) => {
      const { message } = response;
      toast.success(`${message}`);
      if (response.newUser) {
        setAuthPage("signup-page");
        localStorage.setItem("authPage", "login-page");
      } else {
        setAuthPage("chat-page");
        localStorage.setItem("authPage", "chat-page");
      }
    },

    onError: (err) => {
      toast.error(`${err.response.data.message}`);
    },

    onSettled: () => {
      setLoader(false);
    },
  });

  function verifyOtpHandler() {
    if (inputValue.length < 3) {
      toast.warning("Enter the valid otp!");
      return;
    }

    const payload = {
      authId: localStorage.getItem("authId"),
      phoneNumber: confirmationResult.phone,
      otp: inputValue,
    };
    setLoader(true);

    setTimeout(() => {
      verifyOtpMutation.mutate(payload);
    }, 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 text-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-4xl">Check your mobile</h2>
        <p className="text-lg">
          Please enter the six digit verification code sent
        </p>
        <p>{confirmationResult.phone || ""}</p>
        <span className="opacity-50">OTP : {confirmationResult.OTP}</span>
      </div>
      <div>
        <InputOTPDemo
          setInputValue={setInputValue}
          verifyOtpHandler={verifyOtpHandler}
          loader={loader}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <Button
          className="cursor-pointer rounded-full"
          disabled={loader}
          onClick={verifyOtpHandler}
        >
          Confirm
          {loader && <Spinner />}
        </Button>
        <p className="mt-5">Didn't receive the code?</p>
        <Button
          variant="ghost"
          className="cursor-pointer rounded-full"
          onClick={() => {
            setAuthPage("login-page");
            localStorage.setItem("authPage", "login-page");
          }}
        >
          <MoveLeft /> Back
        </Button>
      </div>
    </div>
  );
}

export function InputOTPDemo({ setInputValue, verifyOtpHandler, loader }) {
  const styles = "size-13 text-xl!";

  return (
    <InputOTP
      disabled={loader}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      onChange={(value) => setInputValue(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          verifyOtpHandler();
        }
      }}
    >
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
