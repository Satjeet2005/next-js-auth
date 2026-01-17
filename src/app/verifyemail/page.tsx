"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const verifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.toString();
  console.log(searchParams.get("token"));
  useEffect(() => {
    const verify = async () => {
      if(!token || token?.length < 0){
        toast.error("No token found",{duration:3000})
        return
      }
      try {
        const response = await axios.post("/api/users/verifyemail", {token});
        console.log(response);
        if (response.data.status === 200) {
          toast.success("Email is verified");
        }
      } catch (e: any) {
        console.log(e);
        toast.error(e.message);
      }
    };

    verify();
  }, []);
  return <div>verifyEmail</div>;
};

export default verifyEmail;
