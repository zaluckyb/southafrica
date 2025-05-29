'use client';

import { Button } from '@/components/ui/button';
import { seedProperties } from '@/utils/actions';
import { useTransition } from 'react';
import { toast } from '@/components/ui/use-toast';

export default function SeedButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await seedProperties();
      toast({
        title: result.message,
        variant: result.message.includes('error') ? 'destructive' : 'default',
      });
    });
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={isPending}
      variant="outline"
      className="fixed bottom-4 right-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {isPending ? 'Creating Properties...' : 'Create Demo Properties'}
    </Button>
  );
} 