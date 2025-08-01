import { Locale } from "@/i18n.config";
import { getService } from "@/server/db/services";
import React from "react";
import Form from "./_components/Form";
import ServicesTable from "./_components/ServicesTable";

export default async function page({
  params,
}: {
  params: Promise<{ servicesid: string; locale: Locale }>;
}) {
  const { servicesid } = await params;
  const services = await getService({ role: "admin", id: servicesid , locale: "ar" });
      console.log(services);

  return (
    <main className="container mx-auto p-4 Navbar-gap mt-16">
      <Form servicesid={servicesid} />
      <div>
        <ServicesTable servicesid={servicesid} services={services} />
      </div>
    </main>
  );
}
