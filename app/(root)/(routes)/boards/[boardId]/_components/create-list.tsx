"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { listSchema } from "@/lib/zod";
import { createList } from "@/utils/actions/list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type formValues = {
  name: string;
};

export const CreateList = ({ boardId }: { boardId: string }) => {
  const [toggled, setToggled] = useState(false);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createList,
    onSuccess: () => {
      toast.success("List created!");
      router.refresh();
      setToggled(false);
    },
    onError: () => {
      toast.error("Failed to create list :(");
    },
  });

  const form = useForm<formValues>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof listSchema>> = async (data) => {
    mutation.mutate({ name: data.name, boardId, order: 1 });
    form.reset();
  };

  return !toggled ? (
    <Button
      variant="secondary"
      size="lg"
      className="flex items-center justify-between w-[272px] bg-white/80"
      onClick={() => setToggled(true)}
    >
      Add a list <Plus size={16} />
    </Button>
  ) : (
    <div className="bg-white rounded-lg px-4 py-2 h-fit">
      <Form {...form}>
        <form
          className="space-y-3 w-[272px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            disabled={mutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name for your list..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="info">
            Submit
          </Button>
          <Button
            type="button"
            variant="outline"
            className="ml-2"
            onClick={() => setToggled(false)}
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
};
