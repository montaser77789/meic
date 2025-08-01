"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteService } from "../_action/service";
type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

const DeleteServices = ({
  id,
  publicId,
  servicesid
}: {
  id: string;
  publicId?: string;
  servicesid: string
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
      const res = await deleteService({ id, publicId ,servicesid });
      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
      toast.success("Services deleted successfully");
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

export default DeleteServices;
