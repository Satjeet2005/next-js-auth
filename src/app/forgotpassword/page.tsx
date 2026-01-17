"use client"
import { Button } from "@/components/ui/button";
import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const token = useSearchParams().get('token');
  console.log(token);

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post("/api/users/forgotpassword",{
        token,
        password,
        confirmPassword
      });
      console.log(response);
      if (response.data.status === 200) {
        toast.success("Password changed successfully");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (
      password &&
      password.length > 0 &&
      confirmPassword &&
      confirmPassword.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  return (
    isLoading ? <Spinner scale={4}/> : <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <FieldSet>
        <FieldLegend>Forgot Password</FieldLegend>
        <FieldDescription>
          Enter the details and click on submit to change the password.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Password</FieldLabel>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="username"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              placeholder="email"
            />
          </Field>
        </FieldGroup>
        <Button type="submit" disabled={isButtonDisabled} onClick={onSubmit}>
          Submit
        </Button>
      </FieldSet>
    </div>
  );
};

export default ForgotPassword;
