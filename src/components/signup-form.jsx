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
import { useState } from "react";
import axios from "axios";
import { LOCAL_BASE_URL } from "../App";
import clsx from "clsx";

export function SignupForm({ userDetails, setUserDetails }) {
  const [hoverState, setHoverState] = useState(false);
  const [userError, setUserError] = useState(false);

  const saveuserMutation = useMutation({
    mutationFn: async () => {
      const result = await axios.post(`${LOCAL_BASE_URL}/saveUser`, payload);
      return result.data;
    },
  });

  function createUserHandler() {
    if (userDetails.displayName === "") {
      setUserError(true);
      return;
    }

    console.log(userDetails);
  }

  return (
    <Card className="bg-bg-secondary w-[30%] mt-[10%]">
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
            <Avatar className="size-30">
              <AvatarImage src={userDetails.profileImg} />
              {!hoverState && (
                <AvatarFallback>
                  <CircleUser size={30} />
                </AvatarFallback>
              )}
            </Avatar>
            {hoverState && (
              <label className="border size-30 rounded-full m-auto absolute top-0 flex items-center justify-center cursor-pointer">
                <input type="file" className="hidden" />
                <CameraIcon />
              </label>
            )}
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
            <Button onClick={createUserHandler}>Create Account</Button>
          </FieldGroup>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
