import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationModalProps {
  onClick: () => void;
  open: boolean;
  onClose: () => void;
}

export const ConfirmationModal = ({ onClick, open, onClose }: ConfirmationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between w-full gap-x-4">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick} className="w-full">
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
