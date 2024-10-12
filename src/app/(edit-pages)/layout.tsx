import { CardProfile } from "@/components/cards/CardProfile";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { NavbarEditPages } from "@/components/navbars/NavbarEditPages";
import { Suspense } from "react";

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
      <main className="mx-4 mb-4 grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start gap-4">
        <div className="bg-white rounded-md lg:px-10 py-6 lg:py-8 order-2 lg:order-1">
          <PhoneMockup>
            <Suspense fallback={<div>Loading...</div>}>
              <CardProfile className="py-4" />
            </Suspense>
          </PhoneMockup>
        </div>

        <div className="bg-white rounded-md order-1 lg:order-2">{children}</div>
      </main>
    </>
  );
}
