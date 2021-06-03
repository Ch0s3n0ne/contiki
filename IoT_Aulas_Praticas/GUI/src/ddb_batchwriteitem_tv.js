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
    dados_sensores: [
    {
        PutRequest: {
            Item: {
                DEV_ID: { N: "1001" },
                Tmestamp: { N: "1622470346.63867473602294921875" },
                Dev_Mean_Hum: { N: "50" },
                Dev_Mean_Temp: { N: "20" },
                Hum: { N: "50" },
                IDM: { N: "10" },
                ROOM_ID: { N: "1" },
                Room_Mean_Hum: { N: "50" },
                Room_Mean_Temp: { N: "20" },
                Smoke: { N: "0" },
                Temper: { N: "20" },
            }
        }
    },
    {
        PutRequest: {
            Item: {
                DEV_ID: { N: "1001" },
                Tmestamp: { N: "1622470672.8527698516845703125" },
                Dev_Mean_Hum: { N: "40" },
                Dev_Mean_Temp: { N: "25" },
                Hum: { N: "30" },
                IDM: { N: "10" },
                ROOM_ID: { N: "1" },
                Room_Mean_Hum: { N: "46" },
                Room_Mean_Temp: { N: "22" },
                Smoke: { N: "0" },
                Temper: { N: "30" },
            }
        }
    },
    {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1002" },
              Tmestamp: { N: "1622305926.106422901153564453125" },
              Dev_Mean_Hum: { N: "53" },
              Dev_Mean_Temp: { N: "22.3" },
              Hum: { N: "53" },
              IDM: { N: "10" },
              ROOM_ID: { N: "51.5" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1002" },
              Tmestamp: { N: "1066515454601" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "1" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1003" },
              Tmestamp: { N: "100102252154051" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "1" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1003" },
              Tmestamp: { N: "1065440277401" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "1" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1003" },
              Tmestamp: { N: "1050465458701" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "1" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1003" },
              Tmestamp: { N: "100057840605451" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "1" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1003" },
              Tmestamp: { N: "1050785465001" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "1" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1004" },
              Tmestamp: { N: "107705406501" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "2" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1004" },
              Tmestamp: { N: "1504564094004" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "2" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "0" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1005" },
              Tmestamp: { N: "100056045478641" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "2" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
          }
      }
  },
  {
      PutRequest: {
          Item: {
              DEV_ID: { N: "1006" },
              Tmestamp: { N: "19900189844984" },
              Dev_Mean_Hum: { N: "0" },
              Dev_Mean_Temp: { N: "1" },
              Hum: { N: "300" },
              IDM: { N: "1" },
              ROOM_ID: { N: "2" },
              Room_Mean_Hum: { N: "1" },
              Room_Mean_Temp: { N: "1" },
              Smoke: { N: "1" },
              Temper: { N: "1" },
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
