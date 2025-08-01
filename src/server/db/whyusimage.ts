import { cache } from "./cache";
import { db } from "./prisma";

export const getWhyUsBysectionId = cache(
  async ({ sectionId }: { locale: "en" | "ar"; sectionId: string }) => {
    const whyus = await db.whyusSection.findMany({
      where: { sectionId },
      include: {
        points: true,
        WhyusImage: true,
      }
    });

    return whyus;
  },
  ({ locale }) => [`whyus-${locale}`],
  { revalidate: 3600 }
);

export const getWhyUsImage = cache(
  async ({ sectionId }: { locale: "en" | "ar"; sectionId: string }) => {
    const whyus = await db.whyusImage.findMany({
      where: { whyusSectionId: sectionId },
    });

    return whyus;
  },
  ({ locale }) => [`whyus-${locale}`],
  { revalidate: 3600 }
);
