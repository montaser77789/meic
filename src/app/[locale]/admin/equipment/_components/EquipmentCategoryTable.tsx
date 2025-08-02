import { EquipmentCategory } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { EditIcon } from "lucide-react";
import { deleteEquipment } from "../_action/equipment";
import Form from "./Form";
import { Pages, Routes } from "@/components/constants/enum";
import { Locale } from "@/i18n.config";
import Link from "@/components/link/Link";
const EquipmentCategoryTable = ({
  equipment,
  sectionId,
  locale

}: {
  equipment: EquipmentCategory[];
  sectionId: string;
  locale: Locale
}) => {

  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });
  console.log(state);
  const handleDelete = async (id: string) => {
    console.log(id);

    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });
      const res = await deleteEquipment({ id: id, sectionId: sectionId });
      setState((prev) => {
        return { ...prev, status: res.status, message: res.message };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, pending: false };
      });
    }
  };
  useEffect(() => {
    if (state.status === 200) {
      toast.success(state.message);
      setState((prev) => {
        return { ...prev, status: null, message: "" };
      });
    }
  }, [state.status, state.message]);
  return (
    <table className="min-w-full border rounded-lg shadow text-nowrap overflow-auto">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th scope="col" className="px-4 py-2 text-right">
            الاسم باللغه الانجليزية
          </th>
          <th scope="col" className="px-4 py-2 text-right">
            الاسم باللغه العربية
          </th>
          <th scope="col" className="px-4 py-2 text-right">
            العمليات
          </th>
          <th scope="col" className="px-4 py-2 text-right">الاضافه</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {equipment.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-2">
              <div className="text-sm text-gray-900">{item.name_en}</div>
            </td>
            <td className="px-4 py-2">
              <div className="text-sm text-gray-900">{item.name_ar}</div>
            </td>
            <td className="p-2  flex gap-2">
              {!state.pending ? (
                <MdDelete
                  onClick={() => handleDelete(item.id)}
                  className="w-6 h-6 cursor-pointer"
                />
              ) : (
                <LuLoader />
              )}

              <Edit equipment={item} />
            </td>
              <td className="p-2">
                <Link className="w-6 h-6 text-gray-900" href={`/${locale}/${Routes.ADMIN}/${Pages.EQUIPMENT}/${item.id}`}>اضافه معده</Link>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentCategoryTable;
const Edit = ({equipment}: {equipment: EquipmentCategory}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل المعده</DialogTitle>
          <Form equipments={equipment} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
