"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { CardModal } from "@/components/modals/card-modal";
import { ListWithCards } from "@/types/list";

interface CardItemProps {
  card: Card;
  list: ListWithCards;
  index: number;
}

export const CardItem = ({ card, index, list }: CardItemProps) => {
  const [cardModalOpen, setCardModalOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="py-2 px-4 bg-white rounded-md"
            onClick={() => setCardModalOpen(true)}
          >
            <p className="text-sm font-medium">{card.name}</p>
          </div>
        )}
      </Draggable>
      <CardModal
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        card={card}
        list={list}
      />
    </>
  );
};
