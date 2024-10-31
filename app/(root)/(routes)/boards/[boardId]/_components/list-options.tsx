import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Ellipsis } from "lucide-react";

export const ListOptions = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Ellipsis size={16} />
      </PopoverTrigger>
      <PopoverContent className="w-fit py-0 px-0 flex flex-col">
        <Button variant="ghost" className="justify-start rounded-b-none">
          Add a card
        </Button>
        <Button variant="ghost" className="justify-start rounded-none">
          Copy list
        </Button>
        <Separator />
        <Button variant="destructive" className="justify-start rounded-t-none">
          Delete list
        </Button>
      </PopoverContent>
    </Popover>
  );
};
