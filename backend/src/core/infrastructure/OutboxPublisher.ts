// worker reading outbox events and publish to broker

import { prisma } from "@/config/prisma";


export async function publishOutbox() {
    const events = await prisma.outboxEvent.findMany({ where: { processed: false }, take: 50 });
    for (const e of events) {
        try {
            // send to broker (Kafka/RabbitMQ)
            // await broker.publish(e.type, e.payload)
            await prisma.outboxEvent.update({ where: { id: e.id }, data: { processed: true, processedAt: new Date() } });
        } catch (err) {
            // increment retryCount, log
        }
    }
}