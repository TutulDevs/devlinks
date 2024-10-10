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

export const LinksForm = () => {
  return (
    <>
      <form className="mt-8">
        <div className="px-6 pb-8 space-y-6">
          <Button
            type="button"
            variant={"outline"}
            className="w-full text-sm text-purple-500 gap-2"
          >
            <Plus size={16} />
            <span className="">Add new link</span>
          </Button>

          <LinkCard />
          <LinkCard />
        </div>

        <div className="px-6 py-4 border-t-2 border-t-neutral-100 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
};

const LinkCard = () => {
  return (
    <div className="p-3 space-y-3 bg-neutral-100 rounded-md">
      {/* top */}
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-1">
          <Equal size={16} />
          <span>Link #1</span>
        </div>

        <Button type="button" variant={"ghost"}>
          Remove
        </Button>
      </div>

      {/* select */}
      <div className="space-y-0.5">
        <Label htmlFor="1_p">Platform</Label>

        <Select>
          <SelectTrigger id="1_p">
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORM_LIST.map((p) => (
              <SelectItem value={p.value.toString()}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* link */}
      <div className="space-y-0.5">
        <Label htmlFor="1_u">Link</Label>

        <Input type="url" id="1_u" placeholder="Enter link" />
      </div>
    </div>
  );
};
