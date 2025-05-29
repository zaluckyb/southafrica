"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface PropertyListItem {
  id: string
  name: string
  tagline: string
  country: string
  price: number
  image: string
}

interface PropertiesListProps {
  properties: PropertyListItem[]
}

export default function PropertiesList({ properties }: PropertiesListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center mt-10">
        <h3 className="text-xl font-semibold">No properties found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link key={property.id} href={`/properties/${property.id}`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1">{property.name}</CardTitle>
              <CardDescription className="line-clamp-2 mt-2">
                {property.tagline}
              </CardDescription>
              <div className="mt-4 font-semibold">
                ${property.price} per night
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
} 