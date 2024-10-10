"use client";

import { Apple, Equal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PLATFORM_LIST } from "@/lib/coreconstants";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

export const ProfileForm = () => {
  return (
    <>
      <form className="mt-8">
        <div className="px-6 pb-8 space-y-6">
          {/* picture */}
          <div className="p-3 space-y-3 bg-neutral-100 rounded-md">
            <div className="grid items-center gap-2 grid-rows-[auto_1fr_auto] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_125px_1fr]">
              <Label htmlFor="fname">First Name</Label>

              {/* uploader & preview */}
              <div className="relative w-[125px] h-[125px] rounded-md overflow-hidden group">
                <Image
                  src="/avatar.jpg"
                  alt=""
                  fill
                  className="bg-indigo-300 rounded-md object-cover"
                />

                <div
                  className="absolute inset-0 w-full h-full p-1 bg-gray-900/50 z-10 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-2 text-white text-sm font-medium "
                  onClick={() => alert("upload")}
                  role="button"
                >
                  <ImageIcon size={16} />
                  <span>Change Image</span>
                </div>
              </div>

              {/* info */}
              <div className="md:px-2 text-sm text-gray-400">
                Image must be below 1024x1024px.
                <br />
                Use PNG, JPG, or BMP format.
              </div>
            </div>
          </div>

          {/* others */}
          <div className="p-3 space-y-3 bg-neutral-100 rounded-md">
            <div className="grid items-center gap-2 grid-rows-[auto_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_1fr]">
              <Label htmlFor="fname">First Name</Label>

              <Input id="fname" placeholder="Enter first name" />
            </div>

            <div className="grid items-center gap-2 grid-rows-[auto_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_1fr]">
              <Label htmlFor="lname">Last Name</Label>

              <Input id="lname" placeholder="Enter last name" />
            </div>

            <div className="grid items-center gap-2 grid-rows-[auto_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_1fr]">
              <Label htmlFor="email">Email</Label>

              <Input type="email" id="email" placeholder="Enter email" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t-2 border-t-neutral-100 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
};
