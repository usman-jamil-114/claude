import type { MetadataRoute } from "next";
import { SITE } from "@/site/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services/", "/about/", "/contact/", "/privacy/"].map((path) => ({
    url: new URL(path, SITE.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
