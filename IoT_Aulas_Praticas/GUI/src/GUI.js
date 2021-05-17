"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 8080;
app.use(express.static(__dirname + '/public'));
var nr_salas = 3;
var sala = 1;
function salas() {
    var text_salas = '';
    for (var i = 1; i < 4; i++) {
        text_salas = text_salas + '<a onclick="mudar_sala(' + i + ')">Sala ' + (i) + '</a> ';
    }
    return (text_salas);
}
var l = 0;
var intervalId = setInterval(function () {
    l = l + 1;
}, 5000);
function nodos() {
    var x = '';
    for (var i = 1; i < 3; i++) {
        x += '<ul class="menu" id="menu' + i + '">';
        x += '<li>';
        x += '        <a class="def" onclick="mudar_dados(' + i + ')"><img style="height:88px; width: 98px " id="dados' + i + '" src="images/grey_server.png"></a><br>';
        x += '<a class="def" onclick="mudar_def(' + i + ')"><img id="def' + i + '" src="images/def_white.png"></a>';
        x += '</li>';
        x += '<li>';
        x += '<ul class="lista_dados" id="lista_dados' + i + '" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 300px">';
        x += '<li>ID: 1</li>';
        x += '<li>Temperatura: ' + l + '</li>';
        x += '<li>Humidade: </li>';
        x += '<li>Fumo: </li>';
        x += '</ul> ';
        x += '<ul class="mostrar" id="lista_def' + i + '" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 400px">';
        x += '<form action="#" onsubmit="return validateFormOnSubmit(this);" style="margin-left: 5px;">';
        x += '<label style="margin-top: 5px;" for="sala">Sala:</label><br>';
        x += '<input type="number" id="sala" name="sala" value="1"><br><br>';
        x += '<label for="freq_tem">Frequêcia Temp/Hum:</label><br>';
        x += '<input type="number" id="freq_tem" name="freq_tem" value="50">Hz<br><br>';
        x += '<label for="freq_fum">Frequêcia Fumo:</label><br>';
        x += '<input type="number" id="freq_fum" name="freq_fum" value="50">Hz<br><br>';
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
app.get('/', function (req, res) {
    console.log(req.query);
    var conv = req.query.sala + '';
    sala = parseInt(conv);
    res.send("<html>\n        <head>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <meta charset=\"UTF-8\">\n        <style>\n        \n        .sidenav {\n          height: 100%;\n          width: 160px;\n          position: fixed;\n          z-index: 1;\n          top: 0;\n          left: 0;\n          background-color: #111;\n          overflow-x: hidden;\n          padding-top: 20px;\n        }\n        \n        .sidenav a {\n          padding: 6px 8px 6px 16px;\n          text-decoration: none;\n          font-size: 25px;\n          color: #818181;\n          display: block;\n        }\n        \n        .sidenav a:hover {\n          color: #f1f1f1;\n        }\n        \n        .main {\n          margin-left: 160px; /* Same as the width of the sidenav */\n          font-size: 28px; /* Increased text to enable scrolling */\n          padding: 0px 10px;\n        }\n        \n        @media screen and (max-height: 450px) {\n          .sidenav {padding-top: 15px;}\n          .sidenav a {font-size: 18px;}\n        }\n        ul.menu li {\n          display:inline;\n        }\n        ul#lista li {\n          display: list-item;\n        }\n        \n        ul.lista_dados li {\n          display: list-item;\n        }\n        \n        ul.lista_def li {\n          display: list-item;\n        }\n        \n        article {\n          float: left;\n          padding: 20px;\n          width: 50%;\n          background-color: #f1f1f1;\n        \n        }\n        \n        * {\n          box-sizing: border-box;\n        }\n        \n        /* Create two columns/boxes that floats next to each other */\n        nav {\n          float: left;\n          width: 50%;\n          background: #ccc;\n          padding: 20px;\n        }\n        \n        nav ul {\n          list-style-type: none;\n          padding: 0;\n        }\n        \n        .def:hover {\n            opacity: 0.5;\n        }\n        .mostrar{\n            display: none;\n        }\n        .danger{\n            color: red;\n        }\n        </style>\n\n        <script type=\"text/javascript\">\n        \n            var number_of_rooms=" + nr_salas + ";\n            var get=''\n\n            var message_number=1\n        \n            function validateFormOnSubmit(theForm) {\n        \n                var sala = theForm.sala.value;\n                var  freq_tem= theForm.freq_tem.value;\n                var freq_fum = theForm.freq_fum.value;\n                if (sala==3) {\n        \n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Foi realizada a mudan\u00E7a para a sala '));\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n\n                    get+='&message_number'+message_number+'='+dateTime+'Foi realizada a mudan\u00E7a para a sala '+sala\n                }\n        \n                console.log(time)\n                return false;\n            }\n        \n        </script>\n        \n        </head>\n        <body>\n        \n        <!---------------------------MENU LATERAL----------------------------->\n        \n        <div id=\"menu_lateral\" class=\"sidenav\">\n        " + salas() + "\n        </div>\n        \n        <div class=\"main\">\n        \n            <!---------------------------PARTE SUPERIOR----------------------------->\n            <header>\n                  " + titulo() + "\n                  <span>Indice de Manuten\u00E7\u00E3o: 75%\n                  <button onclick=\"mudar_ac()\" id=\"ar_condicionado\" style=\"margin-left: 21%; padding: 10px;\">Ativar Ar Condicionado</button></span>\n            </header>\n        \n          <section style=\"margin-top: 10px\">\n        \n              <!---------------------------PARTE INTERIOR ESQUERDA----------------------------->\n          <nav id=\"nodos\">\n        \n            " + nodos() + "\n      \n          </nav>\n          <!---------------------------PARTE INTERIOR DIREITA----------------------------->\n          <article>\n            <h1>A\u00E7\u00F5es Realizadas:</h1>\n                <ul id=\"lista\" >\n                  <li class=\"danger\">message1</li>\n                  <li>message2 </li>\n                  <li>message3 </li>\n                  <li>message3 </li>\n                </ul> \n          </article>\n        </section>\n        \n        </div>\n        \n        <!---------------------------SCRIPTS----------------------------->\n        \n        <script type=\"text/javascript\">\n            \n            \n            function mudar_dados(i){\n                document.getElementById('dados'+i).src=\"images/grey_server.png\"\n                document.getElementById('def'+i).src=\"images/def_white.png\"\n        \n                document.getElementById('lista_dados'+i).classList.remove('mostrar');\n                document.getElementById('lista_dados'+i).classList.add('lista_dados');\n                document.getElementById('lista_def'+i).classList.remove('lista_def');\n                document.getElementById('lista_def'+i).classList.add('mostrar');\n                \n            }\n        \n            function mudar_def(i){\n                document.getElementById('dados'+i).src=\"images/white_server.png\"\n                document.getElementById('def'+i).src=\"images/def_grey.png\"\n        \n                document.getElementById('lista_dados'+i).classList.remove('lista_dados');\n                document.getElementById('lista_dados'+i).classList.add('mostrar');\n                document.getElementById('lista_def'+i).classList.remove('mostrar');\n                document.getElementById('lista_def'+i).classList.add('lista_def');\n            }\n        \n            function mudar_ac(){\n    \n                var titulo=document.getElementById('titulo').innerHTML;\n    \n                var titulo_sep = titulo.split(\" \");\n    \n                sala=titulo_sep[1];\n    \n                //console.log(titulo_sep[1])\n                console.log(sala)\n    \n                if(document.getElementById('ar_condicionado').innerHTML==\"Desactivar Ar condicionado\"){\n        \n                    document.getElementById('ar_condicionado').innerHTML=\"Ativar Ar condicionado\"\n        \n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Ar condicionado desativado sala: '));\n                    //console.log(i)\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n                    \n                    get+='&message_number'+message_number+'='+dateTime+'Ar condicionado desativado sala: '+sala\n        \n                }\n                else{\n                    document.getElementById('ar_condicionado').innerHTML=\"Desactivar Ar condicionado\"\n        \n                    var today = new Date();\n        \n                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n        \n                    var time = today.getHours() + \":\" + today.getMinutes() + \":\" + today.getSeconds();\n        \n                    var dateTime = date+' '+time+'\u21E8';\n        \n                    var list = document.getElementById('lista');\n                    var entry = document.createElement('li');\n                    entry.appendChild(document.createTextNode(dateTime));\n                    entry.appendChild(document.createTextNode('Ar condicionado ativado sala: '));\n                    console.log(sala)\n                    entry.appendChild(document.createTextNode(sala));\n                    list.appendChild(entry);\n\n                    get+='&message_number'+message_number+'='+dateTime+'Ar condicionado ativado sala: '+sala\n        \n                    console.log(entry)\n                }         \n            }\n            \n            function mudar_sala(i){              \n                sala=i\n                location.replace('http://localhost:8080/?sala='+i+get)\n                console.log(get)\n            }\n\n          \n            var intervalId = setInterval(function(){\n\n              var titulo=document.getElementById('titulo').innerHTML;\n    \n              var titulo_sep = titulo.split(\" \");\n  \n              i=titulo_sep[1];\n\n              location.replace('http://localhost:8080/?sala='+i+get)\n\n              }, 5000);\n    \n        </script>\n        \n        </body>\n        </html> \n      ");
});
app.listen(port, function () {
    console.log("server started a http://localhost:" + port + ".");
});
