import { cn } from "@/lib/utils";
import { getBoard, getLists } from "@/utils/data/board";
import { BoardTools } from "./_components/board-tools";
import { ListContainer } from "./_components/list-container";

export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await getBoard(params.boardId);
  const lists = await getLists(params.boardId);

  const hasBackgroundImage =
    board?.backgroundImage && board.backgroundImage.trim() !== "";

  return (
    <main
      className={cn(
        "h-[calc(100vh-57px)] relative overflow-hidden bg-cover bg-no-repeat",
        !hasBackgroundImage && board?.backgroundColor
      )}
      style={{
        backgroundImage: hasBackgroundImage
          ? `url(${board.backgroundImage})`
          : undefined,
      }}
    >
      <BoardTools board={board!} />
      <ListContainer lists={lists!} board={board!} />
      <span className="bg-white rounded-md px-6 py-2 absolute left-1/2 bottom-10 -translate-x-1/2">
        Shift + Scroll to scroll left & right
      </span>
    </main>
  );
}
