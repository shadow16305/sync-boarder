"use client";

import { deleteBoard, patchBoard } from "@/utils/actions/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Board } from "@prisma/client";
import { BoardDropdown } from "./board-dropdown";

export const BoardTools = ({ board }: { board: Board }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board deleted");
      router.push("/boards");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete board :(");
    },
  });

  const patchMutation = useMutation({
    mutationFn: patchBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board updated");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update board :(");
    },
  });
  const handleImageUpload = (result: any) => {
    const imageUrl = result?.info?.secure_url;
    patchMutation.mutate({ boardId: board.id, backgroundImage: imageUrl });
  };

  const handleBackgroundColorChange = (color: string) => {
    patchMutation.mutate({
      boardId: board.id,
      backgroundColor: color,
      backgroundImage: "",
    });
  };

  const onDelete = () => {
    deleteMutation.mutate(board.id);
  };

  return (
    <>
      <div className="w-full py-1 bg-white border-t overflow-hidden">
        <div className="w-10/12 mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold">{board.name}</h1>
          <BoardDropdown
            handleImageUpload={handleImageUpload}
            handleBackgroundColorChange={handleBackgroundColorChange}
            backgroundColor={board.backgroundColor}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  );
};
