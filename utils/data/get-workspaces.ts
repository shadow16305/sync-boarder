"use server";

import { WorkspaceWithBoards } from "@/types/workspace";
import prisma from "../../lib/db/prisma";
import getCurrentUser from "./get-current-user";

const getWorkspaces = async (): Promise<WorkspaceWithBoards[] | null> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return null;

    const workspaces: WorkspaceWithBoards[] = await prisma.workspace.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: {
        boards: true,
      },
    });

    if (!workspaces) return null;

    return workspaces;
  } catch (error) {
    return null;
  }
};

export default getWorkspaces;
