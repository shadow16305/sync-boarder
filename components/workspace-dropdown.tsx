"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useContext, useState } from "react";
import { WorkspaceContext } from "@/context/workspace-context";
import { useQuery } from "@tanstack/react-query";
import getWorkspaces from "@/utils/data/get-workspaces";
import { CreateWorkspaceModal } from "./modals/create-workspace-modal";

export const WorkspaceDropdown = () => {
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const workspaceCtx = useContext(WorkspaceContext);

  const query = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const workspaces = await getWorkspaces();
      workspaceCtx.setCurrentWorkspace(workspaces![0].name);
      return workspaces;
    },
  });

  const workspaces = query.data;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-x-2">
            {workspaces ? workspaceCtx.currentWorkspace : "No workspaces yet..."}
            <ChevronsUpDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage your workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaces?.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              onClick={() => {
                workspaceCtx.setCurrentWorkspace(workspace.name);
              }}>
              {workspace.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => setWorkspaceModalOpen(true)}>Create workspace +</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateWorkspaceModal open={workspaceModalOpen} onClose={() => setWorkspaceModalOpen(false)} />
    </>
  );
};
