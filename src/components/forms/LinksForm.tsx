"use client";

import { Equal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { PLATFORM_LIST, PLATFORM } from "@/lib/coreconstants";
import { CardNeutral } from "../cards/CardNeutral";

// Define the schema for a single link item
const linkItemSchema = z.object({
  platform: z.enum(PLATFORM_LIST.map((p) => p.value) as [string, ...string[]]),
  url: z
    .string()
    .nonempty("URL is required")
    .url("Please enter a valid URL")
    .regex(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      "Please enter a valid URL"
    ),
});

// Define the schema for the entire form
const formSchema = z.object({
  links: z.array(linkItemSchema).min(1, "At least one link is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const LinksForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [
        { platform: PLATFORM.GITHUB, url: "https://github.com/username" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const onSubmit = (data: FormValues) => {
    console.log("dl: form submit", data.links);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <div className="px-6 pb-8 space-y-6">
          <Button
            type="button"
            variant="outline"
            className="w-full text-sm text-purple-500 gap-2"
            onClick={() => append({ platform: PLATFORM.GITHUB, url: "" })}
          >
            <Plus size={16} />
            <span>Add new link</span>
          </Button>

          {fields.map((field, index) => (
            <LinkCard
              key={field.id}
              index={index}
              remove={remove}
              control={form.control}
            />
          ))}
        </div>

        <div className="px-6 py-4 border-t-2 border-t-neutral-100 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

const LinkCard: React.FC<{
  index: number;
  remove: (index: number) => void;
  control: Control<FormValues>;
}> = ({ index, remove, control }) => {
  return (
    <CardNeutral>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Equal
            size={16}
            role="button"
            className="hover:cursor-move hover:text-purple-500"
          />
          <span>Link #{index + 1}</span>
        </div>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8"
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      </div>

      <FormField
        control={control}
        name={`links.${index}.platform`}
        render={({ field }) => (
          <FormItem className="space-y-0.5">
            <FormLabel htmlFor={`${index}_p`}>Platform</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger id={`${index}_p`}>
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PLATFORM_LIST.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`links.${index}.url`}
        render={({ field }) => (
          <FormItem className="space-y-0.5">
            <FormLabel htmlFor={`${index}_u`}>Link</FormLabel>
            <FormControl>
              <Input
                type="url"
                id={`${index}_u`}
                placeholder="Enter link"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardNeutral>
  );
};
