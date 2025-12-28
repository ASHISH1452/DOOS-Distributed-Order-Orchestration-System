const { Kafka } = require("kafkajs");
const Redis = require("ioredis");

const kafka = new Kafka({ brokers: ["kafka:9092"] });
const redis = new Redis({ host: "redis", port: 6379 });
const consumer = kafka.consumer({ groupId: "order-service" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "order_created" });

  console.log("Order Service Running...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      console.log("Order Received:", order);

      await redis.xadd("order_stream", "*", "order", JSON.stringify(order));
      console.log("Pushed to Redis Stream");
    }
  });
})();

