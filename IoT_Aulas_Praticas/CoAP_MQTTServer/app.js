"use strict";
var mosca = require('mosca');
var mqtt = require('mqtt');
var db = require('./app.database');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
// Get Local IP Address
var os = require('os');
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }
        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        }
        else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
        }
        ++alias;
    });
}); // End Get Local IP Address
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get('/', function (request, response) {
    response.status(200).send("<html>\n            <header>\n                <title>DEEC IoT CoAP Test Server v1.0</title>\n            </header>\n            <body>\n                <div style=\"margin: auto;width: 1000px;height: 50px;text-align: center;background-color: #ddd;padding-top: 30px;font-size: 20px;font-weight: 800;font-family: verdana;\">DEEC IoT CoAP Test Server v1.0</div>\n                <div style=\"height: 20px;\"></div>\n                <div style=\"margin: auto;width: 940px;min-height: 250px;background-color: #eee;padding: 30px;font-size: 14px;font-family: verdana;\">\n                    <div><b>CoAp Commands Available:</b></div>\n                    <div>&nbsp;</div>\n                    <div>/addNums/:num1/:num2 (GET)  => Add two numbers and return the result</div>\n                    <div>&nbsp;</div>\n                    <div>/setTemp/:idDevice/:Temperature (POST)  => Stores the value of temperature for a certain device</div>\n                    <div>&nbsp;</div>\n                    <div>/setTempJSON (POST)  => Stores the value of temperature for a certain device, but this time the parameters are passed in a JSON in the payload {\"id\":XXX, \"temp\":YYY}</div>\n                    <div style=\"height: 50px;\">&nbsp;</div>\n                    <div><b>REST Commands Available:</b></div>\n                    <div>&nbsp;</div>\n                    <div>/logs/:idDevice  => Lists the last 15 set temperature messages received.</div>\n                    <div>&nbsp;</div>\n                    <div>&nbsp;</div>\n               </div>\n            </body>\n        </html>");
    //      response.json({ info: 'DEEC IoT CoAP Test Server' })
});
app.get('/logs/:id', db.getLogs);
app.listen(port, function () {
    console.log("App running on port " + port + ".");
});
var coap = require('coap');
var coapServer = coap.createServer();
coapServer.on('request', function (req, res) {
    var debugString = 'Unknown';
    var serviceParams = req.url.split('/');
    console.log('\nCoAP New Request: ' + req.code + ", M=" + req.method + " - " + req.url);
    console.log('CoAP New Request URL: ' + req.url);
    console.log('CoAP New Request Payload: ' + req.payload);
    console.log('CoAP New Request Params: (' + serviceParams.length + ')');
    /*    for(let i=0;i<serviceParams.length;i++){
            console.log('#'+serviceParams[i]+'#');
        }*/
    var service = serviceParams[1];
    if (req.method == 'GET') {
        if (service == 'addNums') {
            var arg1 = serviceParams[2];
            var arg2 = serviceParams[3];
            var sum = Number(arg1) + Number(arg2);
            res.code = 205;
            res.end(sum.toString());
            return;
        }
    }
    else {
        if (req.method == 'POST') {
            if (service == 'setTemp') {
                var arg1 = serviceParams[2];
                var arg2 = serviceParams[3];
                res.code = 205;
                res.end("OK");
                db.setTemp(Number(arg1), Number(arg2));
                return;
            }
            if (service == 'setTempJSON') {
                var data = void 0;
                console.log(req.payload);
                try {
                    data = JSON.parse(req.payload);
                }
                catch (err) {
                    res.code = 500;
                    res.end("NOK Invalid JSON");
                    console.log("CoAP: NOK Invalid JSON");
                    return;
                }
                if (data.id == undefined || data.temp == undefined) {
                    res.code = 500;
                    res.end("NOK Invalid JSON Parameters");
                    console.log("CoAP: NOK Invalid JSON Parameters");
                    return;
                }
                res.code = 205;
                res.end("OK");
                db.setTemp(data.id, data.temp);
                return;
            }
            res.code = 404;
        }
    }
    res.code = 404;
    res.end('NOK: ' + req.url.split('/')[1]);
    console.log("CoAP: NOK Invalid Request: " + req.url.split('/')[1]);
});
// the default CoAP port is 5683
coapServer.listen(function () {
    console.log('CoAP Server Started [::]:5683)');
});
/************************************************************** */
/* MQTT Server...
/************************************************************** */
var settings = {
    port: 1883
};
var MQTTServer = new mosca.Server(settings);
MQTTServer.on('ready', function () {
    console.log('MQTT Server Running on Port ' + settings.port);
});
MQTTServer.on("error", function (err) {
    console.log("MQTT Error: " + err);
});
MQTTServer.on('clientConnected', function (client) {
    console.log('MQTT Client Connected \t:= ', client.id);
});
MQTTServer.on('published', function (packet, client) {
    console.log("MQTT Published :=", packet);
});
MQTTServer.on('subscribed', function (topic, client) {
    console.log("MQTT Subscribed :=", topic);
});
MQTTServer.on('unsubscribed', function (topic, client) {
    console.log('MQTT unsubscribed := ', topic);
});
MQTTServer.on('clientDisconnecting', function (client) {
    console.log('MQTT clientDisconnecting := ', client.id);
});
MQTTServer.on('clientDisconnected', function (client) {
    console.log('MQTT Client Disconnected     := ', client.id);
});
var MQTTClient = mqtt.connect('mqtt://127.0.0.1');
var LedState = 0;
MQTTClient.on('connect', function () {
    setInterval(function () {
        console.log('Toggle Led');
        LedState = 1 - LedState;
        MQTTClient.publish('deec/cmd/leds', LedState.toString());
    }, 5000);
});
