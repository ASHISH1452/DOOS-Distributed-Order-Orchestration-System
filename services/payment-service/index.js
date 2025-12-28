const { Kafka } = require("kafkajs");

const kafka = new Kafka({ brokers: ["kafka:9092"] });
const consumer = kafka.consumer({ groupId: "payment-service" });
const producer = kafka.producer();

(async () => {
  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({ topic: "order_created" });

  console.log("Payment Service Running...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      console.log("Validating payment:", order);

      await producer.send({
        topic: "payment_validated",
        messages: [
          { value: JSON.stringify({ orderId: order.orderId, payment: "VALID" }) }
        ]
      });

      console.log("Payment Validated Event Published");
    }
  });
})();

