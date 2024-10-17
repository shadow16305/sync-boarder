import { Board } from "@prisma/client";
import Link from "next/link";
import { BoardPopover } from "./board-popover";
import { cn } from "@/lib/utils";

interface BoardGridProps {
  boards: Board[];
  workspaceId: string;
}

export const BoardGrid = ({ boards, workspaceId }: BoardGridProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {boards.map((board) => (
        <Link
          href={`/boards/${board.id}`}
          className={cn(
            "w-[23%] p-4 pb-16 rounded-md hover:bg-opacity-90 transition text-white text-xl font-semibold",
            board.backgroundColor
          )}>
          {board.name}
        </Link>
      ))}
      <BoardPopover workspaceId={workspaceId} />
    </div>
  );
};
