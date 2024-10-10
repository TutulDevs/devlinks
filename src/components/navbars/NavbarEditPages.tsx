"use client";

import { cn } from "@/lib/utils";
import { CircleUserRound, Eye, Home, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

export const NavbarEditPages = () => {
  const pathname = usePathname();

  return (
    <nav className="m-4 bg-white rounded-md">
      <header className="p-4 flex justify-between items-center gap-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "link",
            }),
            "flex items-center gap-2 font-bold",
          )}
        >
          <span className="bg-purple-500 text-white p-0.5 rounded-md">
            <Home size={16} />
          </span>
          <span className="hidden sm:block">devlinks</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/links"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "/links" === pathname ? "secondary" : "ghost",
              }),
              "flex items-center gap-2 font-medium",
            )}
          >
            <LinkIcon size={16} />
            <span className="hidden sm:block">Links</span>
          </Link>

          <Link
            href="/profile"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "/profile" === pathname ? "secondary" : "ghost",
              }),
              "flex items-center gap-2 font-medium",
            )}
          >
            <CircleUserRound size={16} />
            <span className="hidden sm:block">Profile Details</span>
          </Link>
        </div>

        <Link
          href="/preview"
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "outline",
            }),
            "flex items-center gap-2 text-purple-500 font-medium",
          )}
        >
          <Eye size={16} />
          <span className="hidden sm:block">Preview</span>
        </Link>
      </header>
    </nav>
  );
};
