import { Locale } from "@/i18n.config";
import React from "react";
import Form from "./_components/Form";
import { getWhyUsImage } from "@/server/db/whyusimage";

const page = async ({
  params,
}: {
  params: Promise<{ whyudid: string; locale: Locale }>;
}) => {
  const { whyudid } = await params;
  const whyusImage = await getWhyUsImage({ locale: "ar", sectionId: whyudid });
  return (
    <main className="container mx-auto p-4 mt-16">
      <div>
        <Form sectionId={whyudid} whyudid={whyudid} whyusImage={whyusImage} />
      </div>
    </main>
  );
};

export default page;
