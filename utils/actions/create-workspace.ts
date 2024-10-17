"use server";

import prisma from "@/lib/db/prisma";
import getCurrentUser from "../data/get-current-user";

const createWorkspace = async ({ name }: { name: string }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return null;

    await prisma.workspace.create({
      data: {
        name,
        userId: currentUser.id,
      },
    });
  } catch (error) {
    console.error("Error creating workspace: ", error);
  }
};

export default createWorkspace;
