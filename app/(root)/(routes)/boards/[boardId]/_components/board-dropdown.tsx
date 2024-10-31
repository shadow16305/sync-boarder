"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { BoardSettingsModal } from "./board-settings-modal";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";

interface BoardDropdownProps {
  handleImageUpload: (result: any) => void;
  handleBackgroundColorChange: (color: string) => void;
  backgroundColor: string | null;
  onDelete: () => void;
}

export const BoardDropdown = ({
  handleImageUpload,
  handleBackgroundColorChange,
  backgroundColor,
  onDelete,
}: BoardDropdownProps) => {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-white/20">
            <Ellipsis size={16} className="text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Board settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setBoardModalOpen(true)}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirmationModalOpen(true)}>
            Delete board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BoardSettingsModal
        open={boardModalOpen}
        onClose={() => setBoardModalOpen(false)}
        handleImageUpload={handleImageUpload}
        handleBackgroundColorChange={handleBackgroundColorChange}
        backgroundColor={backgroundColor}
      />
      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onClick={onDelete}
        description="delete this board"
        buttonTxt="Delete"
      />
    </>
  );
};
