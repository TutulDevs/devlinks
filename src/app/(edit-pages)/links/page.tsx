import { LinksForm } from "@/components/forms/LinksForm";

export default function LinksPage() {
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
