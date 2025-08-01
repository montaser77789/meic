"use client";
import { Pages, Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import useFormFields from "@/hooks/useFormFields";
import { validationErrors } from "@/validation/auth";
import React, { useActionState, useEffect, useState } from "react";
import { SelectedSectionId } from "../../_components/SelectedSectionId";
import { Section, WhyusSection } from "@prisma/client";
import { addwhyus, UpdateWhyus } from "../_action/whyus";
import { toast } from "sonner";
import WhyusTable from "./WhyusTable";
import { Button } from "@/components/ui/button";

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
  whyus,
}: {
  section?: Section[];
  whyus?: WhyusSection;
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [whyusList, setWhyusList] = useState<WhyusSection[]>([]);

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.WHYUS}`,
  });
  const formData = new FormData();
  Object.entries(whyus ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  const [state, action, pending] = useActionState(
    whyus
      ? UpdateWhyus.bind(null, { id: whyus.id , sectionId: selectedSectionId || ""} )
      : addwhyus.bind(null, { sectionId: selectedSectionId || "" }),
    initialState
  );
  console.log(state);

  useEffect(() => {
    if (state?.message && state.status && !pending) {
      toast(state.message, {
        className:
          state.status === 200 || state.status === 201
            ? "text-green-400"
            : "text-destructive",
      });
    }
  }, [pending, state?.message, state?.status]);
  useEffect(() => {
    const fetchWhyusData = async () => {
      if (!selectedSectionId) return;

      try {
        const res = await fetch("/api/whyus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionId: selectedSectionId }),
        });
        console.log(res);

        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setWhyusList(data);
        } else {
          console.error("فشل في جلب البيانات:", data.error);
        }
      } catch (err) {
        console.error("خطأ في تحميل البيانات:", err);
      }
    };

    fetchWhyusData();
  }, [selectedSectionId, state, whyus, whyusList]); // يعيد الجلب بعد الإضافة أو تغيير القسم
  console.log(whyusList);
  return (
    <div>
      {!whyus && (
        <SelectedSectionId
          section={section as Section[]}
          setSelectedSectionId={setSelectedSectionId}
        />
      )}
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
        <Button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "جاري التحميل..." : "حفظ"}
        </Button>
      </form>
      {!whyus && <WhyusTable sectionId={selectedSectionId || ""} whyus={whyusList} />}
    </div>
  );
};

export default Form;
