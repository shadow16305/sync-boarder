"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { boardBackgrounds } from "@/utils/constants";
import { CldUploadButton } from "next-cloudinary";

interface BoardSettingsModalProps {
  open: boolean;
  onClose: () => void;
  backgroundColor: string | null;
  handleImageUpload: (result: any) => void;
  handleBackgroundColorChange: (color: string) => void;
}

export const BoardSettingsModal = ({
  open,
  onClose,
  backgroundColor,
  handleImageUpload,
  handleBackgroundColorChange,
}: BoardSettingsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your board</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center mt-4">
          <span>Change background color</span>
          <div className="flex flex-wrap gap-1 w-1/2">
            {boardBackgrounds.map((bg) => (
              <Button
                key={bg.name}
                variant="ghost"
                onClick={() => handleBackgroundColorChange(bg.color)}
                className={cn(
                  "w-[30%] rounded-md h-12 cursor-pointer",
                  bg.color,
                  `hover:${bg.color}`,
                  backgroundColor === bg.color && "border-2 border-black"
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span>Change background image</span>
          <div className="flex flex-wrap gap-1 w-1/2">
            <Button variant="secondary" asChild>
              <CldUploadButton
                uploadPreset="iqyh1p7s"
                options={{ maxFiles: 1 }}
                onSuccess={handleImageUpload}
                className="z-[60]"
              >
                Change Image
              </CldUploadButton>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
