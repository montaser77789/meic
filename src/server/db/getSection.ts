import { cache } from "./cache";
import { db } from "./prisma";

export const getSection = cache(
  async ({ role, locale }: { role: "admin" | "user"; locale: "en" | "ar" }) => {
    const sections = await db.section.findMany({
      include: {
        galleryImages: true,
      },
    });
    if (role === "admin") {
      return sections;
    } else {
      return sections.map((section) => ({
        id: section.id,
        title: locale === "en" ? section.title_en : section.title_ar,
        description:
          locale === "en" ? section.description_en : section.description_ar,
        image: section.image,
        features: locale === "en" ? section.features_en : section.features_ar,
        slug: section.slug,
        galleryImages: section.galleryImages,
      }));
    }
  },
  ({ role, locale }) => [`section-${role}-${locale}`],
  { revalidate: 3600 }
);

export const getSectionBySlug = cache(
  async ({
    role,
    locale,
    id,
  }: {
    role: "admin" | "user";
    locale: "en" | "ar";
    id: string;
  }) => {
    const sections = await db.section.findUnique({
      where: { id: id },
      include: {
        Services: true,
        galleryImages: true,
      },
    });
    if (role === "admin") {
      return sections;
    } else {
      if (sections) {
        return {
          id: sections.id,
          title: locale === "en" ? sections.title_en : sections.title_ar,
          description:
            locale === "en" ? sections.description_en : sections.description_ar,
          image: sections.image,
          features:
            locale === "en" ? sections.features_en : sections.features_ar,
          slug: sections.slug,
        };
      }
    }
  },
  ({ id }) => [`section-${id}`],
  { revalidate: 3600 }
);
