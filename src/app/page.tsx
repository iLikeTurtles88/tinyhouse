import PropertyList from '@/components/property-list';
import Filter from '@/components/filter';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tiny Haven Retreats</h1>
      <Filter />
      <PropertyList />
    </div>
  );
}
