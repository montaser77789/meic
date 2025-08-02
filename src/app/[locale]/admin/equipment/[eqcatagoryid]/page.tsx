import { Locale } from "@/i18n.config";
import React from "react";
import Form from "./_components/Form";
import EquipmentTableAdmin from "./_components/EquipmentTableAdmin";

const page = async ({
  params,
}: {
  params: Promise<{ eqcatagoryid: string; locale: Locale }>;
}) => {
  const { eqcatagoryid } = await params;

  const equipment = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/equipment`,
    {
      method: "POST",
      body: JSON.stringify({
        role: "admin",
        equipmentcatagoryIa: eqcatagoryid,
        locale: "ar",
      }),
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
  console.log(equipment);
  return (
    <main className="container mx-auto p-4 Navbar-gap mt-16">
      <Form eqcatagoryid={eqcatagoryid} />
      <div>
        <EquipmentTableAdmin
          equipments={equipment}
          equipmentsCatagoryid={eqcatagoryid}
        />
      </div>
    </main>
  );
};

export default page;
