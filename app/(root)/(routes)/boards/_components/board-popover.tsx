"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import createBoard from "@/utils/actions/create-board";
import { boardBackgrounds } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface BoardPopoverProps {
  workspaceId: string;
}

export const BoardPopover = ({ workspaceId }: BoardPopoverProps) => {
  const [backgroundColor, setBackgroundColor] = useState("bg-neutral-400");

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board created");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create board :(");
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutation.mutate({ name: data.name, workspaceId, backgroundColor });
  };

  return (
    <Popover>
      <PopoverTrigger className="bg-neutral-100 text-neutral-900 font-semibold shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80 py-10 w-[23%] rounded-md">
        Create new board
      </PopoverTrigger>
      <PopoverContent side="right">
        <span className="text-sm font-medium">Background</span>
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
          <div className="w-[61%] rounded-md h-16 cursor-pointer bg-neutral-100 hover:bg-neutral-100/90 flex items-center justify-center">
            Custom image +
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-1">
            <FormField
              control={form.control}
              name="name"
              disabled={mutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My new board" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
