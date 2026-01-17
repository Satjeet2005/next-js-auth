"use client";
import Link from "next/link";
import React, { useState } from "react";
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
import toast from "react-hot-toast";

const Login = () => {
    const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      router.push("/profile")
      toast.success("Login sucessful");
    } catch (e: any) {
      console.log("Login failed", e);
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <FieldSet>
            <FieldLegend>Login</FieldLegend>
            <FieldDescription>
              Enter the details and click on login button.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  autoComplete="off"
                  placeholder="email"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  autoComplete="off"
                  placeholder="password"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </Field>
            </FieldGroup>
            <Button type="submit" onClick={onLogin}>
              Login
            </Button>
          </FieldSet>
          <Link href={"/signup"}>
            <p
              className={[
                cn(
                  "mb-3 font-medium",
                  "data-[variant=legend]:text-base",
                  "data-[variant=label]:text-sm"
                ),
                "mt-2",
              ].join(" ")}
            >
              SignUp
            </p>
          </Link>
        </>
      )}
    </div>
  );
};

export default Login;
