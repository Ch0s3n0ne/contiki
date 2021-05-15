// Import required AWS SDK clients and commands for Node.js
const {
    DynamoDBClient,
    DeleteTableCommand
  } = require("@aws-sdk/client-dynamodb");
  
  // Set the AWS Region
  const REGION = "eu-west-1"; //e.g. "us-east-1"
  
  // Set the parameters
  const params = {
    TableName: "TABLE_NAME",
  };
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    try {
      const data = await dbclient.send(new DeleteTableCommand(params));
      console.log("Success, table deleted", data);
    } catch (err) {
      if (err && err.code === "ResourceNotFoundException") {
        console.log("Error: Table not found");
      } else if (err && err.code === "ResourceInUseException") {
        console.log("Error: Table in use");
      }
    }
  };
  run();