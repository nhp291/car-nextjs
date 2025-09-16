/**
 * prisma/seed-full.ts
 *
 * Full seeding for the full schema (approx 49 tables).
 * Configurable via env:
 *   SEED_USERS, SEED_DEALERS, SEED_CARS, SEED_ORDERS, SEED_POSTS, SEED_CATEGORIES
 *
 * Run:
 *   DATABASE_URL="..." npx ts-node --transpile-only prisma/seed-full.ts
 *
 * WARNING: do NOT run on production.
 */

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
faker.seed(42);

// Config (override via env)
const NUM_USERS = Number(process.env.SEED_USERS ?? 250);
const NUM_DEALERS = Number(process.env.SEED_DEALERS ?? 20);
const NUM_CATEGORIES = Number(process.env.SEED_CATEGORIES ?? 8);
const NUM_CARS = Number(process.env.SEED_CARS ?? 400);
const LISTING_FACTOR = Number(process.env.SEED_LISTING_FACTOR ?? 1.1); // avg listings per car
const NUM_ORDERS = Number(process.env.SEED_ORDERS ?? 300);
const NUM_POSTS = Number(process.env.SEED_POSTS ?? 200);
const NUM_PLANS = Number(process.env.SEED_PLANS ?? 3);

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('SEED: start');

  // 0. cleanup? (optional) - commented out to avoid accidental deletes
  // await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE`;

  // 1) Roles & Permissions (RBAC)
  console.log('Creating roles & permissions...');
  const permissions = [
    'user:read', 'user:write', 'listing:read', 'listing:write', 'order:read', 'order:write', 'payment:read', 'payment:write',
  ];
  const permRecords: any[] = [];
  for (const p of permissions) {
    const rec = await prisma.permission.upsert({
      where: { name: p },
      update: {},
      create: { name: p, description: `${p} permission` },
    });
    permRecords.push(rec);
  }

  const roleAdmin = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin', description: 'Administrator' },
  });
  const roleSeller = await prisma.role.upsert({
    where: { name: 'seller' },
    update: {},
    create: { name: 'seller', description: 'Seller' },
  });
  const roleBuyer = await prisma.role.upsert({
    where: { name: 'buyer' },
    update: {},
    create: { name: 'buyer', description: 'Buyer' },
  });

  // Map some permissions to roles
  // Note: RolePermission is a join table: we use upsert patterns
  async function addRolePerm(roleId: string, permName: string) {
    const perm = permRecords.find((x) => x.name === permName);
    if (!perm) return;
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId, permissionId: perm.id } },
      update: {},
      create: { roleId, permissionId: perm.id },
    });
  }

  for (const perm of permRecords) {
    await addRolePerm(roleAdmin.id, perm.name);
  }
  // seller: listing write/read
  await addRolePerm(roleSeller.id, 'listing:read');
  await addRolePerm(roleSeller.id, 'listing:write');
  // buyer: order read/write
  await addRolePerm(roleBuyer.id, 'order:read');
  await addRolePerm(roleBuyer.id, 'order:write');

  // 2) Users
  console.log(`Creating ${NUM_USERS} users...`);
  const users: any[] = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const email = `user${i}_${faker.internet.email().toLowerCase()}`;
    const u = await prisma.user.create({
      data: {
        email,
        username: `u${i}_${faker.internet.username().toLowerCase()}`,
        password: 'password',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.helpers.replaceSymbols('+84 9## ### ###'),
        isVerified: faker.datatype.boolean(),
      },
    });
    users.push(u);
    // assign simple roles (first user admin, next bunch sellers)
    if (i === 0) {
      await prisma.userRole.create({ data: { userId: u.id, roleId: roleAdmin.id } });
    } else if (i <= Math.max(2, Math.floor(NUM_USERS * 0.08))) {
      await prisma.userRole.create({ data: { userId: u.id, roleId: roleSeller.id } });
    } else {
      await prisma.userRole.create({ data: { userId: u.id, roleId: roleBuyer.id } });
    }
  }

  // 3) Dealers
  console.log(`Creating ${NUM_DEALERS} dealers...`);
  const dealers: any[] = [];
  for (let i = 0; i < NUM_DEALERS; i++) {
    const d = await prisma.dealer.create({
      data: {
        name: faker.company.name() + ' Auto',
        email: `dealer${i}@example.com`,
        phone: faker.helpers.replaceSymbols('+84 9## ### ###'),
        address: faker.location.streetAddress(),
        website: faker.internet.url(),
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        isVerified: faker.datatype.boolean(),
      },
    });
    dealers.push(d);
  }

  // 4) Categories
  console.log(`Creating ${NUM_CATEGORIES} categories...`);
  const catNames = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pickup', 'Electric', 'Luxury', 'Compact'];
  const categories: any[] = [];
  for (let i = 0; i < NUM_CATEGORIES; i++) {
    const name = catNames[i] ?? faker.vehicle.type();
    const c = await prisma.category.create({
      data: { name, slug: faker.helpers.slugify(name).toLowerCase(), description: faker.lorem.sentence() },
    });
    categories.push(c);
  }

  // 5) Plans
  console.log(`Creating ${NUM_PLANS} plans...`);
  const plans: any[] = [];
  for (let i = 0; i < NUM_PLANS; i++) {
    const name = i === 0 ? 'Free' : i === 1 ? 'Pro' : 'Enterprise';
    const p = await prisma.plan.create({
      data: { name, price: i === 0 ? 0 : i === 1 ? 1000000 : 5000000, features: i === 0 ? ['basic'] : ['priority-listing', 'analytics'] },
    });
    plans.push(p);
  }

  // 6) Cars (master)
  console.log(`Creating ${NUM_CARS} cars...`);
  const cars: any[] = [];
  for (let i = 0; i < NUM_CARS; i++) {
    const brand = faker.vehicle.manufacturer();
    const model = faker.vehicle.model();
    const year = randInt(2008, 2024);
    const price = randInt(300_000_000, 3_000_000_000);
    const car = await prisma.car.create({
      data: {
        slug: `${faker.helpers.slugify(brand + ' ' + model + ' ' + year)}-${i}`.toLowerCase(),
        name: `${brand} ${model} ${year}`,
        brand,
        model,
        year,
        price,
        originalPrice: Math.random() < 0.5 ? price + randInt(5_000_000, 200_000_000) : null,
        mileage: randInt(0, 200_000),
        condition: pick(['NEW', 'USED', 'CERTIFIED']),
        fuelType: pick(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUG_IN_HYBRID']),
        transmission: pick(['MANUAL', 'AUTOMATIC', 'CVT', 'SEMI_AUTOMATIC']),
        driveType: pick(['FWD', 'RWD', 'AWD', 'FOUR_WHEEL_DRIVE']),
        engineSize: Number((Math.random() * 3 + 1).toFixed(1)),
        power: randInt(70, 450),
        torque: randInt(100, 600),
        acceleration: Number((Math.random() * 5 + 4).toFixed(1)),
        topSpeed: randInt(140, 330),
        fuelConsumption: Number((Math.random() * 10 + 4).toFixed(1)),
        color: pick(['Black', 'White', 'Silver', 'Red', 'Blue']),
        description: faker.lorem.paragraph(),
        images: [faker.image.urlPicsumPhotos({ width: 640, height: 480 })],
        videos: [],
        virtualTourUrl: null,
        features: ['ABS', 'Air Conditioning', 'Bluetooth', 'Cruise Control'],
        safetyFeatures: ['Airbag', 'ABS'],
        colors: ['Black', 'White', 'Silver'],
        isAvailable: true,
        isNew: Math.random() < 0.2,
        stock: randInt(0, 10),
        dealerId: Math.random() < 0.6 ? pick(dealers).id : null,
        warranty: Math.random() < 0.5 ? '12 months' : null,
        keywords: [brand.toLowerCase(), model.toLowerCase()],
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        reviewCount: randInt(0, 200),
        viewCount: randInt(0, 5000),
        favoriteCount: randInt(0, 1000),
      },
    });
    cars.push(car);
  }

  // 7) PriceHistory (per car)
  console.log('Creating price history for a subset of cars...');
  for (const car of cars.slice(0, Math.max(50, Math.floor(NUM_CARS * 0.1)))) {
    const entries = randInt(1, 6);
    for (let j = 0; j < entries; j++) {
      await prisma.priceHistory.create({
        data: {
          carId: car.id,
          price: Number(car.price) - randInt(0, 50_000_000),
          reason: pick(['INITIAL', 'PROMOTION', 'MARKET_ADJUSTMENT', 'SEASONAL']),
        },
      });
    }
  }

  // 8) CarCategory mapping
  console.log('Mapping cars to categories...');
  for (const car of cars) {
    const c = pick(categories);
    await prisma.carCategory.create({ data: { carId: car.id, categoryId: c.id } });
    // sometimes add second category
    if (Math.random() < 0.15) {
      const c2 = pick(categories);
      if (c2.id !== c.id) {
        try {
          await prisma.carCategory.create({ data: { carId: car.id, categoryId: c2.id } });
        } catch { /* ignore dupes */ }
      }
    }
  }

  // 9) Listings
  console.log('Creating listings...');
  const totalListings = Math.floor(NUM_CARS * LISTING_FACTOR);
  const listings: any[] = [];
  for (let i = 0; i < totalListings; i++) {
    const car = pick(cars);
    const byDealer = Math.random() < 0.25;
    const sellerUser = pick(users);
    const sellerId = byDealer ? null : sellerUser.id;
    const l = await prisma.listing.create({
      data: {
        carId: car.id,
        sellerId,
        price: Math.max(Number(car.price) * (0.85 + Math.random() * 0.3), 10_000_000),
        currency: 'VND',
        status: pick(['ACTIVE', 'DRAFT', 'UNDER_OFFER']),
        isFeatured: Math.random() < 0.05,
        featuredUntil: Math.random() < 0.05 ? faker.date.soon({ days: 30 }) : null,
        location: faker.location.city(),
        mileage: car.mileage,
        vin: faker.vehicle.vin(),
        views: randInt(0, 1000),
        version: 1,
        createdBy: sellerUser.id,
        updatedBy: sellerUser.id,
      }
    });
    listings.push(l);
  }

  // 10) Offers, TestDrives, Inquiries, Favorites, CarLikes
  console.log('Creating offers, testdrives, inquiries, favorites, likes...');
  for (let i = 0; i < Math.floor(listings.length * 0.5); i++) {
    const listing = pick(listings);
    const buyer = pick(users);
    // Offer
    await prisma.offer.create({
      data: {
        listingId: listing.id,
        buyerId: buyer.id,
        amount: Math.max(Number(listing.price) - randInt(0, 50_000_000), 10_000_000),
        currency: listing.currency,
        status: pick(['PENDING', 'REJECTED', 'ACCEPTED']),
        message: faker.lorem.sentence(),
      }
    });

    // TestDrive (30%)
    if (Math.random() < 0.3) {
      await prisma.testDrive.create({
        data: {
          carId: listing.carId,
          userId: buyer.id,
          dealerId: pick(dealers).id,
          status: pick(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
          scheduledAt: faker.date.soon({ days: randInt(1, 21) }),
        }
      });
    }

    // Inquiry (40%)
    if (Math.random() < 0.4) {
      await prisma.inquiry.create({
        data: {
          carId: listing.carId,
          userId: buyer.id,
          dealerId: pick(dealers).id,
          type: pick(['GENERAL', 'PRICING', 'FINANCING', 'TRADE_IN', 'WARRANTY']),
          status: pick(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
          message: faker.lorem.sentences(2),
        }
      });
    }

    // Favorite & CarLike (50%)
    if (Math.random() < 0.5) {
      try {
        await prisma.favorite.create({ data: { userId: buyer.id, carId: listing.carId } });
      } catch { }
      try {
        await prisma.carLike.create({ data: { userId: buyer.id, carId: listing.carId } });
      } catch { }
    }
  }

  // 11) Posts, Comments, PostLikes
  console.log(`Creating ${NUM_POSTS} posts, comments and postLikes...`);
  const posts: any[] = [];
  for (let i = 0; i < NUM_POSTS; i++) {
    const author = pick(users);
    const car = pick(cars);
    const p = await prisma.post.create({
      data: {
        userId: author.id,
        carId: car.id,
        title: faker.lorem.sentence(6),
        content: faker.lorem.paragraphs(1),
        images: [],
        tags: [faker.lorem.word()],
        isPublic: true,
      }
    });
    posts.push(p);

    // comments
    const commentCount = randInt(0, 3);
    for (let c = 0; c < commentCount; c++) {
      await prisma.comment.create({
        data: {
          userId: pick(users).id,
          postId: p.id,
          content: faker.lorem.sentence(),
        }
      });
    }

    // likes
    if (Math.random() < 0.6) {
      try {
        await prisma.postLike.create({ data: { userId: pick(users).id, postId: p.id } });
      } catch { }
    }
  }

  // 12) Reviews
  console.log('Creating reviews...');
  for (let i = 0; i < Math.floor(NUM_CARS * 0.6); i++) {
    const user = pick(users);
    const car = pick(cars);
    try {
      await prisma.review.create({
        data: {
          userId: user.id,
          carId: car.id,
          rating: randInt(1, 5),
          title: faker.lorem.words(4),
          content: faker.lorem.sentences(2),
          images: [],
          pros: ['Good value'],
          cons: ['Minor scratch'],
          isVerified: Math.random() < 0.4,
        }
      });
    } catch { }
  }

  // 13) Orders + Payments + Escrow + Invoice + Commission + Payout + PaymentRefund
  console.log(`Creating ${NUM_ORDERS} orders and payment flows...`);
  const orders: any[] = [];
  for (let i = 0; i < NUM_ORDERS; i++) {
    const buyer = pick(users);
    const listing = pick(listings);
    const sellerId = listing.sellerId ?? pick(users).id;
    const total = Number(listing.price);
    const deposit = Math.floor(total * 0.1);
    const order = await prisma.order.create({
      data: {
        buyerId: buyer.id,
        sellerId,
        listingId: listing.id,
        status: pick(['PENDING', 'CONFIRMED', 'PAID', 'COMPLETED']),
        totalAmount: total,
        currency: listing.currency,
        depositAmount: deposit,
        commissionPct: 2.5,
        notes: faker.lorem.sentence(),
        items: { create: [{ listingId: listing.id, unitPrice: total, quantity: 1, description: listing.carId }] },
      }
    });
    orders.push(order);

    // escrow
    const escrow = await prisma.escrow.create({ data: { orderId: order.id, heldAmount: deposit } });

    // payment
    const paymentStatus = pick(['SUCCEEDED', 'PROCESSING', 'FAILED']);
    const payment = await prisma.payment.create({
      data: {
        userId: buyer.id,
        orderId: order.id,
        escrowId: escrow.id,
        amount: deposit,
        currency: 'VND',
        status: paymentStatus === 'SUCCEEDED' ? 'SUCCEEDED' : (paymentStatus === 'PROCESSING' ? 'PROCESSING' : 'FAILED'),
        provider: pick(['vnpay', 'stripe', 'zalo']),
        providerPaymentId: `tx_${faker.string.uuid()}`,
        idempotencyKey: `seed-${i}-${Date.now()}`,
      }
    });

    // maybe refund (10%)
    if (Math.random() < 0.1) {
      await prisma.paymentRefund.create({
        data: {
          paymentId: payment.id,
          providerRefundId: `r_${faker.string.uuid()}`,
          amount: Math.floor(deposit * 0.5),
          status: pick(['PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED']),
          reason: 'customer_cancel',
        }
      });
    }

    // invoice
    await prisma.invoice.create({ data: { orderId: order.id, amount: order.totalAmount } });

    // commission & payout
    const totalNum = Number(order.totalAmount);
    const commissionAmount = (totalNum * 2.5) / 100;
    await prisma.commission.create({ data: { orderId: order.id, percent: 2.5, amount: commissionAmount } });
    await prisma.payout.create({ data: { sellerId, amount: totalNum - commissionAmount } });
  }

  // 14) LedgerEntry & OutboxEvent
  console.log('Creating ledger entries and outbox events...');
  for (let i = 0; i < 200; i++) {
    await prisma.ledgerEntry.create({
      data: {
        referenceId: faker.string.uuid(),
        type: pick(['PAYMENT_CAPTURE', 'PAYMENT_REFUND', 'FEE', 'SETTLEMENT']),
        amount: randInt(10_000, 5_000_000),
        currency: 'VND',
        meta: { note: faker.lorem.sentence() },
      }
    });
    await prisma.outboxEvent.create({
      data: {
        aggregate: pick(['Order', 'Payment', 'Listing']),
        aggregateId: faker.string.uuid(),
        type: pick(['OrderCreated', 'PaymentSucceeded', 'ListingUpdated']),
        payload: { example: true, id: faker.string.uuid() },
      }
    });
  }

  // 15) Sessions
  console.log('Creating sessions...');
  for (const u of users.slice(0, Math.min(users.length, 80))) {
    await prisma.session.create({
      data: {
        userId: u.id,
        token: faker.string.uuid(),
        expiresAt: faker.date.soon({ days: 30 }),
      }
    });
  }

  // 16) Notifications
  console.log('Creating notifications...');
  for (let i = 0; i < Math.floor(NUM_USERS * 0.4); i++) {
    const u = pick(users);
    await prisma.notification.create({
      data: {
        userId: u.id,
        type: pick(['PRICE_DROP', 'NEW_CAR_MATCH', 'TEST_DRIVE_REMINDER', 'INQUIRY_RESPONSE', 'REVIEW_REPLY', 'FOLLOW', 'LIKE', 'COMMENT']),
        title: faker.lorem.sentence(4),
        message: faker.lorem.sentences(2),
      }
    });
  }

  // 17) Files
  console.log('Creating file records...');
  for (let i = 0; i < 150; i++) {
    const owner = pick(users);
    await prisma.file.create({
      data: {
        ownerId: owner.id,
        ownerType: pick(['user', 'listing', 'car']),
        url: faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
        name: `file_${i}.jpg`,
        mimeType: 'image/jpeg',
        size: randInt(10_000, 2_000_000),
        listingId: Math.random() < 0.5 ? pick(listings).id : null,
      }
    });
  }

  // 18) Plans/Subscriptions/BillingRecords
  console.log('Subscribing some users to plans and billing records...');
  for (let i = 0; i < Math.floor(users.length * 0.08); i++) {
    const u = pick(users);
    const plan = pick(plans);
    await prisma.subscription.create({ data: { userId: u.id, planId: plan.id, status: pick(['ACTIVE', 'PAST_DUE', 'CANCELLED']), startedAt: faker.date.past({ years: 1 }) } });
    await prisma.billingRecord.create({ data: { userId: u.id, type: 'subscription', amount: plan.price, metadata: { plan: plan.name } } });
  }

  // 19) Follow (social)
  console.log('Creating follow relationships...');
  for (let i = 0; i < Math.floor(NUM_USERS * 0.3); i++) {
    const a = pick(users);
    let b = pick(users);
    if (a.id === b.id) b = pick(users);
    try {
      await prisma.follow.create({ data: { followerId: a.id, followingId: b.id } });
    } catch { }
  }

  // 20) Comparison + ComparisonItem
  console.log('Creating comparisons...');
  for (let i = 0; i < Math.floor(NUM_USERS * 0.08); i++) {
    const u = pick(users);
    const cmp = await prisma.comparison.create({ data: { userId: u.id, name: `Compare ${u.username}`, isPublic: Math.random() < 0.2 } });
    const howMany = randInt(2, 6);
    for (let j = 0; j < howMany; j++) {
      const car = pick(cars);
      try { await prisma.comparisonItem.create({ data: { comparisonId: cmp.id, carId: car.id, order: j } }); } catch { }
    }
  }

  // 21) ChatRoom, ChatParticipant, Message
  console.log('Creating chat rooms and messages...');
  for (let i = 0; i < Math.floor(NUM_USERS * 0.06); i++) {
    const room = await prisma.chatRoom.create({ data: { name: `room-${i}`, isGroup: Math.random() < 0.3 } });
    // add 2-4 participants
    const participants = new Set<string>();
    const pcount = randInt(2, Math.min(6, users.length));
    for (let p = 0; p < pcount; p++) participants.add(pick(users).id);
    for (const uid of Array.from(participants)) {
      await prisma.chatParticipant.create({ data: { chatId: room.id, userId: uid, role: pick(['MEMBER', 'ADMIN']) } });
    }
    // messages
    const msgCount = randInt(1, 8);
    for (let m = 0; m < msgCount; m++) {
      await prisma.message.create({
        data: {
          chatId: room.id,
          senderId: pick(users).id,
          content: faker.lorem.sentences(1),
          type: 'TEXT',
        }
      });
    }
  }

  // 22) Bot, BotConversation, BotMessage, BotMemory, KnowledgeBase
  console.log('Creating bots and knowledge base...');
  const bots: any[] = [];
  for (let i = 0; i < 6; i++) {
    const b = await prisma.bot.create({ data: { name: `bot-${i}`, description: faker.lorem.sentence() } });
    bots.push(b);
    // create bot conversations
    for (let c = 0; c < 3; c++) {
      const user = pick(users);
      const conv = await prisma.botConversation.create({ data: { userId: user.id, botId: b.id } });
      await prisma.botMessage.create({ data: { conversationId: conv.id, sender: 'bot', content: 'Hello from bot' } });
      await prisma.botMemory.create({ data: { conversationId: conv.id, content: faker.lorem.sentence() } });
    }
  }

  for (let i = 0; i < 60; i++) {
    await prisma.knowledgeBase.create({ data: { question: faker.lorem.sentence(), answer: faker.lorem.paragraph(), tags: [faker.lorem.word()] } });
  }

  // 23) Misc small tables: PaymentRefunds already created sometimes; ensure some exist
  // (we created some during payments)

  // 24) Final sprinkling: make sure every major table has at least some rows
  console.log('Final touches & summary fetch...');

  // Summarize counts
  const summary: Record<string, number> = {
    users: await prisma.user.count(),
    dealers: await prisma.dealer.count(),
    cars: await prisma.car.count(),
    listings: await prisma.listing.count(),
    offers: await prisma.offer.count(),
    testDrives: await prisma.testDrive.count(),
    inquiries: await prisma.inquiry.count(),
    favorites: await prisma.favorite.count(),
    carLikes: await prisma.carLike.count(),
    posts: await prisma.post.count(),
    comments: await prisma.comment.count(),
    postLikes: await prisma.postLike.count(),
    reviews: await prisma.review.count(),
    orders: await prisma.order.count(),
    payments: await prisma.payment.count(),
    escrows: await prisma.escrow.count(),
    invoices: await prisma.invoice.count(),
    commissions: await prisma.commission.count(),
    payouts: await prisma.payout.count(),
    subscriptions: await prisma.subscription.count(),
    billingRecords: await prisma.billingRecord.count(),
    sessions: await prisma.session.count(),
    notifications: await prisma.notification.count(),
    files: await prisma.file.count(),
    plans: await prisma.plan.count(),
    categories: await prisma.category.count(),
    carCategories: await prisma.carCategory.count(),
    comparisons: await prisma.comparison.count(),
    comparisonItems: await prisma.comparisonItem.count(),
    chatRooms: await prisma.chatRoom.count(),
    messages: await prisma.message.count(),
    botConversations: await prisma.botConversation.count(),
    botMessages: await prisma.botMessage.count(),
    knowledgeBase: await prisma.knowledgeBase.count(),
    ledgerEntries: await prisma.ledgerEntry.count(),
    outboxEvents: await prisma.outboxEvent.count(),
  };

  console.log('=== SEED SUMMARY ===');
  for (const [k, v] of Object.entries(summary)) {
    console.log(`${k}: ${v}`);
  }
  console.log('SEED: completed');
}

main()
  .catch((e) => {
    console.error('SEED ERROR:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
