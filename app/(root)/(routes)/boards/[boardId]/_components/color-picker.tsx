import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { boardBackgrounds } from "@/utils/constants";

interface ColorPickerProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  open: boolean;
  onClose: () => void;
}

export const ColorPicker = ({
  backgroundColor,
  setBackgroundColor,
  open,
  onClose,
}: ColorPickerProps) => {
  return (
    <Popover open={open} onOpenChange={onClose}>
      <PopoverContent>
        <div className="flex flex-wrap gap-1 mt-1">
          {boardBackgrounds.map((bg) => (
            <Button
              key={bg.name}
              variant="ghost"
              onClick={() => setBackgroundColor(bg.color)}
              className={cn(
                "w-[30%] rounded-md h-16 cursor-pointer",
                bg.color,
                `hover:${bg.color}`,
                backgroundColor === bg.color && "border-2 border-black"
              )}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
