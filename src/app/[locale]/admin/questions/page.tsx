import React from "react";
import Form from "./_components/Form";
import { getSection } from "@/server/db/getSection";

export default async function page() {
  const sections = await getSection({ role: "admin", locale: "ar" });

  return (
    <main className="container mx-auto p-4 Navbar-gap mt-16">
      <section className="section-gap">
        <div className="container">
          <div className="sm:max-w-[625px] mx-auto space-y-6">
            <Form section={sections} />
          </div>
        
        </div>
      </section>
    </main>
  );
}
