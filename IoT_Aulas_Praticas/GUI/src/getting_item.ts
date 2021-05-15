// Import required AWS SDK clients and commands for Node.js
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Set the parameters
const params = {
  TableName: "TABLE_NAME", //TABLE_NAME
  Key: {
    CUSTOMER_ID: { N: "1" },
  },
  ProjectionExpression: "CUSTOMER_NAME",
};

// Create DynamoDB service object
const dbclient = new DynamoDBClient({ region: REGION });

const run = async () => {
  const data = await dbclient.send(new GetItemCommand(params));
  console.log("Success", data.Item);
};
run();