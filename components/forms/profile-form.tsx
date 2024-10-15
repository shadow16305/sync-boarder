"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import { CldUploadButton } from "next-cloudinary";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FieldValues>({
    defaultValues: {
      name: user.name,
      bio: user.bio ? user.bio : "This user didn't write a bio...",
      image: user.image || "",
    },
  });

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    await fetch("/api/settings", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        toast.success("Profile updated!");
        form.setValue("name", data.name);
        form.setValue("bio", data.bio);
      })
      .catch((error) => {
        toast.error("Failed to update profile :(");
        console.error("Error updating profile: ", error);
      })
      .finally(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      });
  };

  const imageSrc = form.watch("image");

  const handleImageUpload = (result: any) => {
    form.setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-x-4 py-4">
        <div className="relative size-20 rounded-full">
          {imageSrc && <Image src={imageSrc} alt="User image" fill className="rounded-full object-cover" />}
        </div>
        <Button variant="secondary" size="sm" asChild>
          <CldUploadButton
            uploadPreset="iqyh1p7s"
            options={{ maxFiles: 1 }}
            onSuccess={handleImageUpload}
            className="z-[60]"
            appendTo={document.body}>
            Change Image
          </CldUploadButton>
        </Button>
      </div>
      <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea className="w-full max-h-40" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="info" disabled={isLoading}>
          Save
        </Button>
      </form>
    </Form>
  );
};
