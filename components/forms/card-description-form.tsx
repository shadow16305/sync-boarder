"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { createDescription } from "@/utils/actions/card";
import toast from "react-hot-toast";
import { z } from "zod";
import { cardDescriptionSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@prisma/client";

interface CardDescriptionProps {
  card: Card;
  localDescription: string | null;
  setLocalDescription: (description: string | null) => void;
}

export const CardDescriptionForm = ({
  card,
  localDescription,
  setLocalDescription,
}: CardDescriptionProps) => {
  const [btnVisible, setBtnVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: createDescription,
    onSuccess: () => {
      toast.success("Description updated!");
      setBtnVisible(false);
      console.log(localDescription);
    },
    onError: () => {
      toast.error("Failed to update description :(");
    },
  });

  const form = useForm({
    resolver: zodResolver(cardDescriptionSchema),
    defaultValues: {
      description: localDescription ? localDescription : "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof cardDescriptionSchema>> = async (
    data
  ) => {
    mutation.mutate({ description: data.description, cardId: card.id });
    setLocalDescription(data.description);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onFocus={() => setBtnVisible(true)}
      >
        <FormField
          control={form.control}
          name="description"
          disabled={mutation.isPending}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Add a more detailed description..."
                  {...field}
                  autoFocus={false}
                  className="max-h-80 min-h-20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {btnVisible && (
          <div className="mt-4 space-x-2">
            <Button type="submit" variant="info">
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setBtnVisible(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
