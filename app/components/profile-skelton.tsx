import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export function ProfileSkeleton() {
  return (
    <Card className="w-full mx-auto max-w-md">
      <CardHeader>
        <div className="h-7 w-3/4 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
      </CardFooter>
    </Card>
  );
}
