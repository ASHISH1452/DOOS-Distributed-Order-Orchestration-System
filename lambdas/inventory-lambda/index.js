exports.handler = async (event) => {
  console.log("INVENTORY LAMBDA EXECUTED");
  console.log("Event Received:", JSON.stringify(event));

  const { orderId } = event;

  return {
    statusCode: 200,
    inventory: "AVAILABLE",
    orderId: orderId || "UNKNOWN"
  };
};

