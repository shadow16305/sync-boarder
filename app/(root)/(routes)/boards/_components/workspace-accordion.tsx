"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WorkspaceContext } from "@/context/workspace-context";
import { cn } from "@/lib/utils";
import { Workspace } from "@prisma/client";
import { Building2, Settings, Table2 } from "lucide-react";
import { useContext } from "react";

interface WorkspaceAccordionProps {
  workspaces: Workspace[];
  isBoards: boolean;
  setIsBoards: () => void;
  setIsSettings: () => void;
}

export const WorkspaceAccordion = ({ workspaces, setIsBoards, setIsSettings, isBoards }: WorkspaceAccordionProps) => {
  const workspaceCtx = useContext(WorkspaceContext);

  const handleWorkspaceClick = (workspaceName: string) => {
    const selectedWorkspace = workspaces.find((workspace) => workspace.name === workspaceName);
    if (selectedWorkspace) {
      workspaceCtx.setCurrentWorkspace(selectedWorkspace.name);
    }
  };

  return (
    <Accordion type="single" value={workspaceCtx.currentWorkspace} className="space-y-1">
      {workspaces.map((workspace) => (
        <AccordionItem key={workspace.id} value={workspace.name} className="min-w-72 border-none">
          <AccordionTrigger
            onClick={() => handleWorkspaceClick(workspace.name)}
            className="w-full justify-between py-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition rounded-md px-2">
            {workspaceTrigger(workspace.name)}
          </AccordionTrigger>
          <div className="pl-8">
            <AccordionContent>
              <Button
                variant="ghost"
                className={cn("flex items-center gap-x-1 w-full justify-start", isBoards && "bg-neutral-100")}
                onClick={setIsBoards}>
                <Table2 size={20} />
                Boards
              </Button>
            </AccordionContent>
            <AccordionContent>
              <Button
                variant="ghost"
                className={cn("flex items-center gap-x-1 w-full justify-start", !isBoards && "bg-neutral-100")}
                onClick={setIsSettings}>
                <Settings size={20} /> Settings
              </Button>
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const workspaceTrigger = (name: string) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="rounded-md bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 p-2">
        <Building2 size={16} className="text-white" />
      </div>
      {name}
    </div>
  );
};
