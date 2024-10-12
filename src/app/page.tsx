// font-[family-name:var(--font-geist-sans)]

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <div className="flex items-center justify-between gap-4 m-4 p-4 bg-white rounded-md">
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"link"}>
          <Link href="/links">Links</Link>
        </Button>
        <Button asChild size="sm" variant={"link"}>
          <Link href="/profile">Profile</Link>
        </Button>

        <Button asChild size="sm" variant={"link"}>
          <Link href="/preview">Preview</Link>
        </Button>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          Hey, {user.email}!
          <form action={signOutAction}>
            <Button type="submit">Sign out</Button>
          </form>
        </div>
      ) : (
        <Button asChild size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
