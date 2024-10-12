import { getUserData } from "@/app/actions";
import { ProfileForm } from "@/components/forms/ProfileForm";

export default async function ProfilePage() {
  const user = await getUserData();

  return (
    <>
      <div className="px-6 pt-8">
        <h2 className="text-2xl font-bold mb-2">Profile Details</h2>

        <p className="text-gray-500 text-sm">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <ProfileForm user={user} />
    </>
  );
}
