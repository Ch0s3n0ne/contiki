console.log("Servidor IOT");

import express = require('express');

const app=express();
const port = 8080;

app.get("/",(req,res)=>{
    res.send(`<html>
    <header>
        <title>DEEC IoT CoAP Test Server v1.0</title>
    </header>
    <body>
        <div style="margin: auto;width: 1000px;height: 50px;text-align: center;background-color: #ddd;padding-top: 30px;font-size: 20px;font-weight: 800;font-family: verdana;">DEEC IoT CoAP Test Server v1.0</div>
        <div style="height: 20px;"></div>
        <div style="margin: auto;width: 940px;min-height: 250px;background-color: #eee;padding: 30px;font-size: 14px;font-family: verdana;">
            <div><b>CoAp Commands Available:</b></div>
            <div>&nbsp;</div>
            <div>/addNums/:num1/:num2 (GET)  => Add two numbers and return the result</div>
            <div>&nbsp;</div>
            <div>/setTemp/:idDevice/:Temperature (POST)  => Stores the value of temperature for a certain device</div>
            <div>&nbsp;</div>
            <div>/setTempJSON (POST)  => Stores the value of temperature for a certain device, but this time the parameters are passed in a JSON in the payload {"id":XXX, "temp":YYY}</div>
            <div style="height: 50px;">&nbsp;</div>
            <div><b>REST Commands Available:</b></div>
            <div>&nbsp;</div>
            <div>/logs/:idDevice  => Lists the last 15 set temperature messages received.</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
       </div>
    </body>
</html>`)
});

app.listen(port,() => {
    console.log("server started a http://localhost:$(port)")
})