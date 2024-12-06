import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ModalButtonProps {
  children: ReactNode;
  variant?:
    | 'outline'
    | 'link'
    | 'default'
    | 'destructive'
    | 'secondary'
    | 'ghost'
    | null;
  className?: string;
}

export default function ModalButton({
  children,
  variant = 'outline',
  className,
}: ModalButtonProps) {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>お知らせ</DialogTitle>
          <DialogDescription>
            <Image
              src="/images/fugu.jpg"
              alt="ふぐのイラスト"
              priority
              width={250}
              height={250}
            />
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>この機能を使うには、アカウントの登録が必要です。</p>
        </div>
        <DialogTrigger asChild>
          <Button className="mt-4" onClick={() => router.push('/sign_up')}>
            アカウント登録
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}
