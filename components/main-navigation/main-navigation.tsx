"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { UserButton } from "./user-button";
import { WorkspaceCombobox } from "../workspace-combobox";

export const MainNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="w-screen mx-auto border-b py-2 z-50 relative">
      <div className="flex items-center justify-between w-10/12 mx-auto">
        <div className="flex items-center gap-x-6">
          <span className="text-2xl font-bold">SyncBoarder</span>
          {pathname !== "/" && (
            <>
              <Link
                href="/boards"
                className={cn(
                  "font-medium text-neutral-500 hover:text-neutral-900 transition-colors text-sm",
                  pathname === "/boards" && "text-neutral-900"
                )}>
                Boards
              </Link>
              <Link
                href="/chats"
                className={cn(
                  "font-medium text-neutral-500 hover:text-neutral-900 transition-colors text-sm",
                  pathname === "/chats" && "text-neutral-900"
                )}>
                Chats
              </Link>
            </>
          )}
        </div>
        {pathname === "/" && (
          <Button asChild>
            <Link href="/sign-in" className="flex items-center gap-x-1">
              Login <LogIn size={20} />
            </Link>
          </Button>
        )}
        {pathname !== "/" && (
          <div className="flex items-center gap-x-4">
            <WorkspaceCombobox />
            <UserButton />
          </div>
        )}
      </div>
    </nav>
  );
};
