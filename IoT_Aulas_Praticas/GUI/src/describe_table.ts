// Import required AWS SDK clients and commands for Node.js
const {
    DynamoDBClient,
    DescribeTableCommand,
  } = require("@aws-sdk/client-dynamodb");
  
  // Set the AWS Region
  const REGION = "eu-west-1"; //e.g. "us-east-1"
  
  // Set the parameters
  const params = { TableName: "TABLE_NAME" }; //TABLE_NAME
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    try {
      const data = await dbclient.send(new DescribeTableCommand(params));
      console.log("Success", data.Table.KeySchema);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();