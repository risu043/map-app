'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { editPost } from '../post';
import { toast } from '@/hooks/use-toast';

export default function EditPostButton({
  id,
  title,
  markerId,
  userId,
}: {
  id: number;
  title: string;
  markerId: number;
  userId: string;
}) {
  const [editTitle, setEditTitle] = useState(title);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: 'レビューを編集しました',
        description: '変更が正常に保存されました。',
      });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'エラーが発生しました',
        description:
          'レビューの編集中にエラーが発生しました。もう一度お試しください。',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, title: editTitle, markerId, userId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Pencil className="mr-2 h-4 w-4" />
          編集する
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="edit-title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="レビューのタイトルを入力してください"
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  保存
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Pencil } from 'lucide-react';
// import { useState } from 'react';
// import { editPost } from '../post';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// export default function EditPostButton({
//   id,
//   title,
//   markerId,
//   userId,
// }: {
//   id: number;
//   title: string;
//   markerId: number;
//   userId: string;
// }) {
//   const [editTitle, setEditTitle] = useState(title);
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: editPost,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ['posts'],
//       });
//       alert('レビューを編集しました');
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     mutation.mutate({ id, title: editTitle, markerId, userId });
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default">
//           <Pencil className="mr-2 h-4 w-4" />
//           編集する
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogDescription>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 value={editTitle}
//                 onChange={(e) => setEditTitle(e.target.value)}
//               />
//               <DialogTrigger asChild>
//                 <Button type="submit">
//                   <Pencil className="mr-2 h-4 w-4" />
//                   編集完了
//                 </Button>
//               </DialogTrigger>
//             </form>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }
