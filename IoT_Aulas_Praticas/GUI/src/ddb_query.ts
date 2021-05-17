// Import required AWS SDK clients and commands for Node.js
import express = require('express');

const app=express();
const port = 8080;
app.use(express.static(__dirname + '/public'));


const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Set the parameters
const params = {
  KeyConditionExpression: "Season = :s and Episode > :e",
  FilterExpression: "contains (Subtitle, :topic)",
  ExpressionAttributeValues: {
    ":s": { N: "1" },
    ":e": { N: "2" },
    ":topic": { S: "SubTitle" },
  },
  ProjectionExpression: "Episode, Title, Subtitle",
  TableName: "EPISODES_TABLE",
};

// Create DynamoDB service object
const dbclient = new DynamoDBClient({ region: REGION });

var Title_Array=[];

const run = async () => {
  try {
    const results = await dbclient.send(new QueryCommand(params));
    results.Items.forEach(function (element, index, array) {
      console.log(element.Title.S + " (" + element.Subtitle.S + ")");
      Title_Array.push(element.Title.S);
    });

  } catch (err) {
    console.error(err);
  }
};

/*var intervalId = setInterval(function(){
  run();
}, 5000);*/

run();

app.get("/",(req,res)=>{
  res.send(`<html>
  <header>
      <title>DEEC IoT CoAP Test Server v1.0</title>
  </header>
  <body>
      <img src="/images/images">
      <p style="border:1px solid black; "id="teste">`+Title_Array.toString()+`</p>
     </div>
  </body>
</html>

<script>
  var intervalId = setInterval(function(){
    location.reload();
  }, 5000);
</script>
`)

});

app.listen(port,() => {
  console.log(`server started a http://localhost:${port}.`);
})