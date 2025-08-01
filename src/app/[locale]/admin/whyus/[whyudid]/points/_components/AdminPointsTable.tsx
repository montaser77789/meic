"use client";
import Link from "@/components/link/Link";
import { WhyusPoint } from "@prisma/client";
import { EditIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deletePoint } from "../_action/points";
import Form from "./Form";

const AdminPointsTable = ({
  points,
  whyudid,
}: {
  points: WhyusPoint[];
  whyudid: string;
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
      const res = await deletePoint(id, whyudid);
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
            <th className="p-3 border">التحكم</th>
          </tr>
        </thead>
        <tbody className="text-sm md:text-base">
          {points.map((sec) => (
            <tr key={sec.id} className="border-t hover:bg-gray-50">
              <td className="p-2 border font-bold text-primary">
                {sec.title_ar}
              </td>
              <td className="p-2 border">{sec.title_en}</td>
              <td className="p-2 border max-w-sm">{sec.desc_ar}</td>
              <td className="p-2 border max-w-sm">{sec.desc_en}</td>
    

              <td className="p-2  flex gap-2">
                {!state.pending ? (
                  <MdDelete
                    onClick={() => handleDelete(sec.id)}
                    className="w-6 h-6 cursor-pointer"
                  />
                ) : (
                  <LuLoader />
                )}

                <Edit whyudid={whyudid} whyuswpoints={sec} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPointsTable;

const Edit = ({ whyuswpoints , whyudid }: { whyuswpoints: WhyusPoint ,whyudid: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل الخدمه</DialogTitle>
          <Form points={whyuswpoints} whyudid={whyudid} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
