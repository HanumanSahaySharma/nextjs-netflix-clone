"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import GoogleIcon from "../../../public/google-icon.svg";

import { signIn } from 'next-auth/react';

const GoogleSignInButton = () => {
    return (
        <Button onClick={() => signIn('google')} variant={"outline"} size={"icon"}>
        <Image src={GoogleIcon} className="w-6 h-6" alt="Google icon" />
      </Button>
    )
}

export default GoogleSignInButton;