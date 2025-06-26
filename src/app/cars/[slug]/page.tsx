import { notFound } from 'next/navigation';
import CarDetail from '../../views/product/CarDetail';
import { carsMock } from '../../mock/cars.mock';

export default function CarDetailPage({ params }: { params: { slug: string } }) {
    const car = carsMock.find(c => c.id === params.slug);
    if (!car) return notFound();
    return <CarDetail car={car} />;
} 