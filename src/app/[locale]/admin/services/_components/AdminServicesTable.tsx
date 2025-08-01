"use client";
import Link from "@/components/link/Link";
import { Services } from "@prisma/client";
import { EditIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { deleteServices } from "../_action/services";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./Form";

const AdminServicesTable = ({ services , sectionId }: { services: Services[] ; sectionId : string }) => {
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
      const res = await deleteServices({id : id , sectionId });
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
    <div className="overflow-x-auto mt-10">
      <table className="min-w-[1000px] w-full text-right bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-primary text-white text-sm md:text-base">
          <tr>
            <th className="p-3 border">العنوان (AR)</th>
            <th className="p-3 border">Title (EN)</th>
            <th className="p-3 border">الوصف</th>
            <th className="p-3 border">الوصف (EN)</th>
            <th className="p-3 border">اضافه خدمه</th>
            <th className="p-3 border">التحكم</th>
          </tr>
        </thead>
        <tbody className="text-sm md:text-base">
          {services.map((sec) => (
            <tr key={sec.id} className="border-t hover:bg-gray-50">
              <td className="p-2 border font-bold text-primary">
                {sec.title_ar}
              </td>
              <td className="p-2 border">{sec.title_en}</td>
              <td className="p-2 border max-w-sm">{sec.desc_ar}</td>
              <td className="p-2 border max-w-sm">{sec.desc_en}</td>
              <td className="p-2 border">
                {" "}
                <Link
                  className={`w-full rounded-full ${buttonVariants({
                    variant: "default",
                  })}`}
                  href={`/admin/services/${sec.id}`}
                >
                  اضافه خدمه
                </Link>
              </td>

              <td className="p-2  flex gap-2">
                {!state.pending ? (
                  <MdDelete
                    onClick={() => handleDelete(sec.id)}
                    className="w-6 h-6 cursor-pointer"
                  />
                ) : (
                  <LuLoader />
                )}

                <Edit services={sec} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServicesTable;

const Edit = ({ services }: { services: Services }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل الخدمه</DialogTitle>
          <Form services={services} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
