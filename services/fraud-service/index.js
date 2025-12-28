const Redis = require("ioredis");
const AWS = require("aws-sdk");

const redis = new Redis({ host: "redis", port: 6379 });

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://host.docker.internal:4566"
});
const db = new AWS.DynamoDB.DocumentClient();

(async () => {
  console.log("Fraud Service Running...");

  while (true) {
    const data = await redis.xread("BLOCK", 0, "STREAMS", "order_stream", "$");

    const raw = data[0][1][0][1];
    const order = JSON.parse(raw[1]);

    console.log("Fraud Check:", order);

    await db.put({
      TableName: "FraudEvent",
      Item: { orderId: order.orderId, status: "CLEAR" }
    }).promise();

    console.log("Fraud result saved to DynamoDB");
  }
})();

