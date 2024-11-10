"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cardSchema } from "@/lib/zod";
import { createCard } from "@/utils/actions/list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface AddCardProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  listId: string;
}

export const AddCard = ({ isEditing, setIsEditing, listId }: AddCardProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const createCardMutation = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Card created successfully!");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create card :(");
    },
  });

  const form = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof cardSchema>> = async (data) => {
    createCardMutation.mutate({ name: data.name, listId, order: 1 });
    form.reset();
    setIsEditing(false);
  };

  return !isEditing ? (
    <Button
      variant="ghost"
      className="w-full text-neutral-600 justify-start pl-0 hover:bg-transparent flex items-center gap-x-2 ml-4"
      onClick={() => setIsEditing(true)}
    >
      <Plus size={16} className="text-neutral-600" /> Add a card
    </Button>
  ) : (
    <Form {...form}>
      <form
        className="space-y-3 w-full px-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          disabled={createCardMutation.isPending}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name for this card..."
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 items-center">
          <Button type="submit" variant="info">
            Submit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(false)}
          >
            <X size={16} />
          </Button>
        </div>
      </form>
    </Form>
  );
};
