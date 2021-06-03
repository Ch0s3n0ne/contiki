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
var time_stamps=[]
var timestamp_anterior=0
var indice=0;
var index_array=[]
var smoke_show=[]
var temp_show=[]
var hum_show=[]

var id_array=['1001', '1002', '1003']


const params = {
  // Specify which items in the results are returned.
  FilterExpression: "ROOM_ID = :s ",
  // Define the expression attribute value, which are substitutes for the values you want to compare.
  ExpressionAttributeValues: {
    
    ":s": { N: "1" },
    
  },
  // Set the projection expression, which the the attributes that you want.
  ProjectionExpression: " Tmestamp ,DEV_ID , Hum,Temper ,Smoke, IDM ",
  TableName: "dados_sensores",
};
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });

async function run() {

  try {
    const data = await dbclient.send(new ScanCommand(params));
    data.Items.forEach(function (element, index, array) {

      if (id_array.includes(element.DEV_ID.N)) {

        ids_array.push(element.DEV_ID.N)
        hum_array.push(element.Hum.N)
        smokes_array.push(element.Smoke.N)
        time_stamps.push(element.Tmestamp.N)
        temp_array.push(element.Temper.N)
      }

    });
  } catch (err) {
    console.log("Error", err);
  }

  console.log(time_stamps)
  console.log(ids_array)
  console.log(hum_array)
  console.log(smokes_array)

  for (let index1 = 0; index1 < id_array.length; index1++){

    timestamp_anterior=0

    for (let index = 0; index < ids_array.length; index++){

      if (id_array[index1]==ids_array[index]) {

        if (ids_array[index]>timestamp_anterior) {

          timestamp_anterior=ids_array[index]
          indice=index         
        }
      }
    }

    index_array.push(indice)
    
  }

  console.log(index_array)

  for (let index = 0; index < index_array.length; index++) {

    smoke_show.push(smokes_array[index_array[index]])
    temp_show.push(temp_array[index_array[index]])
    hum_show.push(hum_array[index_array[index]])
    
  }

  console.log(smoke_show)
  console.log(hum_show)
  console.log(temp_show)

}
run();




// snippet-end:[dynamodb.JavaScript.table.scanV3]
// For unit tests only.
// module.exports ={run, params};
