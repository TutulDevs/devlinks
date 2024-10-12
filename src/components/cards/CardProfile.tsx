import {
  MAX_LINKS_FALLBACK,
  PLATFORM_COLORS,
  PLATFORM_LABELS,
} from "@/lib/coreconstants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { getUserData, getUserLinks } from "@/app/actions";
import { CardProfileImage } from "./CardProfileImage";

export const CardProfile: React.FC<{ className?: string }> = async ({
  className,
}) => {
  const user = await getUserData();
  const userLinks = await getUserLinks(user.id);

  const linksToShow = MAX_LINKS_FALLBACK - userLinks.length;

  return (
    <div className={cn("bg-white rounded-md px-4 py-8 space-y-6", className)}>
      {/* info */}
      <div className="flex flex-col items-center justify-center gap-4">
        <CardProfileImage
          src={user.avatarUrl}
          alt={`${user.firstName} ${user.lastName}`}
        />

        <h3
          className={cn("font-bold text-2xl", {
            ["bg-gray-100 py-4 w-3/4 rounded-md"]:
              !user.firstName && !user.lastName,
          })}
        >{`${user.firstName} ${user.lastName}`}</h3>
        <p
          className={cn("text-sm text-gray-500", {
            ["bg-gray-100 py-3 w-1/2 rounded-md"]: !user.email,
          })}
        >
          {user?.email}
        </p>
      </div>

      {/* links */}
      <div className="flex flex-col gap-3 max-w-52 mx-auto">
        {userLinks.map((x) => (
          <Link
            key={x.url}
            href={x.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: PLATFORM_COLORS[x.platform].bg,
              color: PLATFORM_COLORS[x.platform].text,
            }}
            className={cn(buttonVariants({}), "")}
          >
            <span>{PLATFORM_LABELS[x.platform]}</span>
            <ArrowRight size={14} className="ml-auto" />
          </Link>
        ))}

        {Array.from({ length: linksToShow }).map((_, index) => (
          <div key={index} className="w-full h-10 bg-gray-100 rounded-md" />
        ))}
      </div>
    </div>
  );
};
