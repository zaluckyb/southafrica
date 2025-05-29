import Image from 'next/image';
import Link from 'next/link';
import CountryFlagAndName from './CountryFlagAndName';
import PropertyRating from './PropertyRating';
import FavoriteToggleButton from './FavoriteToggleButton';
import { PropertyCardProps } from '@/utils/types';
import { formatCurrency } from '@/utils/format';

function PropertyCard({ property }: { property: PropertyCardProps }) {
  const { name, image, price } = property;
  const { country, id: propertyId, tagline } = property;

  return (
    <article className='group relative bg-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-soft-xl'>
      <Link href={`/properties/${propertyId}`}>
        <div className='relative h-[300px] overflow-hidden'>
          <Image
            src={image}
            fill
            sizes='(max-width:768px) 100vw, 50vw'
            alt={name}
            className='object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        <div className='p-4'>
          <div className='flex justify-between items-start mb-2'>
            <h3 className='text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-300'>
              {name}
            </h3>
            <PropertyRating inPage={false} propertyId={propertyId} />
          </div>
          <p className='text-sm text-muted-foreground line-clamp-2 mb-3 h-10'>
            {tagline}
          </p>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>
              <span className='font-semibold text-primary'>{formatCurrency(price)} </span>
              <span className='text-muted-foreground'>night</span>
            </p>
            <CountryFlagAndName countryCode={country} />
          </div>
        </div>
      </Link>
      <div className='absolute top-4 right-4 z-10'>
        <FavoriteToggleButton propertyId={propertyId} />
      </div>
    </article>
  );
}

export default PropertyCard;
