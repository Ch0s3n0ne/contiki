// Import required AWS SDK clients and commands for Node.js
const {
    DynamoDBClient,
    BatchWriteItemCommand
  } = require("@aws-sdk/client-dynamodb");
  
  // Set the AWS Region
  const REGION = "eu-west-1"; //e.g. "us-east-1"
  
  // Set the parameters
  const params = {
    RequestItems: {
      EPISODES_TABLE: [
        {
          PutRequest: {
            Item: {
              Season: { N: "1" },
              Episode: { N: "1" },
              Subtitle: { S: "SubTitle1" },
              Title: { S: "Title1" },
            },
          },
        },
        {
          PutRequest: {
            Item: {
              Season: { N: "1" },
              Episode: { N: "2" },
              Subtitle: { S: "SubTitle2" },
              Title: { S: "Title2" },
            },
          },
        },
        {
          PutRequest: {
            Item: {
              Season: { N: "1" },
              Episode: { N: "3" },
              Subtitle: { S: "SubTitle3" },
              Title: { S: "Title3" },
            },
          },
        },
        {
          PutRequest: {
            Item: {
              Season: { N: "1" },
              Episode: { N: "4" },
              Subtitle: { S: "SubTitle4" },
              Title: { S: "Title4" },
            },
          },
        },
      ],
    },
  };
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    try {
      const data = await dbclient.send(new BatchWriteItemCommand(params));
      console.log("Success, items inserted", data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();