/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-document-client.html.

Purpose:
ddbdoc_update_item.js demonstrates how to use the Amazon DynamoDB document client to create or update an item in an Amazon DynamoDB table.

Inputs (replace in code):
- TABLE_NAME
- REGION
- primaryKey - Name of the primary key. For example, "id".
- VALUE_1
- sortKey - Name of the sor key. For example, "firstName".
- VALUE_2
- NEW_ATTRIBUTE_VALUE_1
- NEW_ATTRIBUTE_VALUE_2

Running the code:
ts-node ddbdoc_update_item.js
*/
// snippet-start:[dynamodb.JavaScript.docClient.updateV3]
const { UpdateItemCommand, DynamoDBClient}=require("@aws-sdk/client-dynamodb");

// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const ddbClient = new DynamoDBClient({ region: REGION });

// Set the parameters


const run = async () => {
  try {

    const params = {
        ExpressionAttributeNames: {
        "#SR": "Smoke_Rate",
        "#TR": "TempHum_Rate",
        "#RI": "ROOM_ID",
      
        }, 
        ExpressionAttributeValues: {
        ":t": {
          N: "5"
          }, 
        ":y": {
          N: "100"
          },
          ":z": {
            N: "2"
          },
        }, 
        Key: {
        "DEV_ID": {
          N: "1004"
          }
        }, 
        ReturnValues: "ALL_NEW", 
        TableName: "configuration", 
        UpdateExpression: "SET #SR = :y, #TR = :t, #RI = :z"
      };
    console.log(params)
    const data = await ddbClient.send(new UpdateItemCommand(params));
    console.log("Success - item added or updated", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();
// snippet-end:[dynamodb.JavaScript.docClient.updateV3]
// For unit tests only.
// module.exports ={run, params};
