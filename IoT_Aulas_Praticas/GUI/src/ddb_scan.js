/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-query-scan.html.

Purpose:
ddb_scan.js demonstrates how to return items and attributes from an Amazon DynamoDB table.

Inputs (replace in code):
- REGION

Running the code:
ts-node ddb_scan.js
*/
// snippet-start:[dynamodb.JavaScript.table.scanV3]

// Import required AWS SDK clients and commands for Node.js
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"
var hum_array=[]
var temp_array=[]
var smokes_array=[]
var ids_array=[]


const params = {
  KeyConditionExpression: "ROOM_ID = :s ",

  ExpressionAttributeValues: {
    ":s": { N: "4" },

  },
  ProjectionExpression: "ROOM_ID, AC, IDM",
  TableName: "ar_condicionado_sala",
};

  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });

async function run() {

  try {
    const data = await dbclient.send(new ScanCommand(params));
    data.Items.forEach(function (element, index, array) {

      ids_array.push(element.DEV_ID.N)

    });
  } catch (err) {
    console.log("Error", err);
  }
  console.log(ids_array)
}
run();


  




// snippet-end:[dynamodb.JavaScript.table.scanV3]
// For unit tests only.
// module.exports ={run, params};
