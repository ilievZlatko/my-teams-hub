'use client';

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  questionLabel: string;
  actionLabel?: string;
  href: string;
}

export const BackButton = ({ questionLabel, actionLabel, href }: BackButtonProps) => {
  return (
    <div>
      <Button
        asChild
        variant="link"
        size="sm"
        className="font-normal w-full"
      >
        <Link href={href} className="text-[#3C4B57] gap-1 text-xs">
          {questionLabel}
          {actionLabel && (<span className="font-semibold">{actionLabel}</span>)}
        </Link>
      </Button>
    </div>
  );
};