exports.handler = async (event) => {
  console.log("PAYMENT LAMBDA EXECUTED");
  console.log("Event Received:", JSON.stringify(event));

  const { orderId } = event;

  return {
    statusCode: 200,
    paymentStatus: "VALID",
    orderId: orderId || "UNKNOWN"
  };
};

