/// <reference types="node" />
import { PrismaClient, Prisma } from "@prisma/client";
import type { 
  User, 
  Dealer, 
  Category, 
  Car,
  ChatRoom,
  ChatParticipant,
  Message,
  Follow,
  Post,
  Comment,
  Like,
  Notification,
  PriceHistory,
  Review,
  Session,
  TestDrive,
  Inquiry,
  KnowledgeBase
} from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// ============= Users =============
async function seedUsers(): Promise<User[]> {
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
  return users;
}

// ============= Dealers =============
async function seedDealers(): Promise<Dealer[]> {
  const dealers = await Promise.all(
    [
      "Toyota Center",
      "Honda Showroom",
      "BMW Premium",
      "Mercedes Luxury",
      "Audi Exclusive",
    ].map((name, index) =>
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
  return dealers;
}

// ============= Categories =============
async function seedCategories(): Promise<Category[]> {
  const categories = await Promise.all(
    ["SUV", "Sedan", "Hatchback", "Electric", "Luxury"].map((name) =>
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
  return categories;
}

// ============= Cars =============
async function seedCars(dealers: Pick<Dealer, "id">[]): Promise<Car[]> {
  const carData = [
    {
      name: "Toyota Camry",
      brand: "Toyota",
      model: "Camry",
      year: 2023,
      price: new Prisma.Decimal("45000.00"),
      originalPrice: new Prisma.Decimal("47000.00"),
      fuelType: "HYBRID" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "FWD" as const,
      engineSize: new Prisma.Decimal("2.5"),
      power: 208,
      torque: 250,
      acceleration: new Prisma.Decimal("7.5"),
      topSpeed: 180,
      fuelConsumption: new Prisma.Decimal("5.5"),
      color: "White",
      dealerId: dealers[0]?.id,
      length: 4885,
      width: 1840,
      height: 1445,
      wheelbase: 2825,
      weight: 1580,
      description: "The Toyota Camry is a sophisticated and comfortable sedan",
      shortDescription: "Elegant mid-size sedan with hybrid powertrain",
      metaTitle: "2023 Toyota Camry Hybrid - Modern Family Sedan",
      metaDescription: "Discover the 2023 Toyota Camry Hybrid - the perfect blend of comfort, efficiency and style",
    },
    {
      name: "Honda CR-V",
      brand: "Honda",
      model: "CR-V",
      year: 2023,
      price: new Prisma.Decimal("38000.00"),
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "AWD" as const,
      engineSize: new Prisma.Decimal("1.5"),
      power: 190,
      color: "Blue",
      dealerId: dealers[1]?.id ?? "",
    },
    {
      name: "BMW X5",
      brand: "BMW",
      model: "X5",
      year: 2023,
      price: new Prisma.Decimal("75000.00"),
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "AWD" as const,
      engineSize: new Prisma.Decimal("3.0"),
      power: 335,
      color: "Black",
      dealerId: dealers[2]?.id ?? "",
    },
    {
      name: "Mercedes C-Class",
      brand: "Mercedes",
      model: "C-Class",
      year: 2023,
      price: new Prisma.Decimal("65000.00"),
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "RWD" as const,
      engineSize: new Prisma.Decimal("2.0"),
      power: 255,
      color: "Silver",
      dealerId: dealers[3]?.id ?? "",
    },
    {
      name: "Audi A4",
      brand: "Audi",
      model: "A4",
      year: 2023,
      price: new Prisma.Decimal("55000.00"),
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      driveType: "AWD" as const,
      engineSize: new Prisma.Decimal("2.0"),
      power: 248,
      color: "Gray",
      dealerId: dealers[4]?.id ?? "",
    },
  ];

  const cars = await Promise.all(
    carData.map(async (carInfo) => {
      const slug = `${carInfo.brand}-${carInfo.model}-${carInfo.year}`
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return prisma.car.create({
        data: {
          slug,
          ...carInfo,
          mileage: Math.floor(Math.random() * 50000) + 1000,
          condition: "NEW",
          torque: Math.floor(carInfo.power * 1.2),
          seatingCapacity: 5,
          images: [`/images/${slug}.jpg`],
          videos: [],
          features: ["Bluetooth", "Backup Camera", "Navigation"],
          safetyFeatures: ["ABS", "Airbags", "Stability Control"],
          colors: [carInfo.color, "White", "Black"],
          stock: Math.floor(Math.random() * 5) + 1,
          isNew: true,
          isAvailable: true,
          keywords: [],
        },
      });
    })
  );

  return cars; // => Car[]
}

// ============= Car-Category link =============
async function linkCarCategories(
  cars: Pick<Car, "id">[],
  categories: Pick<Category, "id">[]
): Promise<void> {
  for (const car of cars) {
    const shuffled = [...categories]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    for (const cat of shuffled) {
      await prisma.carCategory.upsert({
        where: { carId_categoryId: { carId: car.id, categoryId: cat.id } },
        create: { carId: car.id, categoryId: cat.id },
        update: {},
      });
    }
  }
}

// ============= Reviews + Favorites =============
async function seedReviewsAndFavorites(
  users: Pick<User, "id">[],
  cars: Pick<Car, "id" | "brand" | "model" | "price">[]
): Promise<void> {
  for (const user of users) {
    const car = cars[Math.floor(Math.random() * cars.length)];

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

    await prisma.favorite.upsert({
      where: { userId_carId: { userId: user.id, carId: car.id } },
      create: { userId: user.id, carId: car.id },
      update: {},
    });
  }
}

// ============= Price History =============
async function seedPriceHistory(
  cars: Pick<Car, "id" | "price">[]
): Promise<void> {
  for (const car of cars) {
    const current = new Prisma.Decimal(car.price).toNumber();
    const older = (current * 1.05).toFixed(2);
    await prisma.priceHistory.createMany({
      data: [
        {
          carId: car.id,
          price: older,
          reason: "INITIAL",
        },
        {
          carId: car.id,
          price: current.toFixed(2),
          reason: "PROMOTION",
        },
      ],
    });
  }
}

// ============= Social (follow, post, comment, like) =============
async function seedSocial(
  users: Pick<User, "id">[],
  cars: Pick<Car, "id">[]
): Promise<void> {
  if (users.length >= 3) {
    await prisma.follow.createMany({
      data: [
        { followerId: users[1].id, followingId: users[0].id },
        { followerId: users[2].id, followingId: users[0].id },
      ],
      skipDuplicates: true,
    });
  }

  for (const u of users) {
    const c = cars[Math.floor(Math.random() * cars.length)];
    const post = await prisma.post.create({
      data: {
        userId: u.id,
        carId: c.id,
        title: "Trải nghiệm xe",
        content: "Xe chạy êm, tiết kiệm nhiên liệu.",
        images: [],
        tags: ["review"],
      },
    });

    await prisma.comment.create({
      data: {
        userId: users[0].id,
        postId: post.id,
        content: "Cảm ơn bạn đã chia sẻ!",
      },
    });

    await prisma.like.create({ data: { userId: u.id, postId: post.id } });
  }
}

// ============= Chat =============
async function seedChat(users: Pick<User, "id">[]): Promise<void> {
  const room = await prisma.chatRoom.create({
    data: {
      name: "Support Chat",
      isGroup: false,
      participants: {
        create: [
          { userId: users[0].id, role: "ADMIN" },
          { userId: users[1].id, role: "MEMBER" },
        ],
      },
    },
  });

  await prisma.message.createMany({
    data: [
      {
        chatId: room.id,
        senderId: users[0].id,
        content: "Xin chào...",
        type: "TEXT",
      },
      {
        chatId: room.id,
        senderId: users[1].id,
        content: "Giá Camry...",
        type: "TEXT",
      },
    ],
  });
}

// ============= Knowledge Base (seed cứng) =============
async function seedKnowledgeBase(): Promise<void> {
  await Promise.all([
    prisma.knowledgeBase.create({
      data: {
        question: "Giá Toyota Camry 2023 là bao nhiêu?",
        answer: "Khoảng 1,2 tỷ VNĐ (tham khảo).",
        tags: ["pricing", "camry"],
        source: "seed",
      },
    }),
    prisma.knowledgeBase.create({
      data: {
        question: "CR-V bảo hành thế nào?",
        answer: "3 năm hoặc 100.000 km tùy điều kiện.",
        tags: ["warranty", "cr-v"],
        source: "seed",
      },
    }),
  ]);
}

// ============= Knowledge Base (import Excel nếu có) =============
async function importKnowledgeBaseFromExcel(): Promise<void> {
  const filePath = path.resolve(process.cwd(), "prisma/knowledge_base.xlsx");
  if (!fs.existsSync(filePath)) {
    console.log(
      "ℹ️  Không thấy file knowledge_base.xlsx, bỏ qua import Excel."
    );
    return;
  }
  const { default: XLSX } = await import("xlsx");
  const wb = XLSX.readFile(filePath);
  const sheet = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

  let imported = 0;
  for (const row of sheet as any[]) {
    const q = row["Question"] ?? row["question"];
    const a = row["Answer"] ?? row["answer"];
    const tagsRaw = row["Tags"] ?? row["tags"] ?? "";
    const tags = String(tagsRaw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (q && a) {
      await prisma.knowledgeBase.create({
        data: { question: String(q), answer: String(a), tags, source: "excel" },
      });
      imported++;
    }
  }
  console.log(`✅ Import Excel KB: ${imported} dòng`);
}

// ============= Sessions =============
async function seedSessions(users: Pick<User, "id">[]): Promise<void> {
  for (const user of users) {
    await prisma.session.create({
      data: {
        userId: user.id,
        token: `session-${user.id}-${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
      },
    });
  }
}

// ============= Notifications =============
async function seedNotifications(users: Pick<User, "id">[]): Promise<void> {
  for (const user of users) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: "FOLLOW",
        title: "Chào mừng bạn!",
        message: "Cảm ơn bạn đã tham gia hệ thống 🚀",
      },
    });
  }
}

// ============= Inquiries + TestDrives =============
async function seedInquiriesAndTestDrives(
  users: Pick<User, "id">[],
  cars: Pick<Car, "id" | "dealerId">[]
): Promise<void> {
  for (const u of users) {
    const car = cars[Math.floor(Math.random() * cars.length)];

    await prisma.inquiry.create({
      data: {
        userId: u.id,
        carId: car.id,
        dealerId: car.dealerId ?? null,
        type: "PRICING",
        subject: "Hỏi giá xe",
        message: "Xin báo giá chi tiết cho xe này?",
      },
    });

    await prisma.testDrive.create({
      data: {
        userId: u.id,
        carId: car.id,
        dealerId: car.dealerId ?? null,
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 ngày sau
        status: "PENDING",
      },
    });
  }
}

// ============= MAIN =============
async function main() {
  try {
    // Xóa dữ liệu cũ
    await prisma.$transaction([
      prisma.session.deleteMany(),
      prisma.notification.deleteMany(),
      prisma.message.deleteMany(),
      prisma.chatParticipant.deleteMany(),
      prisma.chatRoom.deleteMany(),
      prisma.like.deleteMany(),
      prisma.comment.deleteMany(),
      prisma.post.deleteMany(),
      prisma.follow.deleteMany(),
      prisma.priceHistory.deleteMany(),
      prisma.review.deleteMany(),
      prisma.favorite.deleteMany(),
      prisma.testDrive.deleteMany(),
      prisma.inquiry.deleteMany(),
      prisma.carCategory.deleteMany(),
      prisma.car.deleteMany(),
      prisma.category.deleteMany(),
      prisma.dealer.deleteMany(),
      prisma.user.deleteMany(),
    ]);

    // Không cần reset sequences vì Prisma sẽ tự quản lý

    // Seed dữ liệu mới
    const users = await seedUsers();
    const dealers = await seedDealers();
    const categories = await seedCategories();
    const cars = await seedCars(dealers);

    await linkCarCategories(cars, categories);
    await seedPriceHistory(cars);
    await seedReviewsAndFavorites(users, cars);
    await seedSocial(users, cars);
    await seedChat(users);
    await seedKnowledgeBase();
    await importKnowledgeBaseFromExcel();
    await seedSessions(users);
    await seedNotifications(users);
    await seedInquiriesAndTestDrives(users, cars);

    console.log("✅ Database seeded successfully");
    console.log(`Created ${users.length} users`);
    console.log(`Created ${dealers.length} dealers`);
    console.log(`Created ${cars.length} cars`);
    console.log(`Created ${categories.length} categories`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
