"use client";

import { Equal, Plus, Save } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { UserData, UserLink } from "@/lib/definitions";
import { useMemo } from "react";

// Define the schema for a single link item
const linkItemSchema = z.object({
  platform: z.enum(PLATFORM_LIST.map((p) => p.value) as [string, ...string[]]),
  url: z
    .string()
    .nonempty("URL is required")
    .url("Please enter a valid URL")
    .regex(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      "Please enter a valid URL",
    ),
});

// Update the formSchema to include custom validation
const formSchema = z.object({
  links: z
    .array(linkItemSchema)
    .min(1, "At least one link is required")
    .refine(
      (links) => {
        const platforms = links.map((link) => link.platform);
        return new Set(platforms).size === platforms.length;
      },
      {
        message: "Each platform can only be used once",
        path: ["links"], // This will make the error appear at the form level
      },
    ),
});

type FormValues = z.infer<typeof formSchema>;

export const LinksForm: React.FC<{ user: UserData; userLinks: UserLink[] }> = ({
  user,
  userLinks,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const defaultLinks =
    userLinks.length == 0
      ? [{ platform: PLATFORM.GITHUB, url: "https://github.com/username" }]
      : userLinks;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { links: defaultLinks },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  // Get the list of available platforms
  const availablePlatforms = useMemo(() => {
    const usedPlatforms = new Set(fields.map((field) => field.platform));
    return PLATFORM_LIST.filter((p) => !usedPlatforms.has(p.value));
  }, [fields]);

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("dl: form submit", data.links);

      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      // Delete existing links for the user
      const { error: deleteError } = await supabase
        .from("user_links")
        .delete()
        .eq("user_id", user.id);

      if (deleteError) throw deleteError;

      // Insert new links
      const { error: insertError } = await supabase.from("user_links").insert(
        data.links.map((link) => ({
          user_id: user.id,
          platform: link.platform,
          url: link.url,
        })),
      );

      if (insertError) throw insertError;

      toast({
        description: (
          <>
            <div className="flex items-center justify-center gap-2">
              <Save size={16} />
              <span>{`Your changes have been successfully saved!`}</span>
            </div>
          </>
        ),
        className: "bg-gray-700 text-white border-0 py-2",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <div className="px-6 pb-8 space-y-6">
          <Button
            type="button"
            variant="outline"
            className="w-full text-sm text-purple-500 gap-2"
            onClick={() =>
              append({
                platform: availablePlatforms[0]?.value || PLATFORM.GITHUB,
                url: "",
              })
            }
            disabled={availablePlatforms.length === 0}
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
              availablePlatforms={availablePlatforms}
            />
          ))}

          {form.formState.errors.links?.root && (
            <p className="text-sm text-red-500">
              {form.formState.errors.links.root.message}
            </p>
          )}
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
  availablePlatforms: { value: string; label: string }[];
}> = ({ index, remove, control, availablePlatforms }) => {
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
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger id={`${index}_p`}>
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PLATFORM_LIST.map((p) => (
                  <SelectItem
                    key={p.value}
                    value={p.value}
                    disabled={
                      !availablePlatforms.some((ap) => ap.value === p.value) &&
                      p.value !== field.value
                    }
                  >
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
