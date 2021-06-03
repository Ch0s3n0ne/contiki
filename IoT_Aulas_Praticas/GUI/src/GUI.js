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
var tools = require('./function.js');
var app = express();
var port = 8080;
app.use(express.static(__dirname + '/public'));
var nr_nodos = 1;
var sala = 1;
var sala_anterior = 0;
var string_mensagens = '';
var i = 0;
var nodos_mostrar = [];
var id_array = [];
var smoke_array = [];
var temp_array = [];
var dbclient = new DynamoDBClient({ region: REGION });
//-----------------------fim da inicialização de variáveis--------------------------------
var l = 0;
var intervalId = setInterval(function () {
    l = l + 1;
    //console.log("x")
}, 5000);
function contagem_de_salas() {
    return __awaiter(this, void 0, void 0, function () {
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
        function salas() {
            var text_salas = '';
            for (var i_1 = 1; i_1 <= nr_salas; i_1++) {
                text_salas = text_salas + '<a onclick="mudar_sala(' + i_1 + ')">Sala ' + (i_1) + '</a> ';
            }
            return (text_salas);
        }
        function nodos() {
            var x = '';
            var print2 = '';
            var print1 = '';
            var print11 = '';
            var print21 = '';
            console.log("nodos a mostrar");
            console.log(nodos_mostrar);
            for (var i_2 = 0; i_2 < nr_nodos; i_2++) {
                if (nodos_mostrar.includes(i_2 + 1)) {
                    print2 = 'mostrar';
                    print1 = 'lista_dados';
                    print11 = 'grey_server.png';
                    print21 = 'def_white.png';
                }
                else {
                    print2 = 'lista_def';
                    print1 = 'mostrar';
                    print11 = 'white_server.png';
                    print21 = 'def_grey.png';
                }
                x += '<ul class="menu" id="menu' + (i_2 + 1) + '">';
                x += '<li>';
                x += '        <a class="def" onclick="mudar_dados(' + (i_2 + 1) + ')"><img style="height:88px; width: 98px " id="dados' + (i_2 + 1) + '" src="images/' + print11 + '"></a><br>';
                x += '<a class="def" onclick="mudar_def(' + (i_2 + 1) + ')"><img id="def' + (i_2 + 1) + '" src="images/' + print21 + '"></a>';
                x += '</li>';
                x += '<li>';
                x += '<ul class="' + print1 + '" id="lista_dados' + (i_2 + 1) + '" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 300px">';
                x += '<li>ID: ' + id_array[i_2] + '</li>';
                x += '<li>Temperatura: ' + l + '</li>';
                x += '<li>Humidade: </li>';
                x += '<li>Fumo: </li>';
                x += '</ul> ';
                x += '<ul class="' + print2 + '" id="lista_def' + (i_2 + 1) + '" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 400px">';
                x += '<form onsubmit="return validateFormOnSubmit(this);" style="margin-left: 5px;">';
                x += '<input style="display: none;" onclick="hold()"  type="number" id="dev_id" name="dev_id" value="' + id_array[i_2] + '"><br><br>';
                x += '<label style="margin-top: 5px;" for="sala">Sala:</label><br>';
                x += '<input onclick="hold()"  type="number" min="1" max="' + nr_salas + '" id="sala" name="sala" value="' + sala + '"><br><br>';
                x += '<label for="freq_tem">Tempo de aquisição Temp/Hum:</label><br>';
                x += '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_tem" name="freq_tem" value="' + temp_array[i_2] + '">s<br><br>';
                x += '<label for="freq_fum">Tempo de aquisição Fumo:</label><br>';
                x += '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_fum" name="freq_fum" value="' + smoke_array[i_2] + '">s<br><br>';
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
            console.log("pedido de mudança");
        }
        function titulo() {
            var x = '';
            if (Number.isNaN(sala)) {
                x += '<h2 id="titulo">Sala 1 :</h2>';
            }
            else {
                x += '<h2 id="titulo">Sala ' + sala + ' :</h2>';
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
        var nr_salas, params, data_1, err_1;
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
                        ProjectionExpression: "ROOM_ID, AC",
                        TableName: "ar_condicionado_sala"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dbclient.send(new ScanCommand(params))];
                case 2:
                    data_1 = _a.sent();
                    data_1.Items.forEach(function (element, index, array) {
                        //console.log(element.ROOM_ID.N + " (" + element.AC.N + ")");
                        nr_salas = nr_salas + 1;
                        return data_1;
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Error", err_1);
                    return [3 /*break*/, 4];
                case 4:
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
                        console.log("tipo_dados", tipo_dados);
                        console.log("dados_sel", dados_sel);
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
                        function update_parametros() {
                            return __awaiter(this, void 0, void 0, function () {
                                //--------------------------------------------------inicio das funções async------------------------------------
                                function contagem_de_nodos() {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var params_1, data_2, err_3, reference_object, i, index;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    console.log("correu função no reload");
                                                    if (!(sala != sala_anterior)) return [3 /*break*/, 5];
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
                                                    data_2 = _a.sent();
                                                    data_2.Items.forEach(function (element, index, array) {
                                                        console.log(element.DEV_ID.N);
                                                        id_array.push(element.DEV_ID.N);
                                                        smoke_array.push(element.Smoke_Rate.N);
                                                        temp_array.push(element.TempHum_Rate.N);
                                                        //nr_resultados=nr_resultados+1;
                                                        return data_2;
                                                    });
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    err_3 = _a.sent();
                                                    console.log("Error", err_3);
                                                    return [3 /*break*/, 4];
                                                case 4:
                                                    id_array.sort();
                                                    reference_object = {};
                                                    for (i = 0; i < id_array.length; i++) {
                                                        reference_object[id_array[i]] = i;
                                                    }
                                                    smoke_array.sort(function (a, b) {
                                                        return reference_object[a] - reference_object[b];
                                                    });
                                                    temp_array.sort(function (a, b) {
                                                        return reference_object[a] - reference_object[b];
                                                    });
                                                    console.log(id_array);
                                                    console.log(smoke_array);
                                                    console.log(temp_array);
                                                    nr_nodos = id_array.length;
                                                    nodos_mostrar = [];
                                                    for (index = 1; index <= nr_nodos; index++) {
                                                        nodos_mostrar.push(index);
                                                    }
                                                    sala_anterior = sala;
                                                    _a.label = 5;
                                                case 5:
                                                    //--------------------------------print da página HTML------------------------------------------
                                                    res.send("<html>\n        <head>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <meta charset=\"UTF-8\">\n        <style>\n        \n        .sidenav {\n          height: 100%;\n          width: 160px;\n          position: fixed;\n          z-index: 1;\n          top: 0;\n          left: 0;\n          background-color: #111;\n          overflow-x: hidden;\n          padding-top: 20px;\n        }\n        \n        .sidenav a {\n          padding: 6px 8px 6px 16px;\n          text-decoration: none;\n          font-size: 25px;\n          color: #818181;\n          display: block;\n        }\n        \n        .sidenav a:hover {\n          color: #f1f1f1;\n        }\n        \n        .main {\n          margin-left: 160px; /* Same as the width of the sidenav */\n          font-size: 28px; /* Increased text to enable scrolling */\n          padding: 0px 10px;\n        }\n        \n        @media screen and (max-height: 450px) {\n          .sidenav {padding-top: 15px;}\n          .sidenav a {font-size: 18px;}\n        }\n        ul.menu li {\n          display:inline;\n        }\n        ul#lista li {\n          display: list-item;\n        }\n        \n        ul.lista_dados li {\n          display: list-item;\n        }\n        \n        ul.lista_def li {\n          display: list-item;\n        }\n        \n        article {\n          float: left;\n          padding: 20px;\n          width: 50%;\n          background-color: #f1f1f1;\n         \n        \n        }\n        \n        * {\n          box-sizing: border-box;\n        }\n        \n        /* Create two columns/boxes that floats next to each other */\n        nav {\n          float: left;\n          width: 50%;\n          background: #ccc;\n          padding: 20px;\n          \n        }\n        \n        nav ul {\n          list-style-type: none;\n          padding: 0;\n        }\n        \n        .def:hover {\n            opacity: 0.5;\n        }\n        .mostrar{\n            display: none;\n        }\n        .danger{\n            color: red;\n        }\n        </style>\n\n        <script type=\"text/javascript\">\n             \n            var get='';\n\n            var mostrar='';\n            \n            var nr_nodos=" + nr_nodos + "\n            \n            console.log(get)\n\n            //fun\u00E7\u00E3o que trata dos dados ap\u00F3s clicarmos no bot\u00E3o de enviar\n            function validateFormOnSubmit(theForm) {\n\n                var titulo=document.getElementById('titulo').innerHTML;\n    \n                var titulo_sep = titulo.split(\" \");\n    \n                i=titulo_sep[1];\n        \n                var sala = theForm.sala.value;\n                var  freq_tem= theForm.freq_tem.value;\n                var freq_fum = theForm.freq_fum.value;\n                var dev_id = theForm.dev_id.value;\n                console.log(dev_id)                \n\n                if(i!=sala){\n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Foi realizada a mudan\u00E7a de '+dev_id+' para a sala '));\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n\n                    get+='&message_number='+dateTime+'Foi realizada a mudan\u00E7a de '+dev_id+ ' para a sala '+sala+'&pedido_update_id='+dev_id+'&freq_tem='+freq_tem+'&freq_fum='+freq_fum+'&sala_destino='+sala\n\n                    location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)\n                    console.log(\"correu location replace\")\n            }\n               // console.log(time)\n                return false;\n            }\n\n            window.addEventListener('scroll',function() {\n              //When scroll change, you save it on localStorage.\n              localStorage.setItem('scrollPosition',window.scrollY);\n          },false);\n        \n        </script>\n        \n        </head>\n        <body>\n        \n        <!---------------------------MENU LATERAL----------------------------->\n        \n        <div id=\"menu_lateral\" class=\"sidenav\">\n        " + salas() + "\n        </div>\n        \n        <div class=\"main\">\n        \n            <!---------------------------PARTE SUPERIOR----------------------------->\n            <header>\n                  " + titulo() + "\n                  <span>Indice de Manuten\u00E7\u00E3o: 75%\n                  <button onclick=\"mudar_ac()\" id=\"ar_condicionado\" style=\"margin-left: 21%; padding: 10px;\">Ativar Ar Condicionado</button></span>\n            </header>\n        \n          <section style=\"margin-top: 10px\">\n        \n              <!---------------------------PARTE INTERIOR ESQUERDA----------------------------->\n          <nav id=\"nodos\">\n        \n            " + nodos() + "\n      \n          </nav>\n          <!---------------------------PARTE INTERIOR DIREITA----------------------------->\n          <article>\n            <h1>A\u00E7\u00F5es Realizadas:</h1>\n                <ul id=\"lista\" >\n                  " + message_list() + "\n                </ul> \n          </article>\n        </section>\n        \n        </div>\n        \n        <!---------------------------SCRIPTS----------------------------->\n        \n        <script type=\"text/javascript\">\n            \n        //mostrar ou n\u00E3o a interface de mostragem dos dados\n            function mudar_dados(i){\n                document.getElementById('dados'+i).src=\"images/grey_server.png\"\n                document.getElementById('def'+i).src=\"images/def_white.png\"\n        \n                document.getElementById('lista_dados'+i).classList.remove('mostrar');\n                document.getElementById('lista_dados'+i).classList.add('lista_dados');\n                document.getElementById('lista_def'+i).classList.remove('lista_def');\n                document.getElementById('lista_def'+i).classList.add('mostrar');\n\n                mostrar+='&mostrar='+i+'sim'\n                \n            }\n\n            //mostrar ou n\u00E3o a interface de mudan\u00E7a de defeni\u00E7\u00F5es\n            function mudar_def(i){\n                document.getElementById('dados'+i).src=\"images/white_server.png\"\n                document.getElementById('def'+i).src=\"images/def_grey.png\"\n        \n                document.getElementById('lista_dados'+i).classList.remove('lista_dados');\n                document.getElementById('lista_dados'+i).classList.add('mostrar');\n                document.getElementById('lista_def'+i).classList.remove('mostrar');\n                document.getElementById('lista_def'+i).classList.add('lista_def');\n\n                mostrar+='&mostrar='+i+'nao'\n            }\n            \n            //fun\u00E7\u00E3o que atua quando procuramos mudar o valor do ar condicionado colocando nas menssagens laterais\n            function mudar_ac(){\n    \n                var titulo=document.getElementById('titulo').innerHTML;\n    \n                var titulo_sep = titulo.split(\" \");\n    \n                sala=titulo_sep[1];\n    \n                //console.log(titulo_sep[1])\n                console.log(sala)\n    \n                if(document.getElementById('ar_condicionado').innerHTML==\"Desactivar Ar condicionado\"){\n        \n                    document.getElementById('ar_condicionado').innerHTML=\"Ativar Ar condicionado\"\n        \n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Ar condicionado desativado sala: '));\n                    //console.log(i)\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n                    \n                    get+='&message_number='+dateTime+'Ar condicionado desativado sala: '+sala\n\n                    location.replace('http://localhost:8080/?sala='+sala+''+get+''+mostrar)\n        \n                }\n                else{\n                    document.getElementById('ar_condicionado').innerHTML=\"Desactivar Ar condicionado\"\n        \n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Ar condicionado ativado sala: '));\n                    console.log(sala)\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n\n                    get+='&message_number='+dateTime+'Ar condicionado ativado sala: '+sala\n\n                    location.replace('http://localhost:8080/?sala='+sala+''+get+''+mostrar)\n        \n                    console.log(entry)\n                }         \n            }\n            \n            //fun\u00E7\u00E3o que atua quando clicamos para mudar de sala\n            function mudar_sala(i){              \n                sala=i\n       \n                localStorage.removeItem('scrollPosition');\n\n                \n                for (let index = 1; index <= nr_nodos; index++) {\n     \n                  mostrar+='&mostrar='+index+'sim'\n                } \n                                \n                \n                location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)\n\n\n                \n                console.log(get)\n            }\n\n            //funcao que aumenta o intervalo de reload temporariamente quando o utilizador interage com o formul\u00E1rio\n            function hold(){\n\n              clearInterval(intervalId);\n              intervalId = setInterval(reload, 15000);\n              console.log(\"reload to timer\")\n\n            }\n            \n            //funcao que atua no reload da p\u00E1gina \n            function reload(){\n\n              var titulo=document.getElementById('titulo').innerHTML;\n    \n              var titulo_sep = titulo.split(\" \");\n  \n              i=titulo_sep[1];\n\n              location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)\n\n              \n\n              }\n          \n            //intervalo para dar auto reload \u00E0 janela\n            var intervalId = setInterval(reload, 5000);\n\n            //fun\u00E7\u00E3o para manter o mesmo n\u00EDvel de scroll na p\u00E1gina\n              window.addEventListener('load',function() {\n                if(localStorage.getItem('scrollPosition') !== null)\n                   window.scrollTo(0, localStorage.getItem('scrollPosition'));\n            },false);\n    \n        </script>\n        \n        </body>\n        </html> \n      ");
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                                var smoke_rate, temp_rate, sala_destino, params_2, data, err_2, conv;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!dev_id) return [3 /*break*/, 5];
                                            console.log("voltou a entrar");
                                            smoke_rate = req.query.freq_fum;
                                            temp_rate = req.query.freq_tem;
                                            sala_destino = req.query.sala_destino;
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            params_2 = {
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
                                            console.log(params_2);
                                            return [4 /*yield*/, dbclient.send(new UpdateItemCommand(params_2))];
                                        case 2:
                                            data = _a.sent();
                                            console.log("Success - item added or updated", data);
                                            return [2 /*return*/, data];
                                        case 3:
                                            err_2 = _a.sent();
                                            console.log("Error", err_2);
                                            return [3 /*break*/, 4];
                                        case 4:
                                            sala_anterior = 0;
                                            _a.label = 5;
                                        case 5:
                                            conv = req.query.sala + '';
                                            sala = parseInt(conv);
                                            if (!sala) {
                                                sala = 1;
                                            }
                                            contagem_de_nodos();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }
                        update_parametros();
                        //---antes
                    });
                    return [2 /*return*/];
            }
        });
    });
}
contagem_de_salas();
app.listen(port, function () {
    console.log("server started a http://localhost:" + port + ".");
});
