import { LinksForm } from "@/components/forms/LinksForm";
import { createClient_server } from "@/lib/supabase/server";

export default async function LinksPage() {
  const supabase = createClient_server();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("dl: /link page user: ", user);

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
