"use server";

import prisma from "@/lib/db/prisma";
import getCurrentUser from "../data/get-current-user";

interface createBoardProps {
  name: string;
  workspaceId: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

const createBoard = async ({ name, workspaceId, backgroundColor, backgroundImage }: createBoardProps) => {
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

export default createBoard;
