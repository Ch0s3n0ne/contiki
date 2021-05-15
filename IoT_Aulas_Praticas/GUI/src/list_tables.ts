const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Create DynamoDB service object
const dbclient = new DynamoDBClient({ region: REGION });

const run = async () => {
  try {
    const data = await dbclient.send(new ListTablesCommand({}));
    console.log(data.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
};
run();