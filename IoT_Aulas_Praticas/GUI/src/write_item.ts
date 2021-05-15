// Import required AWS SDK clients and commands for Node.js
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Set the parameters
const params = {
  TableName: "TABLE_NAME",
  Item: {
    CUSTOMER_ID: { N: "001" },
    CUSTOMER_NAME: { S: "Richard Roe" },
  },
};

// Create DynamoDB service object
const dbclient = new DynamoDBClient({ region: REGION });

const run = async () => {
  try {
    const data = await dbclient.send(new PutItemCommand(params));
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
run();