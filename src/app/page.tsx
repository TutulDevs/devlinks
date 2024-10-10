// font-[family-name:var(--font-geist-sans)]

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/links");

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, hic?
    </div>
  );
}
