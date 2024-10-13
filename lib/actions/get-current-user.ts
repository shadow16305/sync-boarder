"use server";

import prisma from "../db/prisma";
import getSession from "./get-session";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
