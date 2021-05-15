// Import required AWS SDK clients and commands for Node.js
const {
    DynamoDBClient,
    DeleteItemCommand
  } = require("@aws-sdk/client-dynamodb");
  
  // Set the AWS Region
  const REGION = "REGION"; //e.g. "us-east-1"
  
  // Set the parameters
  var params = {
    TableName: 'TABLE_NAME',
    Key: {
      'KEY_NAME': {N: 'VALUE'}
    }
  };
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    try {
      const data = await dbclient.send(new DeleteItemCommand(params));
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