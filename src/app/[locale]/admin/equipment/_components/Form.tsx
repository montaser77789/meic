"use client";
import { useActionState, useEffect, useState } from "react";
import { SelectedSectionId } from "../../_components/SelectedSectionId";
import { EquipmentCategory, Section } from "@prisma/client";
import useFormFields from "@/hooks/useFormFields";
import { Pages, Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { addequipmentCategory, updateequipmentCategory } from "../_action/equipment";
import { validationErrors } from "@/validation/auth";
import EquipmentCategoryTable from "./EquipmentCategoryTable";
import { Locale } from "@/i18n.config";
type InitialStateType = {
  message?: string;
  error?: validationErrors;
  status?: number | null;
  formData?: FormData;
};
const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
  formData: new FormData(),
};
const Form = ({
  section,
  equipments,
}: {
  section?: Section[];
  equipments?: EquipmentCategory;
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [equipment, setEquipment] = useState<EquipmentCategory[]>([]);
  const { getFormFields } = useFormFields({
    slug: `/${Routes.ADMIN}/${Pages.EQUIPMENT}`,
  });
  const [state, action, pending] = useActionState(
    equipments
      ? updateequipmentCategory.bind(null, {
          id: equipments.id,
          sectionId: selectedSectionId || "",
        })
      : addequipmentCategory.bind(null, { sectionId: selectedSectionId || "" }),
    initialState
  );
  const formData = new FormData();
  Object.entries(equipments ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedSectionId) return;

      try {
        const res = await fetch("/api/equipmentcategory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionId: selectedSectionId }),
        });

        const data = await res.json();
        if (res.ok) {
          setEquipment(data);
        } else {
          console.error("فشل في جلب الأسئلة:", data.error);
        }
      } catch (error) {
        console.error("فشل في جلب الأسئلة:", error);
      }
    };

    fetchQuestions();
  }, [selectedSectionId, state.status, state, equipment as EquipmentCategory[] , equipments]);
  return (
    <div>
   { !equipments &&   <SelectedSectionId
        section={section as Section[]}
        setSelectedSectionId={setSelectedSectionId}
      />}
      <form action={action}>
        {getFormFields().map((field) => {
          const defaultValue =
            state.formData?.get(field.name) ?? formData.get(field.name);
          return (
            <div key={field.name} className="mb-3">
              <FormFields
                error={state?.error}
                {...field}
                defaultValue={defaultValue as string}
              />
            </div>
          );
        })}
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Submit"}
        </Button>
      </form>
     { !equipments && <EquipmentCategoryTable
        sectionId={selectedSectionId || ""}
        equipment={equipment}
        locale={"ar" as Locale}
      />}
    </div>
  );
};

export default Form;
