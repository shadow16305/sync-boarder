"use server";

import prisma from "@/lib/db/prisma";
import getCurrentUser from "../data/get-current-user";

export const createDescription = async ({
  description,
  cardId,
}: {
  description: string;
  cardId: string;
}) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return null;

    const updatedCard = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        description,
      },
    });

    return updatedCard;
  } catch (error) {
    console.error("Error creating description: ", error);
  }
};
