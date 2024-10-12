import { signInAction, signUpAction } from "@/app/actions";
import { Message, FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className="flex-1 flex flex-col w-full sm:w-80 mx-auto bg-white rounded-md p-4">
      <h1 className="text-2xl font-medium">Authenticate</h1>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          {/* <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link> */}
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />

        <div className="grid grid-cols-2 gap-6">
          <SubmitButton
            // pendingText="Signing In..."
            formAction={signInAction}
          >
            Sign in
          </SubmitButton>

          <SubmitButton
            // pendingText="Signing up..."
            formAction={signUpAction}
          >
            Sign up
          </SubmitButton>
        </div>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
