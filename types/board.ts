export interface createBoardProps {
  name: string;
  workspaceId: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

export interface patchBoardProps {
  boardId: string;
  backgroundColor?: string;
  backgroundImage?: string;
}
