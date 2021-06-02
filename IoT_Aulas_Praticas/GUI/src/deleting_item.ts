/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html.

Purpose:
ddb_deleteitem.js demonstrates how to delete an item from an Amazon DynamoDB table.

Inputs (replace in code):
- REGION
- TABLE
- KEY_NAME
- VALUE

Running the code:
ts-node ddb_deleteitem.js

*/
// snippet-start:[dynamodb.JavaScript.item.deleteItemV3]
// Import required AWS SDK clients and commands for Node.js
const {DynamoDBClient , DeleteItemCommand }=require("@aws-sdk/client-dynamodb");

// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const ddbClient = new DynamoDBClient({ region: REGION });


// Set the parameters
var params = {
  
  TableName: "ar_condicionado_sala",
  KEY: {
    ROOM_ID: { N: "2" },
    AC: {N:"0"},
  },
};

const run = async () => {
  try {
    console.log(params)
    const data = await ddbClient.send(new DeleteItemCommand(params));
    console.log("Success, table deleted", data);
    return data;
  } catch (err) {
    if (err && err.code === "ResourceNotFoundException") {
      console.log("Error: Table not found");
    } else if (err && err.code === "ResourceInUseException") {
      console.log("Error: Table in use");
    }
  }
};
run();
// snippet-end:[dynamodb.JavaScript.item.deleteItemV3]
// For unit tests only.
// module.exports ={run, params};
