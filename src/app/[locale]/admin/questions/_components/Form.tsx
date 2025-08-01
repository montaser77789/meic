"use client";

import { Pages, Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import { validationErrors } from "@/validation/auth";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { SelectedSectionId } from "../../_components/SelectedSectionId";
import { Question, Section } from "@prisma/client";
import { addquestion } from "../_action/question";
import QuestionItem from "./questionItem";

const Form = ({ section }: { section?: Section[] }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [questions, setQuestions] = useState<Question[]>([]);

  const { getFormFields } = useFormFields({
    slug: `/${Routes.ADMIN}/${Pages.questions}`,
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
  const [state, action, pending] = useActionState(
    addquestion.bind(null, { sectionId: selectedSectionId || "" }),
    initialState
  );
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedSectionId) return;

      try {
        const res = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionId: selectedSectionId }),
        });

        const data = await res.json();
        if (res.ok) {
          setQuestions(data);
        } else {
          console.error("فشل في جلب الأسئلة:", data.error);
        }
      } catch (error) {
        console.error("فشل في جلب الأسئلة:", error);
      }
    };

    fetchQuestions();
  }, [selectedSectionId, state.status, state, questions]);

  return (
    <>
      <SelectedSectionId
        section={section as Section[]}
        setSelectedSectionId={setSelectedSectionId}
      />

      <form action={action}>
        {getFormFields().map((field) => {
          const defaultValue = state?.formData?.get(field.name) || ""; // استرجاع القيم من FormData
          return (
            <div key={field.name} className="mb-3">
              <FormFields
                error={state?.error}
                {...field}
                defaultValue={defaultValue.toString()}
              />
            </div>
          );
        })}
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <QuestionItem question={questions} />
    </>
  );
};

export default Form;
