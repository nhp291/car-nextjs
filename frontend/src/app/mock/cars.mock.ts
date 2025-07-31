export interface Car {
    id: string;
    slug: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    description: string;
    shortDescription: string;
    fuelType: string;
    transmission: string;
    driveType: string;
    engine: string;
    power: string;
    torque: string;
    acceleration: string;
    topSpeed: string;
    fuelConsumption: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
        wheelbase: string;
    };
    weight: string;
    seating: number;
    features: string[];
    safety: string[];
    colors: string[];
    isNew: boolean;
    isPopular: boolean;
    rating: number;
    reviewCount: number;
    stock: number;
    year: number;
    mileage?: number;
    condition: 'new' | 'used' | 'certified';
    location: string;
    dealer: string;
    warranty: string;
    createdAt: string;
    updatedAt: string;
}

export const cars: Car[] = [
    {
        id: 'bugatti-chiron-super-sport',
        slug: 'bugatti-chiron-super-sport',
        name: 'Bugatti Chiron Super Sport',
        brand: 'Bugatti',
        category: 'Supercar',
        price: 3800000000,
        originalPrice: 4000000000,
        image: '/images/bugatti-1651718.png',
        images: [
            '/images/bugatti-1651718.png',
            '/images/car.png',
            '/images/hero.png'
        ],
        description: 'Siêu xe Bugatti Chiron Super Sport với động cơ W16 quad-turbo, sản sinh công suất 1,600 mã lực và mô-men xoắn 1,600 Nm. Tốc độ tối đa lên đến 440 km/h, đây là một trong những chiếc xe nhanh nhất thế giới.',
        shortDescription: 'Siêu xe đỉnh cao với động cơ W16, tốc độ tối đa 440km/h',
        fuelType: 'Xăng',
        transmission: 'Tự động 7 cấp',
        driveType: 'AWD',
        engine: 'W16 8.0L Quad-Turbo',
        power: '1,600 HP',
        torque: '1,600 Nm',
        acceleration: '2.4s (0-100km/h)',
        topSpeed: '440 km/h',
        fuelConsumption: '22.5L/100km',
        dimensions: {
            length: '4,544 mm',
            width: '2,038 mm',
            height: '1,212 mm',
            wheelbase: '2,711 mm'
        },
        weight: '1,995 kg',
        seating: 2,
        features: [
            'Carbon fiber body',
            'Active aerodynamics',
            'Carbon ceramic brakes',
            'Adaptive suspension',
            'Premium sound system',
            'Heated seats',
            'Navigation system',
            'Blind spot monitoring'
        ],
        safety: [
            'ABS',
            'ESP',
            'Traction control',
            'Airbags',
            'Carbon fiber monocoque',
            'Roll cage'
        ],
        colors: ['Atlantic Blue', 'Racing Red', 'Pearl White', 'Carbon Black'],
        isNew: true,
        isPopular: true,
        rating: 4.9,
        reviewCount: 127,
        stock: 3,
        year: 2024,
        condition: 'new',
        location: 'Hà Nội',
        dealer: 'Bugatti Vietnam',
        warranty: '3 năm/100,000 km',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: 'toyota-camry-hybrid',
        slug: 'toyota-camry-hybrid',
        name: 'Toyota Camry Hybrid',
        brand: 'Toyota',
        category: 'Sedan',
        price: 1250000000,
        image: '/images/car.png',
        images: [
            '/images/car.png',
            '/images/hero.png'
        ],
        description: 'Toyota Camry Hybrid 2024 với thiết kế hiện đại, động cơ hybrid tiết kiệm nhiên liệu, nội thất sang trọng và nhiều tính năng an toàn tiên tiến.',
        shortDescription: 'Sedan cao cấp hybrid, tiết kiệm nhiên liệu, nội thất sang trọng',
        fuelType: 'Hybrid',
        transmission: 'CVT',
        driveType: 'FWD',
        engine: '2.5L Hybrid',
        power: '218 HP',
        torque: '221 Nm',
        acceleration: '7.5s (0-100km/h)',
        topSpeed: '180 km/h',
        fuelConsumption: '4.1L/100km',
        dimensions: {
            length: '4,885 mm',
            width: '1,840 mm',
            height: '1,455 mm',
            wheelbase: '2,825 mm'
        },
        weight: '1,640 kg',
        seating: 5,
        features: [
            'LED headlights',
            'Smart key system',
            'Wireless charging',
            'Apple CarPlay',
            'Android Auto',
            'Blind spot monitor',
            'Lane departure alert',
            'Pre-collision system'
        ],
        safety: [
            'Toyota Safety Sense 2.5+',
            '10 airbags',
            'ABS',
            'VSC',
            'TRC',
            'Hill start assist'
        ],
        colors: ['Pearl White', 'Metallic Silver', 'Midnight Black', 'Celestial Blue'],
        isNew: true,
        isPopular: true,
        rating: 4.7,
        reviewCount: 89,
        stock: 15,
        year: 2024,
        condition: 'new',
        location: 'TP.HCM',
        dealer: 'Toyota Vietnam',
        warranty: '3 năm/100,000 km',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10'
    },
    {
        id: 'honda-cr-v-turbo',
        slug: 'honda-cr-v-turbo',
        name: 'Honda CR-V Turbo',
        brand: 'Honda',
        category: 'SUV',
        price: 1150000000,
        image: '/images/hero.png',
        images: [
            '/images/hero.png',
            '/images/car.png'
        ],
        description: 'Honda CR-V Turbo 2024 với động cơ 1.5L Turbo mạnh mẽ, thiết kế SUV hiện đại, không gian nội thất rộng rãi và nhiều tính năng tiện nghi.',
        shortDescription: 'SUV đa dụng với động cơ turbo, không gian rộng rãi',
        fuelType: 'Xăng',
        transmission: 'CVT',
        driveType: 'AWD',
        engine: '1.5L Turbo',
        power: '188 HP',
        torque: '243 Nm',
        acceleration: '9.2s (0-100km/h)',
        topSpeed: '200 km/h',
        fuelConsumption: '7.2L/100km',
        dimensions: {
            length: '4,703 mm',
            width: '1,866 mm',
            height: '1,680 mm',
            wheelbase: '2,700 mm'
        },
        weight: '1,580 kg',
        seating: 7,
        features: [
            'LED headlights',
            'Panoramic sunroof',
            'Wireless charging',
            'Honda Sensing',
            'Apple CarPlay',
            'Android Auto',
            'Power tailgate',
            'Heated seats'
        ],
        safety: [
            'Honda Sensing',
            '6 airbags',
            'ABS',
            'VSA',
            'Hill start assist',
            'Auto brake hold'
        ],
        colors: ['Crystal Black', 'Platinum White', 'Modern Steel', 'Radiant Red'],
        isNew: true,
        isPopular: false,
        rating: 4.6,
        reviewCount: 67,
        stock: 8,
        year: 2024,
        condition: 'new',
        location: 'Đà Nẵng',
        dealer: 'Honda Vietnam',
        warranty: '3 năm/100,000 km',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-05'
    },
    {
        id: 'bmw-x5-m50i',
        slug: 'bmw-x5-m50i',
        name: 'BMW X5 M50i',
        brand: 'BMW',
        category: 'SUV',
        price: 4500000000,
        image: '/images/car.png',
        images: [
            '/images/car.png',
            '/images/hero.png'
        ],
        description: 'BMW X5 M50i với động cơ V8 TwinPower Turbo mạnh mẽ, thiết kế thể thao, nội thất xa xỉ và công nghệ iDrive 7.0 tiên tiến.',
        shortDescription: 'SUV cao cấp với động cơ V8, thiết kế thể thao, nội thất xa xỉ',
        fuelType: 'Xăng',
        transmission: 'Tự động 8 cấp',
        driveType: 'AWD',
        engine: '4.4L V8 TwinPower Turbo',
        power: '530 HP',
        torque: '750 Nm',
        acceleration: '4.1s (0-100km/h)',
        topSpeed: '250 km/h',
        fuelConsumption: '11.2L/100km',
        dimensions: {
            length: '4,922 mm',
            width: '2,004 mm',
            height: '1,745 mm',
            wheelbase: '2,975 mm'
        },
        weight: '2,245 kg',
        seating: 5,
        features: [
            'Laser headlights',
            'Panoramic sunroof',
            'iDrive 7.0',
            'Gesture control',
            'Wireless charging',
            'Harman Kardon sound',
            'Heated/cooled seats',
            'Head-up display'
        ],
        safety: [
            'BMW Driving Assistant Professional',
            '8 airbags',
            'ABS',
            'DSC',
            'Hill descent control',
            'Parking assistant'
        ],
        colors: ['Alpine White', 'Carbon Black', 'Tanzanite Blue', 'Arctic Grey'],
        isNew: false,
        isPopular: true,
        rating: 4.8,
        reviewCount: 156,
        stock: 5,
        year: 2023,
        condition: 'new',
        location: 'TP.HCM',
        dealer: 'BMW Vietnam',
        warranty: '3 năm/100,000 km',
        createdAt: '2023-12-20',
        updatedAt: '2023-12-20'
    },
    {
        id: 'mercedes-c-class-amg',
        slug: 'mercedes-c-class-amg',
        name: 'Mercedes C-Class AMG',
        brand: 'Mercedes-Benz',
        category: 'Sedan',
        price: 3200000000,
        image: '/images/hero.png',
        images: [
            '/images/hero.png',
            '/images/car.png'
        ],
        description: 'Mercedes C-Class AMG với động cơ AMG 2.0L Turbo, thiết kế thể thao, nội thất sang trọng và công nghệ MBUX tiên tiến.',
        shortDescription: 'Sedan thể thao AMG với động cơ turbo, thiết kế hiện đại',
        fuelType: 'Xăng',
        transmission: 'Tự động 9 cấp',
        driveType: 'RWD',
        engine: '2.0L AMG Turbo',
        power: '306 HP',
        torque: '400 Nm',
        acceleration: '4.9s (0-100km/h)',
        topSpeed: '250 km/h',
        fuelConsumption: '8.5L/100km',
        dimensions: {
            length: '4,751 mm',
            width: '1,821 mm',
            height: '1,437 mm',
            wheelbase: '2,865 mm'
        },
        weight: '1,735 kg',
        seating: 5,
        features: [
            'LED headlights',
            'Panoramic sunroof',
            'MBUX system',
            'Burmester sound',
            'Wireless charging',
            'Heated seats',
            'Head-up display',
            '360° camera'
        ],
        safety: [
            'Mercedes-Benz Driving Assistance Package',
            '7 airbags',
            'ABS',
            'ESP',
            'Attention assist',
            'Blind spot assist'
        ],
        colors: ['Polar White', 'Obsidian Black', 'Selenite Grey', 'Iridium Silver'],
        isNew: true,
        isPopular: false,
        rating: 4.7,
        reviewCount: 94,
        stock: 12,
        year: 2024,
        condition: 'new',
        location: 'Hà Nội',
        dealer: 'Mercedes-Benz Vietnam',
        warranty: '3 năm/100,000 km',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
    },
    {
        id: 'audi-a4-quattro',
        slug: 'audi-a4-quattro',
        name: 'Audi A4 Quattro',
        brand: 'Audi',
        category: 'Sedan',
        price: 2100000000,
        image: '/images/car.png',
        images: [
            '/images/car.png',
            '/images/hero.png'
        ],
        description: 'Audi A4 Quattro với hệ dẫn động quattro, động cơ 2.0L TFSI, thiết kế hiện đại và công nghệ Virtual Cockpit.',
        shortDescription: 'Sedan cao cấp với hệ dẫn động quattro, thiết kế hiện đại',
        fuelType: 'Xăng',
        transmission: 'Tự động 7 cấp',
        driveType: 'AWD',
        engine: '2.0L TFSI',
        power: '252 HP',
        torque: '370 Nm',
        acceleration: '5.8s (0-100km/h)',
        topSpeed: '250 km/h',
        fuelConsumption: '7.8L/100km',
        dimensions: {
            length: '4,763 mm',
            width: '1,847 mm',
            height: '1,431 mm',
            wheelbase: '2,820 mm'
        },
        weight: '1,645 kg',
        seating: 5,
        features: [
            'Matrix LED headlights',
            'Virtual Cockpit',
            'MMI Navigation plus',
            'Bang & Olufsen sound',
            'Wireless charging',
            'Heated seats',
            'Audi pre sense',
            'Parking system plus'
        ],
        safety: [
            'Audi pre sense',
            '6 airbags',
            'ABS',
            'ESP',
            'Quattro system',
            'Hill hold control'
        ],
        colors: ['Glacier White', 'Mythos Black', 'Daytona Grey', 'Tango Red'],
        isNew: false,
        isPopular: true,
        rating: 4.6,
        reviewCount: 78,
        stock: 7,
        year: 2023,
        condition: 'new',
        location: 'TP.HCM',
        dealer: 'Audi Vietnam',
        warranty: '3 năm/100,000 km',
        createdAt: '2023-11-15',
        updatedAt: '2023-11-15'
    },
    {
        id: 'lexus-es-hybrid',
        slug: 'lexus-es-hybrid',
        name: 'Lexus ES Hybrid',
        brand: 'Lexus',
        category: 'Sedan',
        price: 2800000000,
        image: '/images/hero.png',
        images: [
            '/images/hero.png',
            '/images/car.png'
        ],
        description: 'Lexus ES Hybrid với động cơ hybrid tiết kiệm nhiên liệu, thiết kế sang trọng, nội thất cao cấp và công nghệ Lexus Safety System+.',
        shortDescription: 'Sedan hybrid sang trọng, tiết kiệm nhiên liệu, nội thất cao cấp',
        fuelType: 'Hybrid',
        transmission: 'CVT',
        driveType: 'FWD',
        engine: '2.5L Hybrid',
        power: '215 HP',
        torque: '221 Nm',
        acceleration: '8.9s (0-100km/h)',
        topSpeed: '180 km/h',
        fuelConsumption: '4.5L/100km',
        dimensions: {
            length: '4,975 mm',
            width: '1,865 mm',
            height: '1,447 mm',
            wheelbase: '2,870 mm'
        },
        weight: '1,765 kg',
        seating: 5,
        features: [
            'LED headlights',
            'Panoramic sunroof',
            'Lexus Safety System+',
            'Mark Levinson sound',
            'Wireless charging',
            'Heated/cooled seats',
            'Head-up display',
            '360° camera'
        ],
        safety: [
            'Lexus Safety System+ 2.0',
            '10 airbags',
            'ABS',
            'VSC',
            'TRC',
            'Pre-collision system'
        ],
        colors: ['Celestial Blue', 'Sonic Chrome', 'Graphite Black', 'Sonic White'],
        isNew: true,
        isPopular: false,
        rating: 4.8,
        reviewCount: 112,
        stock: 9,
        year: 2024,
        condition: 'new',
        location: 'Hà Nội',
        dealer: 'Lexus Vietnam',
        warranty: '4 năm/100,000 km',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08'
    },
    {
        id: 'volkswagen-tiguan-r',
        slug: 'volkswagen-tiguan-r',
        name: 'Volkswagen Tiguan R',
        brand: 'Volkswagen',
        category: 'SUV',
        price: 1800000000,
        image: '/images/car.png',
        images: [
            '/images/car.png',
            '/images/hero.png'
        ],
        description: 'Volkswagen Tiguan R với động cơ 2.0L TSI mạnh mẽ, thiết kế thể thao R-Line, hệ dẫn động 4MOTION và công nghệ IQ.DRIVE.',
        shortDescription: 'SUV thể thao với động cơ turbo, thiết kế R-Line, hệ dẫn động 4MOTION',
        fuelType: 'Xăng',
        transmission: 'Tự động 7 cấp',
        driveType: 'AWD',
        engine: '2.0L TSI',
        power: '320 HP',
        torque: '420 Nm',
        acceleration: '4.9s (0-100km/h)',
        topSpeed: '250 km/h',
        fuelConsumption: '8.9L/100km',
        dimensions: {
            length: '4,509 mm',
            width: '1,859 mm',
            height: '1,680 mm',
            wheelbase: '2,680 mm'
        },
        weight: '1,735 kg',
        seating: 5,
        features: [
            'IQ.LIGHT LED headlights',
            'R-Line body kit',
            'Digital Cockpit',
            'Discover Pro navigation',
            'Wireless charging',
            'Heated seats',
            'IQ.DRIVE',
            'Travel Assist'
        ],
        safety: [
            'IQ.DRIVE',
            '7 airbags',
            'ABS',
            'ESP',
            '4MOTION',
            'Lane assist'
        ],
        colors: ['Lapiz Blue', 'Pure White', 'Reflex Silver', 'Deep Black'],
        isNew: true,
        isPopular: true,
        rating: 4.5,
        reviewCount: 56,
        stock: 6,
        year: 2024,
        condition: 'new',
        location: 'TP.HCM',
        dealer: 'Volkswagen Vietnam',
        warranty: '3 năm/100,000 km',
        createdAt: '2024-01-03',
        updatedAt: '2024-01-03'
    }
];

// Helper functions
export const getCarBySlug = (slug: string): Car | undefined => {
    return cars.find(car => car.slug === slug);
};

export const getCarsByBrand = (brand: string): Car[] => {
    return cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
};

export const getCarsByCategory = (category: string): Car[] => {
    return cars.filter(car => car.category.toLowerCase() === category.toLowerCase());
};

export const getPopularCars = (): Car[] => {
    return cars.filter(car => car.isPopular);
};

export const getNewCars = (): Car[] => {
    return cars.filter(car => car.isNew);
};

export const searchCars = (query: string): Car[] => {
    const lowercaseQuery = query.toLowerCase();
    return cars.filter(car =>
        car.name.toLowerCase().includes(lowercaseQuery) ||
        car.brand.toLowerCase().includes(lowercaseQuery) ||
        car.category.toLowerCase().includes(lowercaseQuery) ||
        car.description.toLowerCase().includes(lowercaseQuery)
    );
};

export const filterCars = (filters: {
    brand?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: string;
    transmission?: string;
    isNew?: boolean;
    isPopular?: boolean;
}): Car[] => {
    return cars.filter(car => {
        if (filters.brand && car.brand !== filters.brand) return false;
        if (filters.category && car.category !== filters.category) return false;
        if (filters.minPrice && car.price < filters.minPrice) return false;
        if (filters.maxPrice && car.price > filters.maxPrice) return false;
        if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
        if (filters.transmission && car.transmission !== filters.transmission) return false;
        if (filters.isNew !== undefined && car.isNew !== filters.isNew) return false;
        if (filters.isPopular !== undefined && car.isPopular !== filters.isPopular) return false;
        return true;
    });
}; 