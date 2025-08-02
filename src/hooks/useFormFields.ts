import { Pages, Routes } from "@/components/constants/enum";
import { IFormField, IFormFieldsVariables } from "@/types/app";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const loginFields = (): IFormField[] => [
    {
      label: "البريد الالكتروني",
      name: "email",
      type: "email",
      placeholder: "البريد الالكتروني",
      autoFocus: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      placeholder: "كلمة المرور",
      type: "password",
    },
  ];
  const sectionFields = (): IFormField[] => [
    {
      label: "العنوان باللغه العربية",
      name: "title_ar",
      type: "text",
      placeholder: "العنوان باللغه العربية",
      autoFocus: true,
    },
    {
      label: "العنوان باللغه الانجليزية",
      name: "title_en",
      placeholder: "العنوان باللغه الانجليزية",
      type: "text",
    },
    {
      label: "وصف باللغه العربية",
      name: "description_ar",
      type: "text",
      placeholder: "ادخل وصف باللغه العربية",
      autoFocus: true,
    },
    {
      label: "وصف باللغه الانجليزية",
      name: "description_en",
      placeholder: "ادخل وصف باللغه الانجليزية",
      type: "text",
    },
  ];
  const titleServicesFields = (): IFormField[] => [
    {
      label: "العنوان باللغه العربية",
      name: "title_ar",
      type: "text",
      placeholder: "العنوان باللغه العربية",
      autoFocus: true,
    },
    {
      label: "العنوان باللغه الانجليزية",
      name: "title_en",
      placeholder: "العنوان باللغه الانجليزية",
      type: "text",
    },
    {
      label: "وصف باللغه العربية",
      name: "desc_ar",
      type: "textarea",
      placeholder: "ادخل وصف باللغه العربية",
      autoFocus: true,
    },
    {
      label: "وصف باللغه الانجليزية",
      name: "desc_en",
      placeholder: "ادخل وصف باللغه الانجليزية",
      type: "textarea",
    },
  ];
  const servicesFields = (): IFormField[] => [
    {
      label: "العنوان باللغه الانجليزية",
      name: "title_en",
      type: "text",
      placeholder: "ادخل العنوان باللغه الانجليزية",
      autoFocus: true,
    },
    {
      label: "العنوان باللغه العربية",
      name: "title_ar",
      type: "text",
      placeholder: "ادخل العنوان باللغه العربية",
      autoFocus: true,
    },
    {
      label: "الوصف باللغه الانجليزية",
      name: "desc_en",
      type: "textarea",
      placeholder: "ادخل الوصف باللغه الانجليزية",
      autoFocus: true,
    },
    {
      label: "الوصف باللغه العربية",
      name: "desc_ar",
      type: "textarea",
      placeholder: "ادخل الوصف باللغه العربية",
      autoFocus: true,
    },
  ];
  const questionFields = (): IFormField[] => [
    {
      label: "السؤال باللغه الانجليزية",
      name: "question_en",
      type: "textarea",
      placeholder: "ادخل السؤال باللغه الانجليزية",
      autoFocus: true,
    },
    {
      label: "الاجابه باللغه الانجليزية",
      name: "answer_en",
      placeholder: "ادخل الاجابه باللغه الانجليزية",
      type: "textarea",
    },
    {
      label: "السؤال باللغه العربية",
      name: "question_ar",
      type: "textarea",
      placeholder: "Question",
      autoFocus: true,
    },
    {
      label: "الاجابه باللغه العربية",
      name: "answer_ar",
      placeholder: "Answer",
      type: "textarea",
    },
  ];

  const whyusFields = (): IFormField[] => [
    {
      label: "العنوان باللغه الانجليزية",
      name: "heading_en",
      type: "text",
      placeholder: "ادخل العنوان باللغه الانجليزية",
    },
    {
      label: "العنوان باللغه العربية",
      name: "heading_ar",
      type: "text",
      placeholder: "ادخل العنوان باللغه العربية",
    },
    {
      label: "الوصف باللغه الانجليزية",
      name: "subheading_en",
      type: "textarea",
      placeholder: "ادخل الوصف باللغه الانجليزية",
    },
    {
      label: "الوصف باللغه العربية",
      name: "subheading_ar",
      type: "textarea",
      placeholder: "ادخل الوصف باللغه العربية",
    },
  ];

  const whyusPoints = (): IFormField[] => [
    {
      label: "العنوان باللغه العربية",
      name: "title_ar",
      type: "text",
      placeholder: "العنوان باللغه العربية",
      autoFocus: true,
    },
    {
      label: "العنوان باللغه الانجليزية",
      name: "title_en",
      placeholder: "العنوان باللغه الانجليزية",
      type: "text",
    },
    {
      label: "وصف باللغه العربية",
      name: "desc_ar",
      type: "textarea",
      placeholder: "ادخل وصف باللغه العربية",
      autoFocus: true,
    },
    {
      label: "وصف باللغه الانجليزية",
      name: "desc_en",
      placeholder: "ادخل وصف باللغه الانجليزية",
      type: "textarea",
    },
  ];
  const equipmentCatagoryFields = (): IFormField[] => [
    {
      label: "اسم القسم باللغه الانجليزية",
      name: "name_en",
      type: "text",
      placeholder: "ادخل اسم القسم باللغه الانجليزية",
    },
    {
      label: "اسم القسم باللغه العربية",
      name: "name_ar",
      type: "text",
      placeholder: "ادخل اسم القسم باللغه العربية",
    },
  ];

  const equipmentFields = (): IFormField[] => [
    {
      label: "اسم المعده باللغه الانجليزية",
      name: "title_en",
      type: "text",
      placeholder: "ادخل اسم المعده باللغه الانجليزية",
    },
    {
      label: "اسم المعده باللغه العربية",
      name: "title_ar",
      type: "text",
      placeholder: "ادخل اسم المعده باللغه العربية",
    },
    {
      label: "وصف المعده باللغه الانجليزية",
      name: "description_en",
      type: "textarea",
      placeholder: "ادخل وصف المعده باللغه الانجليزية",
    },
    {
      label: "وصف المعده باللغه العربية",
      name: "description_ar",
      type: "textarea",
      placeholder: "ادخل وصف المعده باللغه العربية",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      case Routes.ADMIN:
        return sectionFields();
      case `${Routes.ADMIN}/${Routes.SERVICES}`:
        return titleServicesFields();
      case `/${Routes.ADMIN}/${Routes.SERVICES}/add`:
        return servicesFields();
      case `/${Routes.ADMIN}/${Pages.questions}`:
        return questionFields();
      case `${Routes.ADMIN}/${Pages.WHYUS}`:
        return whyusFields();
      case `/${Routes.ADMIN}/${Pages.WHYUS}/${Routes.POINTS}`:
        return whyusPoints();
      case `/${Routes.ADMIN}/${Pages.EQUIPMENT}`:
        return equipmentCatagoryFields();
      case `/${Routes.ADMIN}/${Pages.EQUIPMENT}/eqcatagoryid`:
        return equipmentFields();

      default:
        return [];
    }
  };

  return { getFormFields };
};

export default useFormFields;
