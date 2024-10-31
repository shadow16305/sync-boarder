import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BoardListProps {
  name: string;
}

export const BoardList = ({ name }: BoardListProps) => {
  return (
    <Card className="rounded-lg">
      <CardHeader className="py-2">
        <CardTitle>{name}</CardTitle>
        {/* <CardDescription>Board list description</CardDescription> */}
      </CardHeader>
      {/* <CardContent>
        <p>Board list content</p>
      </CardContent> */}
    </Card>
  );
};
