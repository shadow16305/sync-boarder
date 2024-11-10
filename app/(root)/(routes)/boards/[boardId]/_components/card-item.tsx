"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="py-2 px-4 bg-white rounded-md"
        >
          <p className="text-sm font-medium">{card.name}</p>
        </div>
      )}
    </Draggable>
  );
};
