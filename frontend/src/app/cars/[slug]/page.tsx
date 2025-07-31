import { notFound } from 'next/navigation';
import CarDetail from '../../views/product/CarDetail';
import { cars } from '../../mock/cars.mock';

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const car = cars.find(c => c.id === slug);
    if (!car) return notFound();
    return <CarDetail car={car} />;
} 