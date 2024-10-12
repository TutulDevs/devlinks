import {
  PLATFORM,
  PLATFORM_COLORS,
  PLATFORM_LABELS,
} from "@/lib/coreconstants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { getUserData } from "@/app/actions";
import Image from "next/image";

const DUMMY_PLATFORMS = [PLATFORM.GITHUB, PLATFORM.YOUTUBE, PLATFORM.LINKEDIN];

export const CardProfile: React.FC<{ className?: string }> = async ({
  className,
}) => {
  const user = await getUserData();

  return (
    <div className={cn("bg-white rounded-md px-4 py-8 space-y-6", className)}>
      {/* info */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-purple-500">
          <Image
            src={user.avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-bold text-2xl">{`${user.firstName} ${user.lastName}`}</h3>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* links */}
      <div className="flex flex-col gap-3 max-w-52 mx-auto">
        {DUMMY_PLATFORMS.map((platform) => (
          <Link
            key={platform}
            href={"/"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: PLATFORM_COLORS[platform].bg,
              color: PLATFORM_COLORS[platform].text,
            }}
            className={cn(buttonVariants({}), "")}
          >
            <span>{PLATFORM_LABELS[platform]}</span>
            <ArrowRight size={14} className="ml-auto" />
          </Link>
        ))}
      </div>
    </div>
  );
};
