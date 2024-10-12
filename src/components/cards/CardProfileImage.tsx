"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CardProfileImage: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <div
      className={cn(
        "relative w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-purple-500",
        error && "border-gray-100 bg-gray-100"
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", error && "invisible")}
        onError={(e) => setError(true)}
      />
    </div>
  );
};
