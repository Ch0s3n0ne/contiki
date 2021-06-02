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
var id_array=[];
var         smoke_array=[]
var          temp_array=[]
var sala =2;
// Set the parameters
    const params = {
      // Specify which items in the results are returned.
      FilterExpression: "ROOM_ID = :s ",
      // Define the expression attribute value, which are substitutes for the values you want to compare.
      ExpressionAttributeValues: {
        
        ":s": { N: ""+sala+"" },
        
      },
      // Set the projection expression, which the the attributes that you want.
      ProjectionExpression: "ROOM_ID, DEV_ID , Smoke_Rate, TempHum_Rate ",
      TableName: "configuration",
    };
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });

async function run() {
  try {
    const data = await dbclient.send(new ScanCommand(params));
    data.Items.forEach(function (element, index, array) {
      console.log(element.DEV_ID.N);
      id_array.push(element.DEV_ID.N)
      smoke_array.push(element.Smoke_Rate.N)
      temp_array.push(element.TempHum_Rate.N)
      //nr_resultados=nr_resultados+1;
      return data;
    });
  } catch (err) {
    console.log("Error", err);
  }

  id_array.sort();
  var reference_object = {};
  for (var i = 0; i < id_array.length; i++) {
      reference_object[id_array[i]] = i;
  }

  smoke_array.sort(function(a, b) {
    return reference_object[a] - reference_object[b];
  });
  temp_array.sort(function(a, b) {
    return reference_object[a] - reference_object[b];
  });

  console.log(id_array)
  console.log(smoke_array)
  console.log(temp_array)
}
run();
// snippet-end:[dynamodb.JavaScript.table.scanV3]
// For unit tests only.
// module.exports ={run, params};
