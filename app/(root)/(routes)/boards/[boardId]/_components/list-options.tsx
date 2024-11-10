"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ListWithCards } from "@/types/list";
import { createList, deleteList } from "@/utils/actions/list";
import { useMutation } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ListOptionsProps {
  name: string;
  boardId: string;
  listId: string;
  onDeleteList: (listId: string) => void;
  onCopyList: (copiedList: ListWithCards) => void;
}

export const ListOptions = ({
  name,
  boardId,
  listId,
  onDeleteList,
  onCopyList,
}: ListOptionsProps) => {
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: createList,
    onSuccess: (newList) => {
      if (newList) {
        toast.success("List copied!");
        router.refresh();
        onCopyList({ ...newList, cards: [] });
      } else {
        console.error("Error creating list: newList is null or undefined");
      }
    },
    onError: () => {
      toast.error("Failed to copy list :(");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      toast.success("List deleted!");
      router.refresh();
      onDeleteList(listId);
    },
    onError: () => {
      toast.error("Failed to delete list :(");
    },
  });

  const copyList = () => {
    createMutation.mutate({ name: name + " - copy", boardId, order: 1 });
  };

  const handleDeleteList = () => {
    deleteMutation.mutate(listId);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Ellipsis size={16} />
      </PopoverTrigger>
      <PopoverContent className="w-fit py-0 px-0 flex flex-col">
        <Button variant="ghost" className="justify-start rounded-b-none">
          Add a card
        </Button>
        <Button
          variant="ghost"
          className="justify-start rounded-none"
          onClick={copyList}
        >
          Copy list
        </Button>
        <Separator />
        <Button
          variant="destructive"
          className="justify-start rounded-t-none"
          onClick={handleDeleteList}
        >
          Delete list
        </Button>
      </PopoverContent>
    </Popover>
  );
};
