"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListOptions } from "./list-options";
import { useState } from "react";
import { AddCard } from "./add-card";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { CardItem } from "./card-item";
import { Card as CardType } from "@prisma/client";
import { ListWithCards } from "@/types/list";

interface BoardListProps {
  boardId: string;
  list: ListWithCards;
  index: number;
  cards: CardType[];
  onDeleteList: (listId: string) => void;
  onCopyList: (copiedList: ListWithCards) => void;
  onAddCardToList: (listId: string, card: CardType) => void;
}

export const BoardList = ({
  boardId,
  list,
  index,
  cards,
  onDeleteList,
  onCopyList,
  onAddCardToList,
}: BoardListProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="rounded-lg h-fit bg-white/80"
        >
          <CardHeader
            {...provided.dragHandleProps}
            className="py-2 flex flex-row items-center justify-between min-w-[272px]"
          >
            <CardTitle className="font-medium text-base">{list.name}</CardTitle>
            <ListOptions
              name={list.name}
              boardId={boardId}
              listId={list.id}
              onDeleteList={onDeleteList}
              onCopyList={onCopyList}
            />
          </CardHeader>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <CardContent
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2 px-2 pb-2"
              >
                {cards?.map((card, index) => (
                  <CardItem
                    key={card.id}
                    card={card}
                    index={index}
                    list={list}
                  />
                ))}
                {provided.placeholder}
              </CardContent>
            )}
          </Droppable>
          <CardFooter className="pb-2 px-0">
            <AddCard
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              listId={list.id}
              onAddCardToList={onAddCardToList}
            />
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
};
