import { PropertyManagement } from "@/components/PropertyManagement"
import { fetchProperties } from "@/utils/actions"
import PropertiesList from "@/components/properties/PropertiesList"
import SearchBar from "@/components/properties/SearchBar"

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  const properties = await fetchProperties({
    search: searchParams.search,
    category: searchParams.category,
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <PropertyManagement />
      <div className="mt-8">
        <SearchBar />
        <PropertiesList properties={properties} />
      </div>
    </main>
  );
} 