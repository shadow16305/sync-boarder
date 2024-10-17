"use server";

import prisma from "@/lib/db/prisma";
import getCurrentUser from "../data/get-current-user";

interface UpdateSettingsProps {
  image: string;
  name: string;
  bio: string;
}

const updateSettings = async ({ image, name, bio }: UpdateSettingsProps) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return null;

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
        bio,
      },
    });
  } catch (error) {
    console.error("Error updating settings: ", error);
  }
};

export default updateSettings;
