import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOptions } from "./list-options";
import { Plus } from "lucide-react";

interface BoardListProps {
  name: string;
}

export const BoardList = ({ name }: BoardListProps) => {
  return (
    <Card className="rounded-lg h-fit bg-white/80">
      <CardHeader className="py-2 flex flex-row items-center justify-between min-w-[272px]">
        <CardTitle className="font-medium text-base">{name}</CardTitle>
        <ListOptions />
      </CardHeader>
      <CardContent className="pb-2">
        <Button
          variant="ghost"
          className="w-full text-neutral-600 justify-start pl-0 hover:bg-transparent flex items-center gap-x-2"
        >
          <Plus size={16} className="text-neutral-600" /> Add a card
        </Button>
      </CardContent>
    </Card>
  );
};
