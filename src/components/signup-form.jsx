import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon, CircleUser } from "lucide-react";
import { useContext, useState } from "react";
import axios from "axios";
import { LOCAL_BASE_URL } from "../App";
import clsx from "clsx";
import { toast } from "sonner";
import { AuthContext } from "../AuthContext/AuthContent";
import { Spinner } from "./ui/spinner";

export function SignupForm({ userDetails, setUserDetails }) {
  const { setAuthPage } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [userError, setUserError] = useState(false);

  const saveUserMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await axios.post(
        `${LOCAL_BASE_URL}/user/createUser`,
        payload
      );
      return result.data;
    },

    onSuccess: (response) => {
      toast.success(response.message || "User saved successfully");
      setAuthPage("chat-page");
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("authPage", "chat-page");
      localStorage.setItem("token", response.token);
      localStorage.removeItem("authId");
    },

    onError: (err) => {
      toast.error(err.response.data.message || "Internal server error");
    },

    onSettled: () => {
      setLoader(false);
    },
  });

  function createUserHandler() {
    if (userDetails.displayName === "") {
      setUserError(true);
      return;
    }

    const formData = new FormData();

    const { displayName, about, phoneNumber, avatarFile } = userDetails;

    formData.append("displayName", displayName);
    formData.append("about", about);
    formData.append("phoneNumber", phoneNumber);
    formData.append("avatarUrl", avatarFile);
    formData.append("authId", localStorage.getItem("authId"));

    setLoader(true);
    saveUserMutation.mutate(formData);
  }

  return (
    <Card className="w-125 m-5 bg-[#2e2f2f]">
      <CardHeader className="text-center">
        <CardTitle>Create an account with ELChat</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            className="size-30 rounded-full m-auto my-5 relative"
          >
            <Avatar className="size-30 bg-[#2e2f2f]">
              <AvatarImage
                src={userDetails.avatarUrl}
                className="object-cover"
              />
              <AvatarFallback className="bg-[#2e2f2f] border border-white">
                <CircleUser size={30} />
              </AvatarFallback>
            </Avatar>
            <label className="border size-10 rounded-full m-auto absolute right-0 bottom-0 flex items-center justify-center cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (
                    file.type === "image/png" ||
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg"
                  ) {
                    setUserDetails((prev) => ({
                      ...prev,
                      avatarUrl: URL.createObjectURL(e.target.files[0]),
                      avatarFile: e.target.files[0],
                    }));
                    return;
                  }
                  file = "";
                  toast.warning("Allowed image format - 'jpg/png'!");
                }}
              />
              <CameraIcon />
            </label>
          </div>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className={clsx(userError && "border-red-500")}
              value={userDetails.displayName}
              onChange={(e) => {
                setUserDetails((prev) => ({
                  ...prev,
                  displayName: e.target.value,
                }));
                setUserError(false);
              }}
            />
            {userError && (
              <Label className="text-red-500 font-light">
                Name cannot be empty!
              </Label>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="about">About</FieldLabel>
            <Input
              id="about"
              type="text"
              placeholder="Hey I'm using ElChat"
              value={userDetails.about}
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, about: e.target.value }))
              }
            />
            <FieldDescription>
              We&apos;ll use this to contact you. We will not share your phone
              number with anyone else.
            </FieldDescription>
          </Field>
          <FieldGroup>
            <Button disabled={loader} onClick={createUserHandler}>
              Create Account
              {loader && <Spinner />}
            </Button>
          </FieldGroup>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
