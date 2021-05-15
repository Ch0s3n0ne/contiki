// Import required AWS SDK clients and commands for Node.js
const {
    DynamoDBClient,
    BatchGetItemCommand
  } = require("@aws-sdk/client-dynamodb");
  
  // Set the AWS Region
  const REGION = "eu-west-1"; //e.g. "us-east-1"
  
  // Set the parameters
  const params = {
    RequestItems: {
      TABLE_NAME: {
        Keys: [
          {
            CUSTOMER_ID: { N: "1" },
            CUSTOMER_ID: { N: "2" },

          },
        ],
        ProjectionExpression: "CUSTOMER_NAME",
      },
    },
  };
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    try {
      const data = await dbclient.send(new BatchGetItemCommand(params));
      console.log("Success, items retrieved", data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();