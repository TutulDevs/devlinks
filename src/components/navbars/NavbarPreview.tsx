import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";

export const NavbarPreview = () => {
  return (
    <nav className="m-4 bg-white rounded-md">
      <header className="p-4 flex justify-between items-center gap-4">
        <Link
          href="/links"
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "outline",
            }),
            "flex items-center gap-2 font-medium text-purple-500",
          )}
        >
          Back to Editor
        </Link>

        <Button size="sm">Share Link</Button>
      </header>
    </nav>
  );
};
