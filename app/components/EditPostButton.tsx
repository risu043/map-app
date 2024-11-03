import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';

export default function EditPostButton({ id }: { id: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Pencil className="mr-2 h-4 w-4" />
          編集する
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            <div className="grid gap-4 py-4">
              <p>{id}のポストです</p>
            </div>
            <form action="">
              <input type="text" />
              <DialogTrigger asChild>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  編集完了
                </Button>
              </DialogTrigger>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
