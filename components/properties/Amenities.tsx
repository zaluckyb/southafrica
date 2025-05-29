import { Amenity } from "@/types";
import { LuFolderCheck } from 'react-icons/lu';
import Title from './Title';

function parseAmenities(amenities: string): Amenity[] {
  try {
    // Try parsing as JSON first (new format)
    return JSON.parse(amenities);
  } catch {
    // If JSON parsing fails, handle old format (comma-separated string)
    const amenityNames = amenities.split(',');
    return amenityNames.map(name => ({
      name: name.trim(),
      selected: true
    }));
  }
}

function Amenities({ amenities }: { amenities: string }) {
  const amenitiesList: Amenity[] = parseAmenities(amenities);
  const noAmenities = amenitiesList.every((amenity) => !amenity.selected);
  if (noAmenities) return null;

  return (
    <div className='mt-4'>
      <Title text='What this place offers' />
      <div className='grid md:grid-cols-2 gap-x-4'>
        {amenitiesList.map((amenity) => {
          if (!amenity.selected) return null;
          return (
            <div key={amenity.name} className='flex items-center gap-x-4 mb-2'>
              <LuFolderCheck className='h-6 w-6 text-primary' />
              <span className='font-light text-sm capitalize'>
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
