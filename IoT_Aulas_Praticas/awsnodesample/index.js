"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Servidor IOT");
var express = require("express");
var app = express();
var port = 8080;
app.get("/", function (req, res) {
    res.send("<html>\n    <header>\n        <title>DEEC IoT CoAP Test Server v1.0</title>\n    </header>\n    <body>\n        <div style=\"margin: auto;width: 1000px;height: 50px;text-align: center;background-color: #ddd;padding-top: 30px;font-size: 20px;font-weight: 800;font-family: verdana;\">DEEC IoT CoAP Test Server v1.0</div>\n        <div style=\"height: 20px;\"></div>\n        <div style=\"margin: auto;width: 940px;min-height: 250px;background-color: #eee;padding: 30px;font-size: 14px;font-family: verdana;\">\n            <div><b>CoAp Commands Available:</b></div>\n            <div>&nbsp;</div>\n            <div>/addNums/:num1/:num2 (GET)  => Add two numbers and return the result</div>\n            <div>&nbsp;</div>\n            <div>/setTemp/:idDevice/:Temperature (POST)  => Stores the value of temperature for a certain device</div>\n            <div>&nbsp;</div>\n            <div>/setTempJSON (POST)  => Stores the value of temperature for a certain device, but this time the parameters are passed in a JSON in the payload {\"id\":XXX, \"temp\":YYY}</div>\n            <div style=\"height: 50px;\">&nbsp;</div>\n            <div><b>REST Commands Available:</b></div>\n            <div>&nbsp;</div>\n            <div>/logs/:idDevice  => Lists the last 15 set temperature messages received.</div>\n            <div>&nbsp;</div>\n            <div>&nbsp;</div>\n       </div>\n    </body>\n</html>");
});
app.listen(port, function () {
    console.log("server started a http://localhost:$(port)");
});
