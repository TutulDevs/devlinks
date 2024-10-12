import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="m-4 bg-white rounded-md">
        <header className="p-4 flex justify-between items-center gap-4">
          <Link
            href="/"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "link",
              }),
              "flex items-center gap-2 font-bold",
            )}
          >
            <span className="bg-purple-500 text-white p-0.5 rounded-md">
              <Home size={16} />
            </span>
            <span>devlinks</span>
          </Link>
        </header>
      </nav>

      <main className="mx-4 mt-8 flex flex-col gap-12 items-center justify-center">
        {children}
      </main>
    </>
  );
}
