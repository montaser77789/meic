"use client";
import { Pages, Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import useFormFields from "@/hooks/useFormFields";
import { validationErrors } from "@/validation/auth";
import React, { useActionState, useEffect } from "react";
import { addPointstoWhyus, updatePointstoWhyus } from "../_action/points";
import { Button } from "@/components/ui/button";
import { WhyusPoint } from "@prisma/client";
import { toast } from "sonner";

const Form = ({ whyudid , points }: { whyudid: string ,points?:WhyusPoint }) => {
  const { getFormFields } = useFormFields({
    slug: `/${Routes.ADMIN}/${Pages.WHYUS}/${Routes.POINTS}`,
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
    const formData = new FormData();
  Object.entries(points ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  const [state, action, pending] = useActionState(
    points ? updatePointstoWhyus.bind(null, { whyudid: whyudid , id : points.id }) : addPointstoWhyus.bind(null, { whyudid: whyudid }),

    initialState
  );


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
  return (
    <div>
      <form action={action}>
        {getFormFields().map((field) => {
         const defaultValue =
            state.formData?.get(field.name) ?? formData.get(field.name); // استرجاع القيم من FormData
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
    </div>
  );
};

export default Form;
