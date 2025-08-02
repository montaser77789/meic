"use client";
import { Pages, Routes } from "@/components/constants/enum";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useRef, useState } from "react";
import { toast } from "sonner";

const Form = () => {
  const router = useRouter();

  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState({});
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log(data);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,

        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        const resError = JSON.parse(res?.error).resError;
        setError(validationError);
        console.log(resError);
        if (resError) {
          toast(resError);
        }
      }
      if (res?.ok) {
        toast("Login successful");
        router.replace(`/ar/${Routes.ADMIN}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-3">
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button className="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
