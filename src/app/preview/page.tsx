import { CardProfile } from "@/components/cards/CardProfile";
import { NavbarPreview } from "@/components/navbars/NavbarPreview";

export default function ProfilePage() {
  return (
    <>
      {/* bg */}
      <div className="absolute top-0 left-0 w-full h-[300px] rounded-b-[30px] bg-purple-500 z-[-1] " />

      {/* nav */}
      <NavbarPreview />

      {/* card */}
      <CardProfile className="w-[300px] mx-auto mt-20" />
    </>
  );
}
