/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(async (_, index) => {
      const hashedPassword = await bcrypt.hash("password123", 12);
      return prisma.user.create({
        data: {
          email: `user${index + 1}@example.com`,
          username: `user${index + 1}`,
          password: hashedPassword,
          firstName: `User${index + 1}`,
          lastName: `Example`,
          phone: `+84${Math.floor(Math.random() * 900000000) + 100000000}`,
          role: index === 0 ? "ADMIN" : "USER",
          isActive: true,
          isVerified: true,
        },
      });
    })
  );

  // Seed Dealers
  const dealers = await Promise.all(
    ["Toyota Center", "Honda Showroom", "BMW Premium", "Mercedes Luxury", "Audi Exclusive"].map((name, index) =>
      prisma.dealer.create({
        data: {
          name,
          email: `dealer${index + 1}@example.com`,
          phone: `+84${Math.floor(Math.random() * 900000000) + 100000000}`,
          address: `Address ${index + 1}, Ho Chi Minh City`,
          website: `https://dealer${index + 1}.com`,
          description: `Premium ${name} dealership`,
          isVerified: true,
        },
      })
    )
  );

  // Seed Categories
  const categories = await Promise.all(
    ["SUV", "Sedan", "Hatchback", "Electric", "Luxury"].map((name, index) =>
      prisma.category.create({
        data: {
          name,
          slug: name.toLowerCase(),
          description: `${name} category description`,
          icon: "🚗",
        },
      })
    )
  );

  // Seed Cars
  const carData = [
    {
      name: "Toyota Camry",
      brand: "Toyota",
      model: "Camry",
      year: 2023,
      price: 45000,
      fuelType: "HYBRID" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "FWD" as const,
      engineSize: 2.5,
      power: 208,
      color: "White",
      dealerId: dealers[0]?.id || "",
    },
    {
      name: "Honda CR-V",
      brand: "Honda",
      model: "CR-V",
      year: 2023,
      price: 38000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "AWD" as const,
      engineSize: 1.5,
      power: 190,
      color: "Blue",
      dealerId: dealers[1]?.id || "",
    },
    {
      name: "BMW X5",
      brand: "BMW",
      model: "X5",
      year: 2023,
      price: 75000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "AWD" as const,
      engineSize: 3.0,
      power: 335,
      color: "Black",
      dealerId: dealers[2]?.id || "",
    },
    {
      name: "Mercedes C-Class",
      brand: "Mercedes",
      model: "C-Class",
      year: 2023,
      price: 65000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "RWD" as const,
      engineSize: 2.0,
      power: 255,
      color: "Silver",
      dealerId: dealers[3]?.id || "",
    },
    {
      name: "Audi A4",
      brand: "Audi",
      model: "A4",
      year: 2023,
      price: 55000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "AWD" as const,
      engineSize: 2.0,
      power: 248,
      color: "Gray",
      dealerId: dealers[4]?.id || "",
    },
  ];

  const cars = await Promise.all(
    carData.map(async (carInfo, index) => {
      const slug = `${carInfo.brand.toLowerCase()}-${carInfo.model.toLowerCase()}-${carInfo.year}`;
      return prisma.car.create({
        data: {
          slug,
          ...carInfo,
          mileage: Math.floor(Math.random() * 50000) + 1000,
          condition: "NEW" as const,
          torque: Math.floor(carInfo.power * 1.2),
          seatingCapacity: 5,
          images: [`/images/car${index + 1}.jpg`],
          features: ["Bluetooth", "Backup Camera", "Navigation"],
          safetyFeatures: ["ABS", "Airbags", "Stability Control"],
          colors: [carInfo.color, "White", "Black"],
          stock: Math.floor(Math.random() * 5) + 1,
          isNew: true,
          isAvailable: true,
        },
      });
    })
  );

  // Assign Cars to Categories
  for (const car of cars) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];

    if (category) {
      await prisma.carCategory.create({
        data: {
          carId: car.id,
          categoryId: category.id,
        },
      });
    }
  }

  // Seed Reviews
  for (const user of users) {
    const carIndex = Math.floor(Math.random() * cars.length);
    const car = cars[carIndex];

    if (!car) continue;

    await prisma.review.create({
      data: {
        userId: user.id,
        carId: car.id,
        rating: Math.floor(Math.random() * 5) + 1,
        title: `Great ${car.brand} ${car.model}`,
        content: `This is an excellent car with great performance and comfort.`,
        images: [],
        pros: ["Comfortable", "Fuel Efficient", "Reliable"],
        cons: ["High maintenance cost"],
      },
    });
  }

  // Seed Favorites
  for (const user of users) {
    const carIndex = Math.floor(Math.random() * cars.length);
    const car = cars[carIndex];

    if (!car) continue;

    await prisma.favorite.create({
      data: {
        userId: user.id,
        carId: car.id,
      },
    });
  }

  console.log("✅ Database seeded successfully");
  console.log(`Created ${users.length} users`);
  console.log(`Created ${dealers.length} dealers`);
  console.log(`Created ${cars.length} cars`);
  console.log(`Created ${categories.length} categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
