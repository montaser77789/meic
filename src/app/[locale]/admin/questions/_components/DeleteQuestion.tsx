import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteQuestion } from '../_action/question';
type StateType = {
    isLoading: boolean;
    message: string;
    status: number | null;
  };

const DeleteQuestion = ({ id , sectionId}: { id: string , sectionId: string }) => {

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
          const res = await deleteQuestion({ id  , sectionId});
          setState((prev) => {
            return { ...prev, message: res.message, status: res.status };
          });
          toast.success("Question deleted successfully");
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
}

export default DeleteQuestion
