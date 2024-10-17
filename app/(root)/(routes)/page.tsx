import { Button } from "@/components/ui/button";
import getCurrentUser from "@/utils/data/get-current-user";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (currentUser) redirect("/boards");

  return (
    <main className="h-screen flex flex-col items-center justify-center space-y-4 text-center absolute inset-0 overflow-hidden">
      <h1 className="text-5xl font-bold max-w-2xl leading-tight">
        SyncBoarder helps teams{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md px-4 text-white">
          move work forward
        </span>
      </h1>
      <p className="text-xl max-w-2xl text-neutral-500">
        Streamline your tasks and discussions seamlessly with our intuitive task board and integrated chat features.
        Stay synchronized, stay productive. Get started today!
      </p>
      <Button asChild size="lg">
        <Link href="/sign-in">Get Started</Link>
      </Button>
    </main>
  );
}
