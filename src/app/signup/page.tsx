"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setIsButtonDisabled(false);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      // API route lives under /api/users/signup
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      router.push("/login");
      toast.success("Signup successfully");
    } catch (e: any) {
      console.log("Signup failed", e);
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {isLoading ? (
          <Spinner className="size-6" />
        ) : (
          <div>
            <FieldSet>
              <FieldLegend>Signup</FieldLegend>
              <FieldDescription>
                Enter the details and click on signup button.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, username: e.target.value }))
                    }
                    autoComplete="off"
                    placeholder="username"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    autoComplete="off"
                    placeholder="email"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    autoComplete="off"
                    placeholder="password"
                  />
                </Field>
              </FieldGroup>
              <Button
                type="submit"
                disabled={isButtonDisabled}
                onClick={onSignup}
              >
                Signup
              </Button>
            </FieldSet>
            <Link href={"/login"}>
              <p
                className={[
                  cn(
                    "mb-3 font-medium",
                    "data-[variant=legend]:text-base",
                    "data-[variant=label]:text-sm"
                  ),
                  "mt-2 text-center",
                ].join(" ")}
              >
                Login
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
