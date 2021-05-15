const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb"); 
import { DynamoDB } from "@aws-sdk/client-dynamodb";
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");


// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const ddbClient = new DynamoDBClient({ region: REGION });


// Set the AWS Region.

// Create an Amazon S3 service client object.
const client = new DynamoDBClient({ region: REGION });


const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB Document client.



const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);

// Set the parameters
const params = {
  TableName: "TABLE_NAME",
  /*
  Convert the attribute JavaScript object you are updating to the required
  Amazon  DynamoDB record. The format of values specifies the datatype. The
  following list demonstrates different datatype formatting requirements:
  String: "String",
  NumAttribute: 1,
  BoolAttribute: true,
  ListAttribute: [1, "two", false],
  MapAttribute: { foo: "bar" },
  NullAttribute: null
   */
  Key: {
    CUSTOMER_ID: "2" // For example, 'Season': 2.
    //sortKey: VALUE_2 // For example,  'Episode': 1; (only required if table has sort key).
  },
  // Define expressions for the new or updated attributes
  UpdateExpression: "set CUSTOMER_NAME = :t, ALGO = :s", // For example, "'set Title = :t, Subtitle = :s'"
  ExpressionAttributeValues: {
    ":t": 'CUSTOMER_NAME', // For example ':t' : 'NEW_TITLE'
    ":s": 'ALGO', // For example ':s' : 'NEW_SUBTITLE'
  },
};

const run = async () => {
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err);
  }
};
run();