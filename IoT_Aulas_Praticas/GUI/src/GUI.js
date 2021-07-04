"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var _a = require("@aws-sdk/client-dynamodb"), DynamoDBClient = _a.DynamoDBClient, ScanCommand = _a.ScanCommand, QueryCommand = _a.QueryCommand, UpdateItemCommand = _a.UpdateItemCommand;
// Set the AWS Region
var REGION = "eu-west-1"; //e.g. "us-east-1"
//var tools = require('./function.js');
var app = express();
var port = 8080;
app.use(express.static(__dirname + '/public'));
var nr_nodos = 1;
var sala = 1;
var sala_anterior = 0;
var string_mensagens = '';
var ac_ativado = 1;
var atualizar_ac = 1;
var IDM = 0;
var nr_salas = 1;
var nodos_mostrar = [];
var id_array = [];
var smoke_array = [];
var temp_array = [];
var hum_array = [];
var temps_array = [];
var smokes_array = [];
var ids_array = [];
var time_stamps = [];
var timestamp_anterior = 0;
var indice = 0;
var index_array = [];
var smoke_show = [];
var temp_show = [];
var hum_show = [];
var IDM_array = [];
var Room_array = [];
var show_room_array = [];
var dbclient = new DynamoDBClient({ region: REGION });
//-----------------------fim da inicialização de variáveis--------------------------------
var l = 0;
var intervalId = setInterval(function () {
    l = l + 1;
    //console.log("x")
}, 5000);
//    console.log(nr_salas)
// -----------------------------------funções de contrução da interface-----------------------------------------------------------
function mostrar_adicionar(i) {
    if (nodos_mostrar.includes(i)) {
    }
    else {
        nodos_mostrar.push(i);
    }
}
function mostrar_remover(i) {
    if (nodos_mostrar.includes(i)) {
        nodos_mostrar.splice(nodos_mostrar.indexOf(i), 1);
        console.log("removeu");
    }
}
function salas(room_array, idm_array, show_room) {
    var text_salas = '';
    console.log(room_array);
    console.log(show_room);
    for (var i = 1; i <= room_array.length; i++) {
        if (show_room[room_array.indexOf('' + i + '')] == '1') {
            if (parseFloat(idm_array[room_array.indexOf('' + i + '')]) >= 90) {
                text_salas = text_salas + '<j " onclick="mudar_sala(' + i + ')">Sala ' + (i) + '</j> ';
            }
            else {
                text_salas = text_salas + '<k " onclick="mudar_sala(' + i + ')">Sala ' + (i) + '</k> ';
            }
        }
    }
    return (text_salas);
}
function nodos() {
    var x = '';
    var print2 = '';
    var print1 = '';
    var print11 = '';
    var print21 = '';
    //console.log("nodos a mostrar")
    //console.log(nodos_mostrar)
    for (var i = 0; i < nr_nodos; i++) {
        if (nodos_mostrar.includes(i + 1)) {
            print2 = 'mostrar';
            print1 = 'lista_dados';
            if (smoke_show[i] == 0) {
                print11 = 'grey_server.png';
            }
            else {
                print11 = 'red_server.png';
            }
            print21 = 'def_white.png';
        }
        else {
            print2 = 'lista_def';
            print1 = 'mostrar';
            if (smoke_show[i] == 0) {
                print11 = 'white_server.png';
            }
            else {
                print11 = 'red_server.png';
            }
            print21 = 'def_grey.png';
        }
        x += '<ul class="menu" id="menu' + (i + 1) + '">';
        x += '<li>';
        x += '        <a class="def" onclick="mudar_dados(' + (i + 1) + ')"><img style="height:88px; width: 98px " id="dados' + (i + 1) + '" src="images/' + print11 + '"></a><br>';
        x += '<a class="def" onclick="mudar_def(' + (i + 1) + ')"><img id="def' + (i + 1) + '" src="images/' + print21 + '"></a>';
        x += '</li>';
        x += '<li>';
        x += '<ul class="' + print1 + '" id="lista_dados' + (i + 1) + '" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 300px">';
        x += '<li>ID: ' + id_array[i] + '</li>';
        x += '<li>Temperatura: ' + temp_show[i] + '</li>';
        x += '<li>Humidade: ' + hum_show[i] + '</li>';
        x += '<li>Fumo: ' + smoke_show[i] + '</li>';
        x += '</ul> ';
        x += '<ul class="' + print2 + '" id="lista_def' + (i + 1) + '" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 400px">';
        x += '<form onsubmit="return validateFormOnSubmit(this);" style="margin-left: 5px;">';
        x += '<input style="display: none;" onclick="hold()"  type="number" id="dev_id" name="dev_id" value="' + id_array[i] + '"><br><br>';
        x += '<label style="margin-top: 5px;" for="sala">Sala:</label><br>';
        x += '<input onclick="hold()"  type="number" min="1" max="' + nr_salas + '" id="sala" name="sala" value="' + sala + '"><br><br>';
        x += '<label for="freq_tem">Tempo de aquisição Temp/Hum:</label><br>';
        x += '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_tem" name="freq_tem" value="' + temp_array[i] + '">s<br><br>';
        x += '<label for="freq_fum">Tempo de aquisição Fumo:</label><br>';
        x += '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_fum" name="freq_fum" value="' + smoke_array[i] + '">s<br><br>';
        x += '<input style=" padding: 5px; float:right;" type="submit" value="Enviar">';
        x += '</form>';
        x += '</ul>';
        x += '</li>';
        x += '</ul>';
    }
    console.log("fez refresh");
    return (x);
}
function room_register() {
    //console.log("pedido de mudança")
}
function titulo() {
    var x = '';
    if (Number.isNaN(sala)) {
        x += '<h2 style="color: #eee;" id="titulo">Sala 1 :</h2>';
    }
    else {
        x += '<h2 style="color: #eee;" id="titulo">Sala ' + sala + ' :</h2>';
    }
    return (x);
}
function message_list() {
    var x = '';
    var array_mensagens = string_mensagens.split('next->');
    for (var index = 1; index < array_mensagens.length; index++) {
        x += '<li>' + array_mensagens[index] + '</li>';
    }
    return (x);
}
function estado_cond() {
    var x = '';
    if (ac_ativado == 1) {
        x += '<button onclick="mudar_ac()" id="ar_condicionado" style="margin-left: 50%; padding: 10px;">Desactivar Ar Condicionado</button></span>';
    }
    else {
        x += '<button onclick="mudar_ac()" id="ar_condicionado" style="margin-left: 50%; padding: 10px;">Ativar Ar Condicionado</button></span>';
    }
    return (x);
}
app.get('/', function (req, res) {
    //-------------------------------------processamento de comandos GET------------------------------------------------
    console.log("queryyyy", req.query);
    var messages = req.query.message_number;
    var dados_sel = req.query.mostrar;
    var tipo_dados = typeof dados_sel;
    var tipo_msg = typeof messages;
    if (tipo_msg === 'undefined') {
        string_mensagens += '';
        //console.log("mensagem recebida não defenida")
    }
    else if (tipo_msg === 'string') {
        string_mensagens += 'next->' + messages;
    }
    else {
        for (var index = 0; index < messages.length; index++) {
            string_mensagens += 'next->' + messages[index];
        }
    }
    //console.log("tipo_dados",tipo_dados)
    //console.log("dados_sel",dados_sel)
    if (tipo_dados === 'undefined') {
        //console.log("mensagem recebida não defenida")
    }
    else if (tipo_dados === 'string') {
        for (var index = 0; index < nr_nodos; index++) {
            if (dados_sel == ((index + 1) + 'sim')) {
                mostrar_adicionar((index + 1));
            }
            else if (dados_sel == ((index + 1) + 'nao')) {
                mostrar_remover((index + 1));
            }
        }
    }
    else {
        for (var index1 = 0; index1 < tipo_dados.length; index1++) {
            for (var index = 0; index < nr_nodos; index++) {
                if (dados_sel[index1] == ((index + 1) + 'sim')) {
                    mostrar_adicionar((index + 1));
                }
                else if (dados_sel[index1] == ((index + 1) + 'nao')) {
                    mostrar_remover((index + 1));
                }
            }
        }
    }
    var dev_id = req.query.pedido_update_id;
    var mudar_ac = req.query.mudar_cond;
    var conv = req.query.sala + '';
    sala = parseInt(conv);
    if (!sala) {
        sala = 1;
    }
    function contagem_de_salas() {
        return __awaiter(this, void 0, void 0, function () {
            function update_parametros() {
                return __awaiter(this, void 0, void 0, function () {
                    //--------------------------------------------------inicio das funções async------------------------------------
                    function contagem_de_nodos() {
                        return __awaiter(this, void 0, void 0, function () {
                            var params_1, data, err_5, params1, data1, err_6, index, params_2, data, err_7, old_id_array, changes_array, index, index1, new_smoke_array, new_temp_array, index, index1, index, params, data, err_8, params_3, results, err_9, index1, index, index;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        hum_array = [];
                                        temps_array = [];
                                        smokes_array = [];
                                        ids_array = [];
                                        time_stamps = [];
                                        timestamp_anterior = 0;
                                        indice = 0;
                                        index_array = [];
                                        smoke_show = [];
                                        temp_show = [];
                                        hum_show = [];
                                        console.log("correu função no reload");
                                        if (!1) return [3 /*break*/, 13];
                                        id_array = [];
                                        smoke_array = [];
                                        temp_array = [];
                                        params_1 = {
                                            // Specify which items in the results are returned.
                                            FilterExpression: "ROOM_ID = :s ",
                                            // Define the expression attribute value, which are substitutes for the values you want to compare.
                                            ExpressionAttributeValues: {
                                                ":s": { N: "" + sala + "" }
                                            },
                                            // Set the projection expression, which the the attributes that you want.
                                            ProjectionExpression: "ROOM_ID, DEV_ID , Smoke_Rate, TempHum_Rate ",
                                            TableName: "configuration"
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, dbclient.send(new ScanCommand(params_1))];
                                    case 2:
                                        data = _a.sent();
                                        data.Items.forEach(function (element, index, array) {
                                            //console.log(element.DEV_ID.N);
                                            id_array.push(element.DEV_ID.N);
                                            smoke_array.push(element.Smoke_Rate.N);
                                            temp_array.push(element.TempHum_Rate.N);
                                            //nr_resultados=nr_resultados+1;
                                            //return data;
                                        });
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_5 = _a.sent();
                                        console.log("Error", err_5);
                                        return [3 /*break*/, 4];
                                    case 4:
                                        if (!(id_array.length == 0)) return [3 /*break*/, 12];
                                        _a.label = 5;
                                    case 5:
                                        _a.trys.push([5, 7, , 8]);
                                        params1 = {
                                            ExpressionAttributeNames: {
                                                "#S": "show1"
                                            },
                                            ExpressionAttributeValues: {
                                                ":y": {
                                                    N: "0"
                                                }
                                            },
                                            Key: {
                                                "ROOM_ID": {
                                                    N: "" + sala + ""
                                                }
                                            },
                                            TableName: "ar_condicionado_sala",
                                            UpdateExpression: "SET #S = :y"
                                        };
                                        console.log(params1);
                                        return [4 /*yield*/, dbclient.send(new UpdateItemCommand(params1))];
                                    case 6:
                                        data1 = _a.sent();
                                        //console.log("Success - item added or updated", data);
                                        //return data1;
                                        show_room_array[Room_array.indexOf('' + sala + '')] = 0;
                                        return [3 /*break*/, 8];
                                    case 7:
                                        err_6 = _a.sent();
                                        console.log("Error", err_6);
                                        return [3 /*break*/, 8];
                                    case 8:
                                        for (index = 1; index <= Room_array.length; index++) {
                                            if (show_room_array[Room_array.indexOf('' + index + '')] == '1') {
                                                sala = index;
                                                break;
                                            }
                                        }
                                        params_2 = {
                                            // Specify which items in the results are returned.
                                            FilterExpression: "ROOM_ID = :s ",
                                            // Define the expression attribute value, which are substitutes for the values you want to compare.
                                            ExpressionAttributeValues: {
                                                ":s": { N: "" + sala + "" }
                                            },
                                            // Set the projection expression, which the the attributes that you want.
                                            ProjectionExpression: "ROOM_ID, DEV_ID , Smoke_Rate, TempHum_Rate ",
                                            TableName: "configuration"
                                        };
                                        _a.label = 9;
                                    case 9:
                                        _a.trys.push([9, 11, , 12]);
                                        return [4 /*yield*/, dbclient.send(new ScanCommand(params_2))];
                                    case 10:
                                        data = _a.sent();
                                        data.Items.forEach(function (element, index, array) {
                                            //console.log(element.DEV_ID.N);
                                            id_array.push(element.DEV_ID.N);
                                            smoke_array.push(element.Smoke_Rate.N);
                                            temp_array.push(element.TempHum_Rate.N);
                                            //nr_resultados=nr_resultados+1;
                                            //return data;
                                        });
                                        return [3 /*break*/, 12];
                                    case 11:
                                        err_7 = _a.sent();
                                        console.log("Error", err_7);
                                        return [3 /*break*/, 12];
                                    case 12:
                                        old_id_array = id_array.slice();
                                        id_array.sort();
                                        changes_array = [];
                                        for (index = 0; index < old_id_array.length; index++) {
                                            for (index1 = 0; index1 < id_array.length; index1++) {
                                                if (old_id_array[index] == id_array[index1]) {
                                                    changes_array.push(index1);
                                                }
                                            }
                                        }
                                        new_smoke_array = [];
                                        new_temp_array = [];
                                        for (index = 0; index < changes_array.length; index++) {
                                            for (index1 = 0; index1 < changes_array.length; index1++) {
                                                if (index == changes_array[index1]) {
                                                    new_smoke_array.push(smoke_array[index1]);
                                                    new_temp_array.push(temp_array[index1]);
                                                }
                                            }
                                        }
                                        smoke_array = new_smoke_array;
                                        temp_array = new_temp_array;
                                        //console.log(id_array)
                                        //console.log(smoke_array)
                                        //console.log(temp_array)
                                        nr_nodos = id_array.length;
                                        nodos_mostrar = [];
                                        for (index = 1; index <= nr_nodos; index++) {
                                            nodos_mostrar.push(index);
                                        }
                                        //sala_anterior=sala
                                        atualizar_ac = 1;
                                        _a.label = 13;
                                    case 13:
                                        params = {
                                            // Specify which items in the results are returned.
                                            FilterExpression: "ROOM_ID = :s ",
                                            // Define the expression attribute value, which are substitutes for the values you want to compare.
                                            ExpressionAttributeValues: {
                                                ":s": { N: "" + sala + "" }
                                            },
                                            // Set the projection expression, which the the attributes that you want.
                                            ProjectionExpression: " Tmestamp ,DEV_ID , Temper ,Hum, Smoke ",
                                            TableName: "dados_sensores"
                                        };
                                        _a.label = 14;
                                    case 14:
                                        _a.trys.push([14, 16, , 17]);
                                        return [4 /*yield*/, dbclient.send(new ScanCommand(params))];
                                    case 15:
                                        data = _a.sent();
                                        data.Items.forEach(function (element, index, array) {
                                            if (id_array.includes(element.DEV_ID.N)) {
                                                ids_array.push(element.DEV_ID.N);
                                                hum_array.push(element.Hum.N);
                                                smokes_array.push(element.Smoke.N);
                                                time_stamps.push(element.Tmestamp.N);
                                                temps_array.push(element.Temper.N);
                                            }
                                        });
                                        return [3 /*break*/, 17];
                                    case 16:
                                        err_8 = _a.sent();
                                        console.log("Error", err_8);
                                        return [3 /*break*/, 17];
                                    case 17:
                                        if (!(atualizar_ac == 1)) return [3 /*break*/, 21];
                                        params_3 = {
                                            KeyConditionExpression: "ROOM_ID = :s ",
                                            ExpressionAttributeValues: {
                                                ":s": { N: "" + sala + "" }
                                            },
                                            ProjectionExpression: "ROOM_ID, AC, IDM",
                                            TableName: "ar_condicionado_sala"
                                        };
                                        _a.label = 18;
                                    case 18:
                                        _a.trys.push([18, 20, , 21]);
                                        return [4 /*yield*/, dbclient.send(new QueryCommand(params_3))];
                                    case 19:
                                        results = _a.sent();
                                        results.Items.forEach(function (element, index, array) {
                                            ac_ativado = element.AC.N;
                                            IDM = element.IDM.N;
                                        });
                                        return [3 /*break*/, 21];
                                    case 20:
                                        err_9 = _a.sent();
                                        console.error(err_9);
                                        return [3 /*break*/, 21];
                                    case 21:
                                        //-----------------------------------------------------------------------------------------------------//
                                        //console.log(id_array)
                                        for (index1 = 0; index1 < id_array.length; index1++) {
                                            timestamp_anterior = 0;
                                            for (index = 0; index < ids_array.length; index++) {
                                                if (id_array[index1] == ids_array[index]) {
                                                    if (ids_array[index] > timestamp_anterior) {
                                                        timestamp_anterior = ids_array[index];
                                                        indice = index;
                                                    }
                                                }
                                            }
                                            index_array.push(indice);
                                        }
                                        //console.log(index_array)
                                        for (index = 0; index < index_array.length; index++) {
                                            smoke_show.push(smokes_array[index_array[index]]);
                                            temp_show.push(temps_array[index_array[index]]);
                                            hum_show.push(hum_array[index_array[index]]);
                                        }
                                        //console.log("pos processing")
                                        //console.log(smoke_show)
                                        //console.log(hum_show)
                                        //console.log(temp_show)
                                        //--------------------------------print da página HTML------------------------------------------
                                        res.send("<html>\n        <head>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <meta charset=\"UTF-8\">\n        <style>\n        \n        .sidenav {\n          height: 100%;\n          width: 160px;\n          position: fixed;\n          z-index: 1;\n          top: 0;\n          left: 0;\n          background-color: #111;\n          overflow-x: hidden;\n          padding-top: 20px;\n        }\n        \n        .sidenav k {\n          padding: 6px 8px 6px 16px;\n          text-decoration: none;\n          font-size: 25px;\n          color: #818181;\n          display: block;\n        }\n        \n        .sidenav k:hover {\n          color: #f1f1f1;\n        }\n        .sidenav j {\n          padding: 6px 8px 6px 16px;\n          text-decoration: none;\n          font-size: 25px;\n          color: red;\n          display: block;\n        }\n        \n        .sidenav j:hover {\n          color: #f1f1f1;\n        }\n        \n        .main {\n          margin-left: 160px; /* Same as the width of the sidenav */\n          font-size: 28px; /* Increased text to enable scrolling */\n          padding: 0px 10px;\n        }\n        \n        @media screen and (max-height: 450px) {\n          .sidenav {padding-top: 15px;}\n          .sidenav a {font-size: 18px;}\n        }\n        ul.menu li {\n          display:inline;\n        }\n        ul#lista li {\n          display: list-item;\n        }\n        \n        ul.lista_dados li {\n          display: list-item;\n        }\n        \n        ul.lista_def li {\n          display: list-item;\n        }\n        \n        article {\n          float: left;\n          padding: 20px;\n          width: 50%;\n          background-color: #f1f1f1;\n         \n        \n        }\n        \n        * {\n          box-sizing: border-box;\n        }\n        \n        /* Create two columns/boxes that floats next to each other */\n        nav {\n          float: left;\n          width: 50%;\n          background: #ccc;\n          padding: 20px;\n          \n        }\n        \n        nav ul {\n          list-style-type: none;\n          padding: 0;\n        }\n        \n        .def:hover {\n            opacity: 0.5;\n        }\n        .mostrar{\n            display: none;\n        }\n        /*------------------------------progress bar stuff--------------------------*/\n        .meter {\n          box-sizing: content-box;\n          height: 20px; /* Can be anything */\n          width: 40%;\n          position: relative;\n          margin: -1.5% 0 20px 0; /* Just for demo spacing */\n          background: #555;\n          border-radius: 25px;\n          padding: 10px;\n          box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);\n        }\n        .meter > span {\n          display: block;\n          height: 100%;\n          border-top-right-radius: 8px;\n          border-bottom-right-radius: 8px;\n          border-top-left-radius: 20px;\n          border-bottom-left-radius: 20px;\n          background-color: rgb(43, 194, 83);\n          background-image: linear-gradient(\n            center bottom,\n            rgb(43, 194, 83) 37%,\n            rgb(84, 240, 84) 69%\n          );\n          box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),\n            inset 0 -2px 6px rgba(0, 0, 0, 0.4);\n          position: relative;\n          overflow: hidden;\n        }\n        .meter > span:after,\n        .animate > span > span {\n          content: \"\";\n          position: absolute;\n          top: 0;\n          left: 0;\n          bottom: 0;\n          right: 0;\n          background-image: linear-gradient(\n            -45deg,\n            rgba(255, 255, 255, 0.2) 25%,\n            transparent 25%,\n            transparent 50%,\n            rgba(255, 255, 255, 0.2) 50%,\n            rgba(255, 255, 255, 0.2) 75%,\n            transparent 75%,\n            transparent\n          );\n          z-index: 1;\n          background-size: 50px 50px;\n          animation: move 2s linear infinite;\n          border-top-right-radius: 8px;\n          border-bottom-right-radius: 8px;\n          border-top-left-radius: 20px;\n          border-bottom-left-radius: 20px;\n          overflow: hidden;\n        }\n\n        .animate > span:after {\n          display: none;\n        }\n\n        @keyframes move {\n          0% {\n            background-position: 0 0;\n          }\n          100% {\n            background-position: 50px 50px;\n          }\n        }\n\n        .orange > span {\n          background-image: linear-gradient(#f1a165, #f36d0a);\n        }\n\n        .red > span {\n          background-image: linear-gradient(#f0a3a3, #f42323);\n        }\n\n        .nostripes > span > span,\n        .nostripes > span::after {\n          background-image: none;\n        }\n\n\n        body {\n          background: #333;\n          font-family: system-ui, sans-serif;\n        }\n        </style>\n\n        <script type=\"text/javascript\">\n             \n            var get='';\n\n            var mostrar='';\n            \n            var nr_nodos=" + nr_nodos + "\n            \n            console.log(get)\n\n            //fun\u00E7\u00E3o que trata dos dados ap\u00F3s clicarmos no bot\u00E3o de enviar\n            function validateFormOnSubmit(theForm) {\n\n                var titulo=document.getElementById('titulo').innerHTML;\n    \n                var titulo_sep = titulo.split(\" \");\n    \n                i=titulo_sep[1];\n        \n                var sala = theForm.sala.value;\n                var  freq_tem= theForm.freq_tem.value;\n                var freq_fum = theForm.freq_fum.value;\n                var dev_id = theForm.dev_id.value;\n                console.log(dev_id)                \n\n                \n                var today = new Date();\n    \n                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n    \n                var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n    \n                var dateTime = date+' '+time+'\u21E8';\n    \n                var list = document.getElementById('lista');\n                var entry = document.createElement('li');\n                entry.appendChild(document.createTextNode(dateTime));\n                entry.appendChild(document.createTextNode('Foi realizada uma mudan\u00E7a de configura\u00E7\u00E3o do '+dev_id+''));\n                list.appendChild(entry);\n\n                get+='&message_number='+dateTime+'Foi realizada uma mudan\u00E7a de configura\u00E7\u00E3o do '+dev_id+'&pedido_update_id='+dev_id+'&freq_tem='+freq_tem+'&freq_fum='+freq_fum+'&sala_destino='+sala\n\n                location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)\n                console.log(\"correu location replace\")\n            \n                \n\n\n\n\n               // console.log(time)\n                return false;\n            }\n\n            window.addEventListener('scroll',function() {\n              //When scroll change, you save it on localStorage.\n              localStorage.setItem('scrollPosition',window.scrollY);\n          },false);\n        \n        </script>\n        \n        </head>\n        <body>\n        \n        <!---------------------------MENU LATERAL----------------------------->\n        \n        <div id=\"menu_lateral\" class=\"sidenav\">\n        " + salas(Room_array, IDM_array, show_room_array) + "\n        </div>\n        \n        <div class=\"main\">\n        \n            <!---------------------------PARTE SUPERIOR----------------------------->\n            <header>\n                  " + titulo() + "<p style=\"color: #eee;\">Indice de manuten\u00E7\u00E3o: " + IDM + "%</p>\n                  <span>\n                  <div class=\"meter red\">\n                    <span style=\"width: " + IDM + "%\"></span>\t\t\t\t\n                  </div>\n                  " + estado_cond() + "\n            </header>\n        \n          <section style=\"margin-top: 10px\">\n        \n              <!---------------------------PARTE INTERIOR ESQUERDA----------------------------->\n          <nav id=\"nodos\">\n        \n            " + nodos() + "\n      \n          </nav>\n          <!---------------------------PARTE INTERIOR DIREITA----------------------------->\n          <article>\n            <h1>A\u00E7\u00F5es Realizadas:</h1>\n                <ul id=\"lista\" >\n                  " + message_list() + "\n                </ul> \n          </article>\n        </section>\n        \n        </div>\n        \n        <!---------------------------SCRIPTS----------------------------->\n        \n        <script type=\"text/javascript\">\n            \n        //mostrar ou n\u00E3o a interface de mostragem dos dados\n            function mudar_dados(i){\n\n\n                if(document.getElementById('dados'+i).src.indexOf(\"images/white_server.png\") != -1){\n                  document.getElementById('dados'+i).src=\"images/grey_server.png\"\n                }\n                else if(document.getElementById('dados'+i).src.indexOf(\"images/grey_server.png\") != -1){\n                  document.getElementById('dados'+i).src=\"images/grey_server.png\"\n                }\n                else{\n                  document.getElementById('dados'+i).src=\"images/red_server.png\"\n                }\n\n                document.getElementById('def'+i).src=\"images/def_white.png\"\n        \n                document.getElementById('lista_dados'+i).classList.remove('mostrar');\n                document.getElementById('lista_dados'+i).classList.add('lista_dados');\n                document.getElementById('lista_def'+i).classList.remove('lista_def');\n                document.getElementById('lista_def'+i).classList.add('mostrar');\n\n                mostrar+='&mostrar='+i+'sim'\n\n                clearInterval(intervalId);\n                intervalId = setInterval(reload, 2000);\n                console.log(\"reload to timer\")\n                \n            }\n\n            //mostrar ou n\u00E3o a interface de mudan\u00E7a de defeni\u00E7\u00F5es\n            function mudar_def(i){\n\n                if(document.getElementById('dados'+i).src.indexOf(\"images/grey_server.png\") != -1){\n                  document.getElementById('dados'+i).src=\"images/white_server.png\"                \n                }\n                else if(document.getElementById('dados'+i).src.indexOf(\"images/white_server.png\") != -1){\n                  document.getElementById('dados'+i).src=\"images/white_server.png\"\n                }\n                else{\n                  document.getElementById('dados'+i).src=\"images/red_server.png\"\n                }\n                document.getElementById('def'+i).src=\"images/def_grey.png\"\n                document.getElementById('lista_dados'+i).classList.remove('lista_dados');\n                document.getElementById('lista_dados'+i).classList.add('mostrar');\n                document.getElementById('lista_def'+i).classList.remove('mostrar');\n                document.getElementById('lista_def'+i).classList.add('lista_def');\n\n                mostrar+='&mostrar='+i+'nao'\n\n                clearInterval(intervalId);\n                intervalId = setInterval(reload, 2000);\n                console.log(\"reload to timer\")\n            }\n            \n            //fun\u00E7\u00E3o que atua quando procuramos mudar o valor do ar condicionado colocando nas menssagens laterais\n            function mudar_ac(){\n    \n                var titulo=document.getElementById('titulo').innerHTML;\n    \n                var titulo_sep = titulo.split(\" \");\n    \n                sala=titulo_sep[1];\n    \n                //console.log(titulo_sep[1])\n                console.log(sala)\n    \n                if(document.getElementById('ar_condicionado').innerHTML==\"Desactivar Ar Condicionado\"){\n        \n                    document.getElementById('ar_condicionado').innerHTML=\"Ativar Ar Condicionado\"\n        \n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Ar condicionado desativado sala: '));\n                    //console.log(i)\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n                    \n                    get+='&message_number='+dateTime+'Ar condicionado desativado sala: '+sala+'&mudar_cond='+0\n\n                    location.replace('http://localhost:8080/?sala='+sala+''+get+''+mostrar)\n        \n                }\n                else{\n                    document.getElementById('ar_condicionado').innerHTML=\"Desactivar Ar Condicionado\"\n        \n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Ar condicionado ativado sala: '));\n                    console.log(sala)\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n\n                    get+='&message_number='+dateTime+'Ar condicionado ativado sala: '+sala+'&mudar_cond='+1\n\n                    location.replace('http://localhost:8080/?sala='+sala+''+get+''+mostrar)\n        \n                    console.log(entry)\n                }         \n            }\n            \n            //fun\u00E7\u00E3o que atua quando clicamos para mudar de sala\n            function mudar_sala(i){              \n                sala=i\n       \n                localStorage.removeItem('scrollPosition');\n\n                \n                for (let index = 1; index <= nr_nodos; index++) {\n     \n                  mostrar+='&mostrar='+index+'sim'\n                } \n                                \n                \n                location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)\n\n\n                \n                console.log(get)\n            }\n\n            //funcao que aumenta o intervalo de reload temporariamente quando o utilizador interage com o formul\u00E1rio\n            function hold(){\n\n              clearInterval(intervalId);\n              intervalId = setInterval(reload, 20000);\n              console.log(\"reload to timer\")\n\n            }\n            \n            //funcao que atua no reload da p\u00E1gina \n            function reload(){\n\n              var titulo=document.getElementById('titulo').innerHTML;\n    \n              var titulo_sep = titulo.split(\" \");\n  \n              i=titulo_sep[1];\n\n              location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)\n\n              \n\n              }\n          \n            //intervalo para dar auto reload \u00E0 janela\n            var intervalId = setInterval(reload, 5000);\n\n            //fun\u00E7\u00E3o para manter o mesmo n\u00EDvel de scroll na p\u00E1gina\n              window.addEventListener('load',function() {\n                if(localStorage.getItem('scrollPosition') !== null)\n                   window.scrollTo(0, localStorage.getItem('scrollPosition'));\n            },false);\n    \n        </script>\n        \n        </body>\n        </html> \n      ");
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }
                    var smoke_rate, temp_rate, sala_destino, params_4, data, params1, data1, err_2, err_3, params_5, data, err_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!dev_id) return [3 /*break*/, 9];
                                smoke_rate = req.query.freq_fum;
                                temp_rate = req.query.freq_tem;
                                sala_destino = req.query.sala_destino;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 7, , 8]);
                                params_4 = {
                                    ExpressionAttributeNames: {
                                        "#SR": "Smoke_Rate",
                                        "#TR": "TempHum_Rate",
                                        "#RI": "ROOM_ID"
                                    },
                                    ExpressionAttributeValues: {
                                        ":t": {
                                            N: "" + temp_rate + ""
                                        },
                                        ":y": {
                                            N: "" + smoke_rate + ""
                                        },
                                        ":z": {
                                            N: "" + sala_destino + ""
                                        }
                                    },
                                    Key: {
                                        "DEV_ID": {
                                            N: "" + dev_id + ""
                                        }
                                    },
                                    //ReturnValues: "ALL_NEW", 
                                    TableName: "configuration",
                                    UpdateExpression: "SET #SR = :y, #TR = :t, #RI = :z"
                                };
                                console.log(params_4);
                                return [4 /*yield*/, dbclient.send(new UpdateItemCommand(params_4))];
                            case 2:
                                data = _a.sent();
                                if (!(show_room_array[Room_array.indexOf('' + sala_destino + '')] == '0')) return [3 /*break*/, 6];
                                _a.label = 3;
                            case 3:
                                _a.trys.push([3, 5, , 6]);
                                params1 = {
                                    ExpressionAttributeNames: {
                                        "#S": "show1"
                                    },
                                    ExpressionAttributeValues: {
                                        ":y": {
                                            N: "1"
                                        }
                                    },
                                    Key: {
                                        "ROOM_ID": {
                                            N: "" + sala_destino + ""
                                        }
                                    },
                                    TableName: "ar_condicionado_sala",
                                    UpdateExpression: "SET #S = :y"
                                };
                                console.log(params1);
                                return [4 /*yield*/, dbclient.send(new UpdateItemCommand(params1))];
                            case 4:
                                data1 = _a.sent();
                                //console.log("Success - item added or updated", data);
                                //return data1;
                                show_room_array[Room_array.indexOf('' + sala_destino + '')] = 1;
                                return [3 /*break*/, 6];
                            case 5:
                                err_2 = _a.sent();
                                console.log("Error", err_2);
                                return [3 /*break*/, 6];
                            case 6: return [3 /*break*/, 8];
                            case 7:
                                err_3 = _a.sent();
                                console.log("Error", err_3);
                                return [3 /*break*/, 8];
                            case 8:
                                sala_anterior = 0;
                                _a.label = 9;
                            case 9:
                                if (!mudar_ac) return [3 /*break*/, 14];
                                _a.label = 10;
                            case 10:
                                _a.trys.push([10, 12, , 13]);
                                params_5 = {
                                    ExpressionAttributeNames: {
                                        "#AC": "AC"
                                    },
                                    ExpressionAttributeValues: {
                                        ":t": {
                                            N: "" + mudar_ac + ""
                                        }
                                    },
                                    Key: {
                                        "ROOM_ID": {
                                            N: "" + sala + ""
                                        }
                                    },
                                    //ReturnValues: "ALL_NEW", 
                                    TableName: "ar_condicionado_sala",
                                    UpdateExpression: "SET  #AC = :t"
                                };
                                return [4 /*yield*/, dbclient.send(new UpdateItemCommand(params_5))];
                            case 11:
                                data = _a.sent();
                                return [3 /*break*/, 13];
                            case 12:
                                err_4 = _a.sent();
                                console.log("Error", err_4);
                                return [3 /*break*/, 13];
                            case 13:
                                atualizar_ac = 1;
                                _a.label = 14;
                            case 14:
                                contagem_de_nodos();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var params, data_1, err_1, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nr_salas = 0;
                        params = {
                            // Specify which items in the results are returned.
                            FilterExpression: "ROOM_ID > :s ",
                            // Define the expression attribute value, which are substitutes for the values you want to compare.
                            ExpressionAttributeValues: {
                                ":s": { N: "0" }
                            },
                            // Set the projection expression, which the the attributes that you want.
                            ProjectionExpression: "ROOM_ID, AC, show1,IDM",
                            TableName: "ar_condicionado_sala"
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbclient.send(new ScanCommand(params))];
                    case 2:
                        data_1 = _a.sent();
                        IDM_array = [];
                        Room_array = [];
                        show_room_array = [];
                        data_1.Items.forEach(function (element, index, array) {
                            //console.log(element.ROOM_ID.N + " (" + element.AC.N + ")");
                            nr_salas = nr_salas + 1;
                            Room_array.push(element.ROOM_ID.N);
                            IDM_array.push(element.IDM.N);
                            show_room_array.push(element.show1.N);
                            return data_1;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log("Error", err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        if (sala == 1) {
                            if (show_room_array[Room_array.indexOf('' + 1 + '')] == 0) {
                                for (index = 1; index <= Room_array.length; index++) {
                                    if (show_room_array[Room_array.indexOf('' + index + '')] == '1') {
                                        sala = index;
                                        break;
                                    }
                                }
                            }
                        }
                        update_parametros();
                        return [2 /*return*/];
                }
            });
        });
    }
    contagem_de_salas();
});
app.listen(port, function () {
    console.log("server started a http://localhost:" + port + ".");
});
