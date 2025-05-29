import { Property } from '@prisma/client';
import { conservativeAmenities } from './amenities';
import { uploadImage } from './supabase';

const propertyTypes = [
  { type: 'Beachfront Villa', category: 'beach' },
  { type: 'Mountain Cabin', category: 'cabin' },
  { type: 'Urban Loft', category: 'urban' },
  { type: 'Countryside Cottage', category: 'tiny' },
  { type: 'Luxury Penthouse', category: 'luxury' },
  { type: 'Treehouse Retreat', category: 'tent' },
  { type: 'Lake House', category: 'lake' },
  { type: 'Desert Oasis', category: 'desert' },
  { type: 'Historic Manor', category: 'historic' },
  { type: 'Modern Apartment', category: 'apartment' }
];

const locations = [
  { country: 'US', names: ['Malibu Beach House', 'Manhattan Skyline Apartment', 'Colorado Mountain Lodge'] },
  { country: 'FR', names: ['Provence Villa', 'Paris Apartment', 'French Riviera Mansion'] },
  { country: 'IT', names: ['Tuscan Villa', 'Venice Canal House', 'Amalfi Coast Retreat'] },
  { country: 'JP', names: ['Kyoto Traditional Home', 'Tokyo Modern Flat', 'Mount Fuji Cabin'] },
  { country: 'GB', names: ['London Townhouse', 'Scottish Highland Cottage', 'Cornwall Beach House'] }
];

const taglines = [
  'Stunning retreat with breathtaking views',
  'Luxurious escape in the heart of nature',
  'Modern comfort meets classic charm',
  'Peaceful sanctuary away from it all',
  'Ultimate relaxation in paradise',
  'Your dream vacation awaits',
  'Experience luxury at its finest',
  'Unforgettable stay in a unique setting',
  'Perfect blend of comfort and style',
  'Escape to tranquility'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomAmenities(): string {
  const count = getRandomNumber(4, 8);
  const amenitiesList = [...conservativeAmenities].sort(() => 0.5 - Math.random())
    .slice(0, count)
    .map(amenity => ({ ...amenity, selected: true }));
  
  return JSON.stringify(amenitiesList);
}

async function uploadPropertyImage(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'property-image.jpg', { type: 'image/jpeg' });
    return await uploadImage(file);
  } catch (error) {
    console.error('Error uploading image:', error);
    // Fallback to a default image if upload fails
    return 'https://iyntfhjykndzgiprrsll.supabase.co/storage/v1/object/public/images/default-property.jpg';
  }
}

export async function generateProperty(profileId: string): Promise<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>> {
  const location = getRandomItem(locations);
  const propertyName = getRandomItem(location.names);
  const propertyType = getRandomItem(propertyTypes);
  
  // Use a more reliable image source
  const imageUrls = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&h=800&q=80'
  ];

  const selectedImageUrl = getRandomItem(imageUrls);
  const uploadedImageUrl = await uploadPropertyImage(selectedImageUrl);
  
  return {
    name: `${propertyName} - ${propertyType.type}`,
    tagline: getRandomItem(taglines),
    category: propertyType.category,
    image: uploadedImageUrl,
    country: location.country,
    description: `Experience the perfect getaway at this stunning ${propertyType.type.toLowerCase()}. Located in a prime location, this property offers the perfect blend of comfort and luxury. Whether you're seeking adventure or relaxation, this ${propertyType.type.toLowerCase()} provides everything you need for an unforgettable stay.`,
    price: getRandomNumber(100, 1000),
    guests: getRandomNumber(2, 12),
    bedrooms: getRandomNumber(1, 6),
    beds: getRandomNumber(1, 8),
    baths: getRandomNumber(1, 5),
    amenities: getRandomAmenities(),
    profileId
  };
}

export async function generateProperties(profileId: string, count: number = 10) {
  const properties = [];
  for (let i = 0; i < count; i++) {
    const property = await generateProperty(profileId);
    properties.push(property);
  }
  return properties;
} 