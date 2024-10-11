// font-[family-name:var(--font-geist-sans)]

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, hic?
    </div>
  );
}
