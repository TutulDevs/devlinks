import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { NavbarEditPages } from "@/components/navbars/NavbarEditPages";

export default function EditPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* header */}
      <NavbarEditPages />

      {/* main */}
      <main className="mx-4 mb-4 grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-4">
        <div className="bg-white rounded-md md:px-10 py-6 md:py-8 order-2 md:order-1">
          <PhoneMockup>
            Lorem ipsum dolor sit amet alsd aldsss, consectetur adipisicing
            elit. Fuga,
          </PhoneMockup>
        </div>

        <div className="bg-white rounded-md order-1 md:order-2">{children}</div>
      </main>
    </>
  );
}
