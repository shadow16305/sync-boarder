import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationModalProps {
  onClick: () => void;
  open: boolean;
  onClose: () => void;
  description: string;
  buttonTxt: string;
}

export const ConfirmationModal = ({
  onClick,
  open,
  onClose,
  description,
  buttonTxt,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to {description}?</DialogTitle>
          <DialogDescription>This action is irreversible.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between w-full gap-x-4">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick} className="w-full">
            {buttonTxt}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
