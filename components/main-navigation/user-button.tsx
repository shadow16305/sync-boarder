"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getCurrentUser from "@/lib/actions/get-current-user";
import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SettingsModal } from "../modals/settings-modal";

export const UserButton = () => {
  const [user, setUser] = useState<User>();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser!);
      console.log(currentUser);
    };
    fetchUser();
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          {user?.image && <Image src={user?.image} alt="User image" width={32} height={32} className="rounded-full" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSettingsModalOpen(true)}>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {settingsModalOpen && <SettingsModal open={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} />}
    </>
  );
};
