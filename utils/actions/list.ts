"use server"

import prisma from "@/lib/db/prisma";
import getCurrentUser from "../data/get-current-user";
import { CreateListProps } from "@/types/list";

export const createList = async ({name, boardId, order}: CreateListProps) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) return null;
    
        const newList = await prisma.list.create({
          data: {
            name,
            boardId,
            order,
          },
        });
      } catch (error) {
        console.error("Error creating board: ", error);
      }
}