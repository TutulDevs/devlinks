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
import { PLATFORM_LIST, PLATFORM } from "@/lib/coreconstants";
import { CardNeutral } from "../cards/CardNeutral";
import { useRef, useState } from "react";

type FORM_ITEM = { id: number; platform: PLATFORM; url: string };

const dummyData: FORM_ITEM[] = [
  {
    id: 0,
    platform: PLATFORM.GITHUB,
    url: "https://github.com/username",
  },
];

export const LinksForm = () => {
  const [list, setList] = useState<FORM_ITEM[]>(dummyData);

  const handleAdd = () => {
    setList((prev) => [
      ...prev,
      { id: prev.length, platform: PLATFORM.GITHUB, url: "" },
    ]);
  };

  const handleRemove = (id: number) => {
    setList((prev) =>
      prev
        .filter((x) => x.id !== id)
        .map((item, index) => ({ ...item, id: index })),
    );
  };

  return (
    <>
      <form className="mt-8">
        <div className="px-6 pb-8 space-y-6">
          {/* add item */}
          <Button
            type="button"
            variant={"outline"}
            className="w-full text-sm text-purple-500 gap-2"
            onClick={handleAdd}
          >
            <Plus size={16} />
            <span className="">Add new link</span>
          </Button>

          {/* items */}
          {list.map((x) => (
            <LinkCard key={x.id} item={x} handleRemove={handleRemove} />
          ))}
        </div>

        <div className="px-6 py-4 border-t-2 border-t-neutral-100 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
};

const LinkCard: React.FC<{
  item: FORM_ITEM;
  handleRemove: (id: number) => void;
}> = ({ item, handleRemove }) => {
  return (
    <CardNeutral>
      {/* top */}
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-1">
          <Equal
            size={16}
            role="button"
            className="hover:cursor-move hover:text-purple-500"
          />
          <span>Link #{item.id + 1} </span>
        </div>

        <Button
          type="button"
          size={"sm"}
          variant={"ghost"}
          className="h-8"
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </Button>
      </div>

      {/* select */}
      <div className="space-y-0.5">
        <Label htmlFor="1_p">Platform</Label>

        <Select defaultValue={item.platform}>
          <SelectTrigger id="1_p">
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORM_LIST.map((p) => (
              <SelectItem value={p.value}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* link */}
      <div className="space-y-0.5">
        <Label htmlFor="1_u">Link</Label>

        <Input type="url" id="1_u" placeholder="Enter link" value={item.url} />
      </div>
    </CardNeutral>
  );
};
