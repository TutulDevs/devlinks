import { getUserData, getUserLinks } from "@/app/actions";
import { LinksForm } from "@/components/forms/LinksForm";

export default async function LinksPage() {
  const user = await getUserData();
  const userLinks = await getUserLinks(user.id);

  return (
    <>
      <div className="px-6 pt-8">
        <h2 className="text-2xl font-bold mb-2">Customize your links</h2>

        <p className="text-gray-500 text-sm">
          Add/edit/remove links below and and then share your profile with the
          world!
        </p>
      </div>

      <LinksForm user={user} userLinks={userLinks} />
    </>
  );
}
