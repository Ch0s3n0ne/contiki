    const mosca = require('mosca');
    const mqtt = require('mqtt');

    const db = require('./app.database');

    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const port = 3000;

    // Get Local IP Address
    var os = require('os');
    var ifaces = os.networkInterfaces();
    
    Object.keys(ifaces).forEach(function (ifname:any) {
      var alias = 0;
    
      ifaces[ifname].forEach(function (iface:any) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }
    
        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          console.log(ifname + ':' + alias, iface.address);
        } else {
          // this interface has only one ipv4 adress
          console.log(ifname, iface.address);
        }
        ++alias;
      });
    });   // End Get Local IP Address

    app.use(bodyParser.json())
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )

    app.get('/', (request:any, response:any) => {
        response.status(200).send(`<html>
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
        </html>`);
//      response.json({ info: 'DEEC IoT CoAP Test Server' })
    })

    app.get('/logs/:id', db.getLogs);

    app.listen(port, () => {
        console.log(`App running on port ${port}.`)
    })


    /*var coap = require('coap');
    var coapServer = coap.createServer();

    coapServer.on('request', function(req:any, res:any) {
        let debugString='Unknown';
        let serviceParams=req.url.split('/');

        console.log('\nCoAP New Request: '+req.code+", M="+req.method+" - "+req.url);
        console.log('CoAP New Request URL: '+req.url);
        console.log('CoAP New Request Payload: '+req.payload);
        console.log('CoAP New Request Params: ('+serviceParams.length+')');
    /*    for(let i=0;i<serviceParams.length;i++){
            console.log('#'+serviceParams[i]+'#');
        }
        
        let service=serviceParams[1];

        if(req.method=='GET'){
            if(service=='addNums'){
                let arg1=serviceParams[2];
                let arg2=serviceParams[3];
                let sum=Number(arg1)+Number(arg2);
                res.code=205;
                res.end(sum.toString());
                return;
            }
        }else{
            if(req.method=='POST'){
                if(service=='setTemp'){
                    let arg1=serviceParams[2];
                    let arg2=serviceParams[3];
                    res.code=205;
                    res.end("OK");
                    db.setTemp(Number(arg1),Number(arg2));
                    return;
                }
                if(service=='setTempJSON'){
                    let data:any;
                    console.log(req.payload);
                    try{
                        data=JSON.parse(req.payload);
                    } catch (err){
                        res.code=500;
                        res.end("NOK Invalid JSON");
                        console.log("CoAP: NOK Invalid JSON");
                        return;
                    }
                    if(data.id==undefined || data.temp==undefined){
                        res.code=500;
                        res.end("NOK Invalid JSON Parameters");
                        console.log("CoAP: NOK Invalid JSON Parameters");
                        return;
                    }
                    res.code=205;
                    res.end("OK");
                    db.setTemp(data.id,data.temp);
                    return;
                }
                res.code=404;
            }
        }
        
        res.code=404;
        res.end('NOK: ' + req.url.split('/')[1])
        console.log("CoAP: NOK Invalid Request: "+req.url.split('/')[1]);
    });

    // the default CoAP port is 5683
    coapServer.listen(function() {
        console.log('CoAP Server Started [::]:5683)');
    });*/

    /************************************************************** */
    /* MQTT Server...
    /************************************************************** */

    var settings = {
		port:1883
    }
    
    var MQTTServer = new mosca.Server(settings);

    MQTTServer.on('ready', function(){
        console.log('MQTT Server Running on Port '+settings.port);
    });

    MQTTServer.on("error", function (err:any) {
        console.log("MQTT Error: "+err);
    });
    
    MQTTServer.on('clientConnected', function (client:any) {
        console.log('MQTT Client Connected \t:= ', client.id);
    });
    
    MQTTServer.on('published', function (packet:any, client:any) {
        console.log("MQTT Published :=", packet);
    });
    
    MQTTServer.on('subscribed', function (topic:any, client:any) {
        console.log("MQTT Subscribed :=", topic);
    });
    
    MQTTServer.on('unsubscribed', function (topic:any, client:any) {
        console.log('MQTT unsubscribed := ', topic);
    });
    
    MQTTServer.on('clientDisconnecting', function (client:any) {
        console.log('MQTT clientDisconnecting := ', client.id);
    });
    
    MQTTServer.on('clientDisconnected', function (client:any) {
        console.log('MQTT Client Disconnected     := ', client.id);
    });

    var MQTTClient  = mqtt.connect('mqtt://127.0.0.1');
    var LedState=0;

    MQTTClient.on('connect', function () {
        setInterval(function() {
            console.log('Toggle Led');
            LedState=1-LedState;
            MQTTClient.publish('deec/cmd/leds', LedState.toString());
        }, 5000);
    });
