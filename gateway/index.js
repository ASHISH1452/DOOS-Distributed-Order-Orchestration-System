const express = require("express");
const { Kafka } = require("kafkajs");

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: "gateway",
  brokers: ["kafka:9092"]
});

const producer = kafka.producer();

app.post("/order", async (req, res) => {
  const order = req.body;

  await producer.connect();
  await producer.send({
    topic: "order_created",
    messages: [{ value: JSON.stringify(order) }]
  });

  console.log("Order Published:", order);
  res.json({ status: "ORDER_CREATED", order });
});

app.listen(3000, () => console.log("Gateway running on 3000"));

