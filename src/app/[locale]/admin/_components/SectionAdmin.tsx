"use client";

import { Section } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

import { EditIcon } from "lucide-react";
import Link from "@/components/link/Link";
import { deleteSection } from "../_action/Section";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";

const SectionAdmin = ({ section }: { section: Section[] }) => {
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });

  const handleDelete = async (id: string, publicId: string) => {
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });
      const res = await deleteSection(id, publicId);
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
    if (state.message && state.status && !state.pending) {
      toast(state.message, {
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [state.message, state.status, state.pending]);
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-[1000px] w-full text-right bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-primary text-white text-sm md:text-base">
          <tr>
            <th className="p-3 border">العنوان (AR)</th>
            <th className="p-3 border">Title (EN)</th>
            <th className="p-3 border">الوصف</th>
            <th className="p-3 border">الوصف (EN)</th>
            <th className="p-3 border">الخصائص</th>
            <th className="p-3 border">صورة</th>
            <th className="p-3 border">التحكم</th>
          </tr>
        </thead>
        <tbody className="text-sm md:text-base">
          {section.map((sec) => (
            <tr key={sec.id} className="border-t hover:bg-gray-50">
              <td className="p-2 border font-bold text-primary">
                {sec.title_ar}
              </td>
              <td className="p-2 border">{sec.title_en}</td>
              <td className="p-2 border ">{sec.description_ar}</td>
              <td className="p-2 border ">{sec.description_en}</td>
              <td className="p-2 border ">
                <div className="text-xs">
                  <strong>AR:</strong>
                  <ul className="list-disc list-inside text-gray-700">
                    {sec.features_ar.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <strong className="mt-2 block">EN:</strong>
                  <ul className="list-disc list-inside text-gray-700">
                    {sec.features_en.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </td>
              <td className="p-2 border">
                <div className="relative w-28 h-20 rounded overflow-hidden">
                  <Image
                    src={sec.image}
                    alt={sec.title_en}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </td>
              <td className="p-2  flex flcx-col gap-2">
                {!state.pending ? (
                  <MdDelete
                    onClick={() => handleDelete(sec.id, sec.publicId!)}
                    className="w-6 h-6 cursor-pointer flex-1"
                  />
                ) : (
                  <LuLoader />
                )}

                <Link
                 
                  href={`/admin/${sec.slug}/edit`}
                >
                  {" "}
                  <EditIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionAdmin;
