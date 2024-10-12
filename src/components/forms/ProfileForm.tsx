"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import ImageNext from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CardNeutral } from "../cards/CardNeutral";
import { UserData } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/client";

// Custom file validation function
const validateImageFile = (file: File) => {
  return new Promise<boolean>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const valid =
          img.width <= 1024 &&
          img.height <= 1024 &&
          ["image/png", "image/jpeg", "image/bmp"].includes(file.type);
        resolve(valid);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// Updated schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size should be less than 5MB",
    )
    .refine(
      (file) => ["image/png", "image/jpeg", "image/bmp"].includes(file.type),
      "Only PNG, JPG, or BMP files are allowed",
    )
    .refine(validateImageFile, "Image dimensions should not exceed 1024x1024px")
    .optional(),
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

export const ProfileForm: React.FC<{ user: UserData }> = ({ user }) => {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // avatar is not included in defaultValues as it's a File object
    },
  });

  const avatar = useWatch({ control: form.control, name: "avatar" });

  const onSubmit = async (data: FormValues) => {
    try {
      const updates = {
        id: user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;

      if (data.avatar instanceof File) {
        const fileExt = data.avatar.name.split(".").pop();
        const filePath = `${user.id}-${Math.random()}.${fileExt}`;

        let { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, data.avatar);

        if (uploadError) throw uploadError;

        let { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar_url: filePath })
          .eq("id", user.id);

        if (updateError) throw updateError;
      }

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
          {/* picture */}
          <CardNeutral>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="space-y-0 grid items-center gap-x-2 grid-rows-[auto_1fr_auto] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_125px_1fr]">
                  <FormLabel className="mb-2 md:mb-0">Avatar</FormLabel>
                  <FormControl>
                    <FormLabel
                      htmlFor="avatar"
                      className="relative w-[125px] h-[125px] rounded-md overflow-hidden group"
                    >
                      <ImageNext
                        // src="/avatar.jpg"
                        src={
                          avatar instanceof File
                            ? URL.createObjectURL(avatar)
                            : ""
                        }
                        alt=""
                        fill
                        className="bg-indigo-300 rounded-md object-cover"
                      />

                      <Input
                        type="file"
                        id="avatar"
                        accept="image/png,image/jpeg,image/bmp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) field.onChange(file);
                        }}
                        className="hidden"
                      />

                      <span
                        className="absolute inset-0 w-full h-full p-1 bg-gray-900/50 z-10 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-2 text-white text-sm font-medium "
                        role="button"
                      >
                        <ImageIcon size={16} />
                        <span>Change Image</span>
                      </span>
                    </FormLabel>
                  </FormControl>

                  <div className="md:px-2 py-2 text-sm text-gray-400">
                    Image must be below 1024x1024px.
                    <br />
                    Use PNG, JPG, or BMP format.
                  </div>

                  <div className="hidden md:block" />
                  <FormMessage className="!mt-0.5 md:col-span-2" />
                </FormItem>
              )}
            />
          </CardNeutral>

          {/* others */}
          <CardNeutral>
            {/* f name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-0 grid items-center gap-x-2 grid-rows-[auto_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_1fr]">
                  <FormLabel htmlFor="firstName" className="mb-2 md:mb-0">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      {...field}
                    />
                  </FormControl>
                  <div className="hidden sm:block" />
                  <FormMessage className="!mt-0.5" />
                </FormItem>
              )}
            />

            {/* l name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-0 grid items-center gap-x-2 grid-rows-[auto_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_1fr]">
                  <FormLabel htmlFor="lastName" className="mb-2 md:mb-0">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      {...field}
                    />
                  </FormControl>
                  <div className="hidden sm:block" />
                  <FormMessage className="!mt-0.5" />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0 grid items-center gap-x-2 grid-rows-[auto_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[140px_1fr]">
                  <FormLabel htmlFor="email" className="mb-2 md:mb-0">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <div className="hidden sm:block" />
                  <FormMessage className="!mt-0.5" />
                </FormItem>
              )}
            />
          </CardNeutral>
        </div>

        <div className="px-6 py-4 border-t-2 border-t-neutral-100 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

// try {
//   console.log("dl: form submit", data);
//   toast({
//     description: (
//       <>
//         <div className="flex items-center justify-center gap-2">
//           <Save size={16} />
//           <span>{`Your changes have been successfully saved!`}</span>
//         </div>
//       </>
//     ),
//     className: "bg-gray-700 text-white border-0 py-2",
//   });
//   router.refresh();
// } catch (error) {
//   toast({
//     variant: "destructive",
//     title: "Uh oh! Something went wrong.",
//     description: "There was a problem with your request.",
//   });
// }
