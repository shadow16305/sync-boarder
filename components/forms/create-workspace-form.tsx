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
import createWorkspace from "@/utils/actions/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const CreateWorkspaceForm = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();

  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      toast.success("Workspace created!");
      router.refresh();
      onClose();
    },
    onError: () => {
      toast.error("Failed to create workspace :(");
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutation.mutate({ name: data.name });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={mutation.isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Workspace" {...field} />
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
  );
};
