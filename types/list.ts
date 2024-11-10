import { Card, List } from "@prisma/client";

export interface CreateListProps {
  name: string;
  boardId: string;
  order: number;
}

export interface CreateCardProps {
  name: string;
  listId: string;
  order: number;
}

export interface ListWithCards extends List {
  cards: Card[];
}
