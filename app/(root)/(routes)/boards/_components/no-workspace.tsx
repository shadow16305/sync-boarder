"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreateWorkspaceModal } from "@/components/modals/create-workspace-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const NoWorkspace = () => {
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>No workspaces yet...</CardTitle>
          <CardDescription>Get started by creating a workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <Button onClick={() => setWorkspaceModalOpen(true)} className="w-full">
            Create a workspace +
          </Button>
        </CardContent>
      </Card>
      {workspaceModalOpen && (
        <CreateWorkspaceModal open={workspaceModalOpen} onClose={() => setWorkspaceModalOpen(false)} />
      )}
    </>
  );
};
