import { Board } from "@prisma/client";
import { BoardPopover } from "./board-popover";
import { BoardGrid } from "./board-grid";

interface BoardsProps {
  boards?: Board[];
  workspaceId: string;
}

export const Boards = ({ boards, workspaceId }: BoardsProps) => {
  return (
    <section>
      {boards && boards?.length > 0 ? (
        <BoardGrid boards={boards} workspaceId={workspaceId} />
      ) : (
        <BoardPopover workspaceId={workspaceId} />
      )}
    </section>
  );
};
