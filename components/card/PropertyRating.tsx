import { fetchPropertyRating } from '@/utils/actions';
import { FaStar } from 'react-icons/fa';

async function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  const { rating, count } = await fetchPropertyRating(propertyId);
  if (count === 0) return null;
  
  const className = `
    inline-flex items-center gap-1.5 
    ${inPage ? 'text-base' : 'text-sm'} 
    text-primary transition-colors duration-200 
    hover:text-primary/90
  `;
  
  const countText = count === 1 ? 'review' : 'reviews';
  const countValue = `(${count})${inPage ? ' ' + countText : ''}`;
  
  return (
    <span className={className}>
      <FaStar className={`${inPage ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-yellow-400`} />
      <span className="font-medium">{rating}</span>
      <span className="text-muted-foreground">{countValue}</span>
    </span>
  );
}

export default PropertyRating;
