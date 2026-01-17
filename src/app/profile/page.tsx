"use client";
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
import axios from "axios";
import { unstable_getStaticParams } from "next/dist/build/templates/pages";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get("/api/users/me");
      console.log(user);
    };

    getUser();
  }, []);

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout response", response);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (e: any) {
      toast.error("Logout failed");
      console.log("Logout failed", e.message);
    }
  };

  const onForgotPassword = async() => {
    try {
      const response = await axios.get("/api/users/forgotpasswordemail");
      console.log("forgot password", response);
      toast.success("Email sent successfully");
    } catch (e: any) {
      toast.error(e.message);
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row gap-4 items-center justify-center min-h-screen py-2">
      <Button type="submit" onClick={onForgotPassword}>
        Submit
      </Button>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default Profile;
