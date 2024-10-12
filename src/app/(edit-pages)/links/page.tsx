import { LinksForm } from "@/components/forms/LinksForm";
import { createClient } from "@/lib/supabase/server";

export default async function LinksPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: notes } = await supabase.from("notes").select();

  console.log("dl: /link page user: ", user);
  console.log("dl: /link page notes: ", notes);

  return (
    <>
      <div className="px-6 pt-8">
        <h2 className="text-2xl font-bold mb-2">Customize your links</h2>

        <p className="text-gray-500 text-sm">
          Add/edit/remove links below and and then share your profile with the
          world!
        </p>
      </div>

      <LinksForm />
    </>
  );
}
