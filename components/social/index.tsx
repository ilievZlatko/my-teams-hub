'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

export const Social = ({ label }: { label?: string; }) => {
  const onClick = (provider: 'google') => {
    // TODO: Check 'default login redirect'
    // signIn(provider, {
    //   callbackUrl: DEFAULT_LOGIN_REDIRECT
    // });
  };

  return (
    <div className="flex items-center gap-x-2 w-full">
      <Button
        variant="outline"
        className="w-full gap-2 rounded-lg border-[#3C4B57]"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5" />
        {label && (<span className="text-[#3C4B57]">{label}</span>)}
      </Button>
    </div>
  );
};