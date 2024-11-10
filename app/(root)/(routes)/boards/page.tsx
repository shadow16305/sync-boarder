import { NoWorkspace } from "./_components/no-workspace";
import getWorkspaces from "@/utils/data/get-workspaces";
import { Workspaces } from "./_components/workspaces";

export default async function BoardsPage() {
  const workspaces = await getWorkspaces();
  let boardsPageClasses =
    !workspaces || workspaces.length === 0
      ? "w-10/12 mx-auto h-screen absolute inset-0 flex items-center justify-center"
      : "w-10/12 mx-auto flex justify-center mt-20";

  return (
    <main className={boardsPageClasses}>
      {!workspaces || workspaces.length === 0 ? (
        <NoWorkspace />
      ) : (
        <Workspaces workspaces={workspaces} />
      )}
    </main>
  );
}
