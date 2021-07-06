// Import required AWS SDK clients and commands for Node.js


const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"
var i=1;
var id_array=[];
var room_array=[];


  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });

  async function run() {


      // Set the parameters
      const params = {
        KeyConditionExpression: "ROOM_ID = :s ",
      
        ExpressionAttributeValues: {
          ":s": { N: "4" },
    
        },
        ProjectionExpression: "ROOM_ID, AC, IDM",
        TableName: "ar_condicionado_sala",
      };

    try {
      const results = await dbclient.send(new QueryCommand(params));
      results.Items.forEach(function (element, index, array) {
        id_array.push(element.IDM.N);

      });

    } catch (err) {
      console.error(err);
    }

    console.log(id_array)

}

run();
/*var intervalId = setInterval(function(){
  run();
}, 5000);*/

