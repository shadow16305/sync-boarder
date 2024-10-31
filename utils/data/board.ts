"use server";

import prisma from "@/lib/db/prisma";

export const getBoard = async (boardId: string) => {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (!board) return null;

    return board;
  } catch (error) {
    console.error("Error getting board: ", error);
  }
};

export const getLists = async (boardId: string) => {
  try {
    const lists = await prisma.list.findMany({
      where: {
        boardId,
      },
    });

    if (!lists) return null;

    return lists;
  } catch (error) {
    console.error("Error getting lists: ", error);
  }
};
