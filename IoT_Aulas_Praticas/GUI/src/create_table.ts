const {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand
  } = require("@aws-sdk/client-s3");
  

const {
    DynamoDBClient,
    ListTablesCommand,
    CreateTableCommand
  } = require("@aws-sdk/client-dynamodb");

  // Set the AWS Region
  const REGION = "eu-west-1"; //e.g. "us-east-1"
  
  // Set the parameters
const params = {
    AttributeDefinitions: [
      {
        AttributeName: "DEV_ID", //ATTRIBUTE_NAME_1
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
      /*{
        AttributeName: "DEV_ID", //ATTRIBUTE_NAME_2
        AttributeType: "N", //ATTRIBUTE_TYPE
      },*/
    ],
    KeySchema: [
      {
        AttributeName: "DEV_ID", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      /*{
        AttributeName: "DEV_ID", //ATTRIBUTE_NAME_2
        KeyType: "RANGE",
      },*/
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "configuration", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  };
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    try {
      const data = await dbclient.send(new CreateTableCommand(params));
      console.log("Table Created", data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();