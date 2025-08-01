"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deleteImageFromMyWork } from "../_action/gallary";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

const DeleteImageFromOurWork = ({
  sectionId,
  publicId,
  id,
}: {
  sectionId: string;
  publicId: string;
  id: string;
}) => {
  console.log(publicId, id);

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
      const res = await deleteImageFromMyWork({ id, publicId, sectionId });
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

export default DeleteImageFromOurWork;
