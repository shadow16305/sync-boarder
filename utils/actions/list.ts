"use server";

import prisma from "@/lib/db/prisma";
import getCurrentUser from "../data/get-current-user";
import { CreateCardProps, CreateListProps, ListWithCards } from "@/types/list";

export const createList = async ({ name, boardId, order }: CreateListProps) => {
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
    return newList;
  } catch (error) {
    console.error("Error creating board: ", error);
  }
};

export const deleteList = async (listId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return null;

    await prisma.list.delete({
      where: {
        id: listId,
      },
    });
  } catch (error) {
    console.error("Error deleting list: ", error);
  }
};

export const updateListOrder = async (lists: ListWithCards[]) => {
  try {
    await Promise.all(
      lists.map((list) =>
        prisma.list.update({
          where: { id: list.id },
          data: { order: list.order },
        })
      )
    );
  } catch (error) {
    console.error("Error updating list order: ", error);
  }
};

export const updateCardOrder = async (lists: ListWithCards[]) => {
  try {
    for (const list of lists) {
      await Promise.all(
        list.cards.map(async (card) => {
          try {
            await prisma.card.update({
              where: { id: card.id },
              data: { order: card.order, listId: card.listId },
            });
          } catch (error: any) {
            if (error.code === "P2025") {
              console.warn(
                `Card with ID ${card.id} not found, skipping update.`
              );
            } else {
              throw error;
            }
          }
        })
      );
    }
  } catch (error) {
    console.error("Error updating card order: ", error);
  }
};

export const createCard = async ({ name, listId, order }: CreateCardProps) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return null;

    await prisma.card.create({
      data: {
        name,
        listId,
        order,
      },
    });
  } catch (error) {
    console.error("Error creating board: ", error);
  }
};
