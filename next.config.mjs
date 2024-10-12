/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["xxwenyeohnharceebyur.supabase.co"],
    // https://xxwenyeohnharceebyur.supabase.co/storage/v1/object/public/avatars/d42b6ffe-6036-4fcc-a696ect/public/avatars/d42b6ffe-6036-4fcc-a696-c8bdd6a3a989-0.4896839899108707.jpg
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xxwenyeohnharceebyur.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
