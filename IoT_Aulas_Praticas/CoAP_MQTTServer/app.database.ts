const initOptions = {
    // initialization options;
};

const pgp = require('pg-promise')(initOptions);

// const for connection 'postgres://user:password@ip:port/database';
const cn = 'postgres://iot_user:IoT2019@127.0.0.1:5432/IoT';
//const cn = 'postgres://monit:monit_pass@localhost:5432/monit_development';


// init const db with connection String
const dbInt = pgp(cn);
console.log('Database Connected ' + cn);

// export db connection instance
module.exports = dbInt;


/*
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'iot_user',
    host: 'localhost',
    database: 'IoT',
    password: 'IoT2019',
    port: 5432,
})
*/


const getLogs = (request:any, response:any) => {

    const id = parseInt(request.params.id);

    if(id==null || id==NaN){
        console.log('ERROR GETTING LOGS: Invalid Device Id');
        let errorMsg:string='Invalid Device Id';
        response.status(500).send(errorMsg);
        return;
    }


    let fetchLists = dbInt.any("SELECT id,temp,TO_CHAR(ts,'MM/DD/YYYY HH24:MI:SS') AS ts  FROM log_temp WHERE id_device=$1 ORDER BY id DESC LIMIT 15", [id])
        .then(function (data:any) {

            let dataStr="";
            if(data!=undefined && data.length>0){
                dataStr+=`<div style="background-color:#ddd;height: 25px;padding-top: 5px;"><div style="width: 100px;display: inline-block;text-align: center;">Id</div><div style="width: 100px;display: inline-block;text-align: center;">Temp ºC</div><div style="width: 200px;display: inline-block;text-align: center;">Timestamp</div></div>`;
                for(let i=0; i<data.length; i++){
                    dataStr+=`<div style="background-color:#`+((i%2==0) ? `eeeedc`: `e8e8d0`)+`;height: 25px;padding-top: 5px;"><div style="width: 100px;display: inline-block;text-align: center;">`+data[i].id+`</div><div style="width: 100px;display: inline-block;text-align: center;">`+data[i].temp/1000+`</div><div style="width: 200px;display: inline-block;text-align: center;">`+data[i].ts+`</div></div>`;
                }
            }else{
                dataStr=`<div>No results to show!</div>`;
            }
            console.log('Listed Log Entries Device Id '+id+' - Num Elements: '+data.length);
            response.status(200).send(`<html>
            <header>
                <title>DEEC IoT CoAP Test Server v1.0</title>
            </header>
            <body>
                <div style="margin: auto;width: 1000px;height: 50px;text-align: center;background-color: #ddd;padding-top: 30px;font-size: 20px;font-weight: 800;font-family: verdana;">DEEC IoT CoAP Test Server v1.0</div>
                <div style="height: 20px;"></div>
                <div style="margin: auto;width: 940px;min-height: 250px;background-color: #eee;padding: 30px;font-size: 14px;font-family: verdana;">
                    <div><b>Last Set Temperature Messages:</b></div>
                    <div>&nbsp;</div>`+dataStr+`
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
               </div>
            </body>
            </html>`);
        })
        .catch(function (error:any) {
            console.log('ERROR GETTING LOGS: '+error.message);
            response.status(500).send(error.message);
        });

}

const setTemp = (id:Number,temp:Number) => {

    let fetchLists = dbInt.query('INSERT INTO log_temp (id_device,temp,volt,ts) VALUES ($1,$2,$3,now());', [id,temp,0])
        .then(function (data:any) {
            console.log('Added New Log Entry For Devide Id '+id+': (T: '+temp+')');
            return 1;
        })
        .catch(function (error:any) {
            console.log('ERROR SETTING TEMP: '+error.message);
            return 0;
        });
        return 0;
}



module.exports = {
    getLogs,
    setTemp
}