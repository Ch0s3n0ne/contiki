/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

// ABOUT THIS NODE.JS EXAMPLE:This sample is part of the SDK for JavaScript Developer Guide (scheduled for release later in 2020) topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-query-scan.html.

Purpose:
ddb_batchwriteitem_tv.js populates the table used for the match query example
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-query-scan.html.

Inputs (replace in code):
- REGION

Running the code:
ts-node ddb_batchwriteitem_tv.js
*/
// snippet-start:[dynamodb.JavaScript.batch.BatchWriterItemTVV3]
// Import required AWS SDK clients and commands for Node.js
const { DynamoDBClient, BatchWriteItemCommand }= require("@aws-sdk/client-dynamodb");

// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const ddbClient = new DynamoDBClient({ region: REGION });

// Set the parameters


const params = {
  RequestItems: {
    configuration: [
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1001" },
              ROOM_ID: { N: "1" },
              ReadWrite: { N: "0" },
              Smoke_Rate: { N: "1" },
              TempHum_Rate: { N: "300" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
            DEV_ID: { N: "1002" },
            ROOM_ID: { N: "1" },
            ReadWrite: { N: "0" },
            Smoke_Rate: { N: "1" },
            TempHum_Rate: { N: "300" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
            DEV_ID: { N: "1003" },
            ROOM_ID: { N: "2" },
            ReadWrite: { N: "0" },
            Smoke_Rate: { N: "1" },
            TempHum_Rate: { N: "300" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
            DEV_ID: { N: "1004" },
            ROOM_ID: { N: "3" },
            ReadWrite: { N: "0" },
            Smoke_Rate: { N: "1" },
            TempHum_Rate: { N: "300" },
          }
      }
  },
    ],
  },
};

const run = async () => {
  try {
    const data = await ddbClient.send(new BatchWriteItemCommand(params));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();
// snippet-end:[dynamodb.JavaScript.batch.BatchWriterItemTVV3]
// For unit tests only.
// module.exports ={run, params};
