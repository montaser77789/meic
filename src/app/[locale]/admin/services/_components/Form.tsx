"use client";
import React, { useActionState, useEffect, useState } from "react";
import { SelectedSectionId } from "../../_components/SelectedSectionId";
import { Section, Services } from "@prisma/client";
import useFormFields from "@/hooks/useFormFields";
import { Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import { validationErrors } from "@/validation/auth";
import { Button } from "@/components/ui/button";
import { addServces, UpdateServices } from "../_action/services";
import { toast } from "sonner";
import AdminServicesTable from "./AdminServicesTable";

const Form = ({
  section,
  services,
}: {
  section?: Section[];
  services?: Services;
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [serviceList, setServiceList] = useState<Services[]>([]);
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Routes.SERVICES}`,
  });
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
  console.log(selectedSectionId);
  const [state, action, pending] = useActionState(
    services
      ? UpdateServices.bind(null, {id: services.id , sectionId: selectedSectionId || ""}, )
      : addServces.bind(null, { sectionId: selectedSectionId || "" }),
    initialState
  );
  const formData = new FormData();
  Object.entries(services ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
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
    const fetchServices = async () => {
      if (!selectedSectionId) return;

      try {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "admin",
            locale: "ar",
            sectionId: selectedSectionId,
          }),
        });

        const services = await res.json();
        setServiceList(services);
      } catch (error) {
        console.error("فشل في جلب الخدمات:", error);
      }
    };

    fetchServices();
  }, [selectedSectionId , state , serviceList]);

  return (
    <>
      {!services && (
        <SelectedSectionId
          section={section as Section[]}
          setSelectedSectionId={setSelectedSectionId}
        />
      )}
      <form className="mt-4" action={action}>
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
          {pending ? "جار الحفظ..." : "حفظ"}
        </Button>
      </form>

      <AdminServicesTable services={serviceList} sectionId={selectedSectionId!} />
    </>
  );
};

export default Form;
