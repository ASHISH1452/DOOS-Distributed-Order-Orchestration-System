exports.handler = async (event) => {
  console.log("ORDER LAMBDA EXECUTED");
  console.log("Event Received:", JSON.stringify(event));

  return {
    statusCode: 200,
    message: "Order Lambda OK",
    input: event
  };
};

