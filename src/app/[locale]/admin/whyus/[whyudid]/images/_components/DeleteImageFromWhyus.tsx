"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deleteWhyUsImage } from "../_action/whyusImage";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

const DeleteImageFromWhyus = ({
  whyudImageid,
  sectionId,
  publicId,
  whyudid
}: {
  whyudImageid: string;
  sectionId: string;
  publicId : string
  whyudid : string
}) => {
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });
  const handleDelete = async () => {
    setState((prev) => {
      return { ...prev, isLoading: true };
    });
    try {
      const res = await deleteWhyUsImage({ sectionId, whyudImageid , publicId ,whyudid  });
      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
      toast.success("Image deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  return (
    <Button
      variant="secondary"
      disabled={state.isLoading}
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteImageFromWhyus;
