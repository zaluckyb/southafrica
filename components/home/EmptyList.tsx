import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

function EmptyList({
  heading = 'No results.',
  message = 'Try changing or removing some of your filters.',
  btnText = 'Clear Filters',
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) {
  return (
    <div className='mt-16 flex flex-col items-center justify-center text-center animate-in fade-in-50 duration-500'>
      <div className='rounded-full bg-muted p-4 mb-6'>
        <FaSearch className='w-6 h-6 text-muted-foreground' />
      </div>
      <h2 className='text-2xl font-semibold tracking-tight mb-2'>{heading}</h2>
      <p className='text-muted-foreground mb-6 max-w-[500px]'>{message}</p>
      <Button asChild variant="default" size="lg" className='animate-in zoom-in-75 delay-150'>
        <Link href='/'>{btnText}</Link>
      </Button>
    </div>
  );
}

export default EmptyList;
