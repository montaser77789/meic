import { cache } from "./cache";
import { db } from "./prisma";

export const getPoints = cache(
  async ({
    role,
    locale,
    whyudid,
  }: {
    role: "admin" | "user";
    locale: "en" | "ar";
    whyudid: string;
  }) => {
    const points = await db.whyusPoint.findMany({
      where: { sectionId: whyudid },
    });
    if (role === "admin") {
      return points;
    } else {
      return points.map((point) => ({
        id: point.id,
        title: locale === "en" ? point.title_en : point.title_ar,
        description: locale === "en" ? point.desc_en : point.desc_ar,
      }));
    }
  },

  ({ role, locale }) => [`points-${role}-${locale}`],
  { revalidate: 3600 }
);
