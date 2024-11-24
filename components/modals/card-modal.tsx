"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListWithCards } from "@/types/list";
import { Card } from "@prisma/client";
import { AlignLeft, Table2 } from "lucide-react";
import { CardDescriptionForm } from "../forms/card-description-form";
import { useState } from "react";

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  card: Card;
  list: ListWithCards;
}

export const CardModal = ({ open, onClose, card, list }: CardModalProps) => {
  const [localDescription, setLocalDescription] = useState(card.description);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-1">
            <Table2 size={16} />
            {card.name}
          </DialogTitle>
          <DialogDescription>
            In list <span className="underline">{list.name}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-x-1 font-semibold">
          <AlignLeft size={16} /> Description
        </div>
        <CardDescriptionForm
          card={card}
          localDescription={localDescription}
          setLocalDescription={setLocalDescription}
        />
      </DialogContent>
    </Dialog>
  );
};
