import PropertyCard from '../card/PropertyCard';
import type { PropertyCardProps } from '@/utils/types';

function PropertiesList({ properties }: { properties: PropertyCardProps[] }) {
  return (
    <section className='mt-8 grid gap-8 animate-in slide-in-from-bottom duration-700 ease-in-out
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4
      [&>*:nth-child(1)]:animate-in 
      [&>*:nth-child(2)]:animate-in 
      [&>*:nth-child(3)]:animate-in 
      [&>*:nth-child(4)]:animate-in 
      [&>*:nth-child(1)]:fade-in-0 
      [&>*:nth-child(2)]:fade-in-100 
      [&>*:nth-child(3)]:fade-in-200 
      [&>*:nth-child(4)]:fade-in-300
      [&>*:nth-child(1)]:slide-in-from-bottom-4
      [&>*:nth-child(2)]:slide-in-from-bottom-8
      [&>*:nth-child(3)]:slide-in-from-bottom-12
      [&>*:nth-child(4)]:slide-in-from-bottom-16
    '>
      {properties.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  );
}

export default PropertiesList;
