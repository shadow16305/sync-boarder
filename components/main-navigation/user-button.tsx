"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getCurrentUser from "@/utils/data/get-current-user";
import Image from "next/image";
import { useState } from "react";
import { SettingsModal } from "../modals/settings-modal";
import { signOut } from "next-auth/react";
import { ConfirmationModal } from "../modals/confirmation-modal";
import { useQuery } from "@tanstack/react-query";

export const UserButton = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser();
      return user;
    },
  });

  const user = query.data;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          {user?.image && (
            <div className="relative size-10">
              <Image src={user?.image} alt="User image" fill className="rounded-full object-cover" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSettingsModalOpen(true)}>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirmationModalOpen(true)}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {settingsModalOpen && (
        <SettingsModal open={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} user={user!} />
      )}
      {confirmationModalOpen && (
        <ConfirmationModal
          open={confirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
        />
      )}
    </>
  );
};
