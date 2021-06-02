// Import required AWS SDK clients and commands for Node.js
import express = require('express');

const app=express();
const port = 8080;
app.use(express.static(__dirname + '/public'));


const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"
var i=1;
var id_array=[];
var room_array=[];


  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });

  async function run() {


    while(i<=2){

      // Set the parameters
        const params = {
          KeyConditionExpression: "ROOM_ID = :s ",
        
          ExpressionAttributeValues: {
            ":s": { N: ""+i+"" },
      
          },
          ProjectionExpression: "ROOM_ID, DEV_ID",
          TableName: "CONFIGURATION",
        };

    try {
      const results = await dbclient.send(new QueryCommand(params));
      results.Items.forEach(function (element, index, array) {
        console.log(element.DEV_ID.N );
        id_array.push(element.DEV_ID.N);
        room_array.push(element.ROOM_ID.N);
        

      });

    } catch (err) {
      console.error(err);
    }
    console.log(i)

    if(i==2){
      console.log(id_array)
      console.log(room_array)
    
    }
    

    i=i+1;


  };

}

run();
/*var intervalId = setInterval(function(){
  run();
}, 5000);*/

