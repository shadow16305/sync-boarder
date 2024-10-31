"use server";

import prisma from "@/lib/db/prisma";
import getCurrentUser from "../data/get-current-user";
import { createBoardProps, patchBoardProps } from "@/types/board";

export const createBoard = async ({ name, workspaceId, backgroundColor, backgroundImage }: createBoardProps) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return null;

    await prisma.board.create({
      data: {
        name,
        workspaceId: workspaceId,
        userId: currentUser?.id,
        backgroundColor,
        backgroundImage,
      },
    });
  } catch (error) {
    console.error("Error creating board: ", error);
  }
};

export const deleteBoard = async (boardId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return null;

    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
  } catch (error) {
    console.error("Error deleting board: ", error);
  }
};

export const patchBoard = async ({ boardId, backgroundColor, backgroundImage }: patchBoardProps) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return null;

    await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        backgroundColor,
        backgroundImage,
      },
    });
  } catch (error) {
    console.error("Error patching board: ", error);
  }
};
