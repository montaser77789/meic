"use client";
import { WhyusSection } from "@prisma/client";
import { EditIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { deleteWhyus } from "../_action/whyus";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./Form";
import Link from "@/components/link/Link";
const WhyusTable = ({ whyus , sectionId}: { whyus: WhyusSection[] ; sectionId: string }) => {
  console.log(whyus);

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
      const res = await deleteWhyus({id : id , sectionId : sectionId});
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

  if (!whyus || whyus.length === 0) {
    return <p className="mt-4 text-gray-500">لا توجد بيانات حتى الآن.</p>;
  }
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full border rounded-lg shadow text-nowrap">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-right">العنوان (AR)</th>
            <th className="px-4 py-2 text-right">العنوان (EN)</th>
            <th className="px-4 py-2 text-right">الوصف (AR)</th>
            <th className="px-4 py-2 text-right">الوصف (EN)</th>
            <th className="px-4 py-2 text-right">التحكم</th>
            <th className="px-4 py-2 text-right">الاضافة</th>
          </tr>
        </thead>
        <tbody>
          {whyus.map((item) => (
            <tr key={item.id} className="border-t text-right">
              <td className="px-4 py-2">{item.heading_ar}</td>
              <td className="px-4 py-2">{item.heading_en}</td>
              <td className="px-4 py-2">{item.subheading_ar}</td>
              <td className="px-4 py-2">{item.subheading_en}</td>
              <td className="p-2  flex gap-2">
                {!state.pending ? (
                  <MdDelete
                    onClick={() => handleDelete(item.id)}
                    className="w-6 h-6 cursor-pointer"
                  />
                ) : (
                  <LuLoader />
                )}

                <Edit whyus={item} />
              </td>
              <td className="">
                <Link className="ml-2" href={`/admin/whyus/${item.id}/images`}>اضافه الصور</Link>
                <Link href={`/admin/whyus/${item.id}/points`}>
                  اضافه النقاط
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WhyusTable;

const Edit = ({ whyus }: { whyus: WhyusSection }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل الخدمه</DialogTitle>
          <Form whyus={whyus} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
