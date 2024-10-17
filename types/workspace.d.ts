import { Board, Workspace } from "@prisma/client";

export interface WorkspaceWithBoards extends Workspace {
  boards: Board[];
}
