const { Kafka } = require("kafkajs");

const kafka = new Kafka({ brokers: ["kafka:9092"] });
const consumer = kafka.consumer({ groupId: "inventory-service" });
const producer = kafka.producer();

(async () => {
  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({ topic: "payment_validated" });

  console.log("Inventory Service Running...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log("Checking inventory:", event);

      await producer.send({
        topic: "inventory_checked",
        messages: [
          { value: JSON.stringify({ orderId: event.orderId, stock: "AVAILABLE" }) }
        ]
      });

      console.log("Inventory Checked Event Published");
    }
  });
})();

