"use client";

import { createContext, useState } from "react";

interface WorkspaceContextObject {
  currentWorkspace: string;
  setCurrentWorkspace: (workspace: string) => void;
}

export const WorkspaceContext = createContext({
  currentWorkspace: "",
  setCurrentWorkspace: (workspace: string) => {},
});

export const WorkspaceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentWorkspace, setCurrentWorkspace] = useState("");

  const workspaceContextValue: WorkspaceContextObject = {
    currentWorkspace,
    setCurrentWorkspace,
  };

  return <WorkspaceContext.Provider value={workspaceContextValue}>{children}</WorkspaceContext.Provider>;
};
