
module.exports = {
    nr_salas: async function() {
        
        const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
        const REGION = "eu-west-1"; //e.g. "us-east-1"  
        // Set the parameters
        const params = {
        // Specify which items in the results are returned.
        FilterExpression: "ROOM_ID > :s ",
        // Define the expression attribute value, which are substitutes for the values you want to compare.
        ExpressionAttributeValues: {
            
            ":s": { N: "0" },
            
        },
        // Set the projection expression, which the the attributes that you want.
        ProjectionExpression: "ROOM_ID, AC",
        TableName: "ar_condicionado_sala",
        };
        // Create DynamoDB service object
        const dbclient = new DynamoDBClient({ region: REGION });
        var nr_resultados=0;
        
        try {
            const data = await dbclient.send(new ScanCommand(params));
            data.Items.forEach(function (element, index, array) {
            console.log(element.ROOM_ID.N + " (" + element.AC.N + ")");
            nr_resultados=nr_resultados+1;
            return data;
            });
        } catch (err) {
            console.log("Error", err);
        }
        console.log(nr_resultados)
       
        
        return  nr_resultados
        
    },


    multiply: function(a,b) {
        return a*b
    }
};