"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateWorkspaceForm } from "../forms/create-workspace-form";

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateWorkspaceModal = ({ open, onClose }: CreateWorkspaceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>
        </DialogHeader>
        <CreateWorkspaceForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
