"use client";

import { Board } from "@prisma/client";
import { BoardList } from "./board-list";
import { CreateList } from "./create-list";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListWithCards } from "@/types/list";
import { useMutation } from "@tanstack/react-query";
import { updateCardOrder, updateListOrder } from "@/utils/actions/list";
import toast from "react-hot-toast";
import { useState } from "react";

interface ListContainerProps {
  lists: ListWithCards[];
  board: Board;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ lists, board }: ListContainerProps) => {
  const [localLists, setLocalLists] = useState<ListWithCards[]>(lists);

  const executeUpdateListOrder = useMutation({
    mutationFn: updateListOrder,
    onSuccess: () => {
      toast.success("List order updated");
    },
    onError: () => {
      toast.error("Failed to update list order");
    },
  });

  const executeUpdateCardOrder = useMutation({
    mutationFn: updateCardOrder,
    onSuccess: () => {
      toast.success("Card order updated");
    },
    onError: () => {
      toast.error("Failed to update card order");
    },
  });

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const newLists = reorder(localLists, source.index, destination.index).map(
        (list, index) => ({
          ...list,
          order: index,
        })
      );

      setLocalLists(newLists);
      executeUpdateListOrder.mutate(newLists);
    }

    if (type === "card") {
      const sourceList = localLists.find(
        (list) => list.id === source.droppableId
      )!;
      const destinationList = localLists.find(
        (list) => list.id === destination.droppableId
      )!;

      if (!sourceList || !destinationList) return;

      const newLists = [...localLists];

      if (!sourceList.cards) sourceList.cards = [];

      if (!destinationList.cards) destinationList.cards = [];

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });
      }
      setLocalLists(newLists);
      executeUpdateCardOrder.mutate(newLists);
    }
  };

  const handleCreateList = (newList: ListWithCards) => {
    setLocalLists((prevLists) => [...prevLists, newList]);
  };

  const handleDeleteList = (listId: string) => {
    setLocalLists((prevLists) =>
      prevLists.filter((list) => list.id !== listId)
    );
  };

  const handleCopyList = (copiedList: ListWithCards) => {
    setLocalLists((prevLists) => [...prevLists, copiedList]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-4 flex gap-x-4 w-10/12 mx-auto overflow-auto h-full"
          >
            {localLists.map((list, index) => (
              <BoardList
                key={list.id}
                name={list.name}
                boardId={board.id}
                listId={list.id}
                index={index}
                cards={list.cards}
                onDeleteList={handleDeleteList}
                onCopyList={handleCopyList}
              />
            ))}
            {provided.placeholder}
            <CreateList boardId={board!.id} onCreateList={handleCreateList} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
