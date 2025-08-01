import { cache } from "./cache";
import { db } from "./prisma";

export const getServices = cache(
  async ({ role, locale }: { role: "admin" | "user"; locale: "en" | "ar" }) => {
    const services = await db.services.findMany();
    if (role === "admin") {
      return services;
    } else {
      return services.map((service) => ({
        id: service.id,
        title: locale === "en" ? service.title_en : service.title_ar,
        description: locale === "en" ? service.desc_en : service.desc_ar,
        service,
      }));
    }
  },
  ({ role, locale }) => [`service-${role}-${locale}`],
  { revalidate: 3600 }
);

export const gerServicesBySectionId = cache(
  async ({
    role,
    locale,
    sectionId,
  }: {
    role: "admin" | "user";
    locale: "en" | "ar";
    sectionId: string;
  }) => {
    const services = await db.services.findMany({
      where: { sectionId },
      include: { Services: true },
    });
    console.log(services);

    return services;
  },
  ({ role, locale, sectionId }) => [`service-${role}-${locale}-${sectionId}`],
  { revalidate: 3600 }
);

export const getService = cache(
  async ({
    role,
    id,
    locale,
  }: {
    role: "admin" | "user";
    id: string; // this is servicesId
    locale: "en" | "ar";
  }) => {
    const services = await db.service.findMany({
      where: {
        servicesId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (role === "admin") {
      return services;
    }

    // لو يوزر نعمل ماب على الداتا ونرجع القيم المترجمة فقط
    return services.map((service) => ({
      id: service.id,
      title: locale === "en" ? service.title_en : service.title_ar,
      description: locale === "en" ? service.desc_en : service.desc_ar,
      image: service.image ?? null,
    }));
  },
  ({ id }) => [`services-by-parent-${id}`],
  { revalidate: 3600 }
);
