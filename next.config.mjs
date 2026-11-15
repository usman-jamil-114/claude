/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes a ready-to-upload website into the `out/` folder.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
