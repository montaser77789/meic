import { Locale } from "@/i18n.config";
import React from "react";
import Form from "./_components/Form";
import { getPoints } from "@/server/db/getpoints";
import AdminPointsTable from "./_components/AdminPointsTable";


 const page = async ({
  params,
}: {
  params: Promise<{ whyudid: string; locale: Locale }>;
}) => {
  const { whyudid } = await params;
  const points = await getPoints({ role: "admin", whyudid, locale: "ar" });
  return (
    <main className="container mx-auto p-4 mt-16">
      <div>
        <Form whyudid={whyudid} />
      </div>
        <AdminPointsTable points={points}  whyudid={whyudid}/>
    </main>
  );
};

export default page;
