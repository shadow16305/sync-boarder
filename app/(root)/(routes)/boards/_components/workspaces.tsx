"use client";

import React, { useContext, useState } from "react";
import { WorkspaceAccordion } from "./workspace-accordion";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import { CreateWorkspaceModal } from "@/components/modals/create-workspace-modal";
import { WorkspaceContext } from "@/context/workspace-context";
import { Boards } from "./boards";
import { WorkspaceWithBoards } from "@/types/workspace";
import { Separator } from "@/components/ui/separator";

export const Workspaces = ({ workspaces }: { workspaces: WorkspaceWithBoards[] }) => {
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [isBoards, setIsBoards] = useState(true);
  const workspaceCtx = useContext(WorkspaceContext);

  const boards = workspaces.find((workspace) => workspace.name === workspaceCtx.currentWorkspace)?.boards;
  const activeWorkspace = workspaces.find((workspace) => workspace.name === workspaceCtx.currentWorkspace)?.id;

  return (
    <>
      <article className="flex gap-x-8 w-10/12 mx-auto">
        <aside className="space-y-4 w-1/4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Workspaces</span>
            <Button size="icon" variant="ghost" onClick={() => setWorkspaceModalOpen(true)}>
              <Plus size={20} />
            </Button>
          </div>
          <WorkspaceAccordion
            workspaces={workspaces}
            isBoards={isBoards}
            setIsBoards={() => setIsBoards(true)}
            setIsSettings={() => setIsBoards(false)}
          />
        </aside>
        <section className="w-3/4 space-y-4">
          <div className="flex items-center gap-x-4">
            <div className="bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 rounded-md p-3">
              <Building2 size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">{workspaceCtx.currentWorkspace}</h1>
          </div>
          <Separator className="w-full" />
          {isBoards ? <Boards boards={boards} workspaceId={activeWorkspace ? activeWorkspace : ""} /> : <p>Settings</p>}
        </section>
      </article>
      <CreateWorkspaceModal open={workspaceModalOpen} onClose={() => setWorkspaceModalOpen(false)} />
    </>
  );
};
