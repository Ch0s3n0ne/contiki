import express = require('express');
import { textSpanEnd } from 'typescript';

const app=express();
const port = 8080;
app.use(express.static(__dirname + '/public'));

var nr_salas=3;
var sala=1;

function salas(){
    
    var text_salas=''

    for (let i = 1; i < 4; i++) {
        
        text_salas=text_salas+'<a onclick="mudar_sala('+i+')">Sala '+(i)+'</a> '
        
    }
return (text_salas)  
}
var l=0;
var intervalId = setInterval(function(){
  l=l+1;
}, 5000);
function nodos(){

    var x=''

    for (let i = 1; i < 3; i++) {
        
    x+='<ul class="menu" id="menu'+i+'">'
    x+='<li>'
    x+='        <a class="def" onclick="mudar_dados('+i+')"><img style="height:88px; width: 98px " id="dados'+i+'" src="images/grey_server.png"></a><br>'
    x+=        '<a class="def" onclick="mudar_def('+i+')"><img id="def'+i+'" src="images/def_white.png"></a>'
    x+=    '</li>'
    x+=    '<li>'
    x+=    '<ul class="lista_dados" id="lista_dados'+i+'" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 300px">'
    x+=        '<li>ID: 1</li>'
    x+=        '<li>Temperatura: '+l+'</li>'
    x+=        '<li>Humidade: </li>'
    x+=        '<li>Fumo: </li>'
    x+=    '</ul> '
    x+=    '<ul class="mostrar" id="lista_def'+i+'" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 400px">'
    x+=        '<form action="#" onsubmit="return validateFormOnSubmit(this);" style="margin-left: 5px;">'
    x+=            '<label style="margin-top: 5px;" for="sala">Sala:</label><br>'
    x+=           '<input type="number" id="sala" name="sala" value="1"><br><br>'
    x+=            '<label for="freq_tem">Frequêcia Temp/Hum:</label><br>'
    x+=           '<input type="number" id="freq_tem" name="freq_tem" value="50">Hz<br><br>'
    x+=           '<label for="freq_fum">Frequêcia Fumo:</label><br>'
    x+=           '<input type="number" id="freq_fum" name="freq_fum" value="50">Hz<br><br>'
    x+=           '<input style=" padding: 5px; float:right;" type="submit" value="Enviar">'
    x+=       '</form>'
    x+=   '</ul>'  
    x+=   '</li>'
    x+=   '</ul>'

    }
    console.log("fez refresh")
    return(x)
}

function room_register(){

    console.log("pedido de mudança")
}

function titulo(){

    var x=''
    if (Number.isNaN(sala)) {
        x+='<h2 id="titulo">Sala 1 :</h2>'
    }
    else{
        x+='<h2 id="titulo">Sala '+sala+ ' :</h2>'
    }
    
    return(x)

}


app.get('/', (req, res) => {
    console.log(req.query)
    var conv=req.query.sala+''  
    sala=parseInt(conv)
    res.send(
        `<html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <style>
        
        .sidenav {
          height: 100%;
          width: 160px;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          padding-top: 20px;
        }
        
        .sidenav a {
          padding: 6px 8px 6px 16px;
          text-decoration: none;
          font-size: 25px;
          color: #818181;
          display: block;
        }
        
        .sidenav a:hover {
          color: #f1f1f1;
        }
        
        .main {
          margin-left: 160px; /* Same as the width of the sidenav */
          font-size: 28px; /* Increased text to enable scrolling */
          padding: 0px 10px;
        }
        
        @media screen and (max-height: 450px) {
          .sidenav {padding-top: 15px;}
          .sidenav a {font-size: 18px;}
        }
        ul.menu li {
          display:inline;
        }
        ul#lista li {
          display: list-item;
        }
        
        ul.lista_dados li {
          display: list-item;
        }
        
        ul.lista_def li {
          display: list-item;
        }
        
        article {
          float: left;
          padding: 20px;
          width: 50%;
          background-color: #f1f1f1;
        
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Create two columns/boxes that floats next to each other */
        nav {
          float: left;
          width: 50%;
          background: #ccc;
          padding: 20px;
        }
        
        nav ul {
          list-style-type: none;
          padding: 0;
        }
        
        .def:hover {
            opacity: 0.5;
        }
        .mostrar{
            display: none;
        }
        .danger{
            color: red;
        }
        </style>

        <script type="text/javascript">
        
            var number_of_rooms=`+nr_salas+`;
            var get=''

            var message_number=1
        
            function validateFormOnSubmit(theForm) {
        
                var sala = theForm.sala.value;
                var  freq_tem= theForm.freq_tem.value;
                var freq_fum = theForm.freq_fum.value;
                if (sala==3) {
        
                    var today = new Date();
        
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
                    var dateTime = date+' '+time+'⇨';
        
                    var list = document.getElementById('lista');
                    var entry = document.createElement('li');
                    entry.appendChild(document.createTextNode(dateTime));
                    entry.appendChild(document.createTextNode('Foi realizada a mudança para a sala '));
                    entry.appendChild(document.createTextNode(sala));
                    list.appendChild(entry);

                    get+='&message_number'+message_number+'='+dateTime+'Foi realizada a mudança para a sala '+sala
                }
        
                console.log(time)
                return false;
            }
        
        </script>
        
        </head>
        <body>
        
        <!---------------------------MENU LATERAL----------------------------->
        
        <div id="menu_lateral" class="sidenav">
        `+salas()+`
        </div>
        
        <div class="main">
        
            <!---------------------------PARTE SUPERIOR----------------------------->
            <header>
                  `+titulo()+`
                  <span>Indice de Manutenção: 75%
                  <button onclick="mudar_ac()" id="ar_condicionado" style="margin-left: 21%; padding: 10px;">Ativar Ar Condicionado</button></span>
            </header>
        
          <section style="margin-top: 10px">
        
              <!---------------------------PARTE INTERIOR ESQUERDA----------------------------->
          <nav id="nodos">
        
            `+nodos()+`
      
          </nav>
          <!---------------------------PARTE INTERIOR DIREITA----------------------------->
          <article>
            <h1>Ações Realizadas:</h1>
                <ul id="lista" >
                  <li class="danger">message1</li>
                  <li>message2 </li>
                  <li>message3 </li>
                  <li>message3 </li>
                </ul> 
          </article>
        </section>
        
        </div>
        
        <!---------------------------SCRIPTS----------------------------->
        
        <script type="text/javascript">
            
            
            function mudar_dados(i){
                document.getElementById('dados'+i).src="images/grey_server.png"
                document.getElementById('def'+i).src="images/def_white.png"
        
                document.getElementById('lista_dados'+i).classList.remove('mostrar');
                document.getElementById('lista_dados'+i).classList.add('lista_dados');
                document.getElementById('lista_def'+i).classList.remove('lista_def');
                document.getElementById('lista_def'+i).classList.add('mostrar');
                
            }
        
            function mudar_def(i){
                document.getElementById('dados'+i).src="images/white_server.png"
                document.getElementById('def'+i).src="images/def_grey.png"
        
                document.getElementById('lista_dados'+i).classList.remove('lista_dados');
                document.getElementById('lista_dados'+i).classList.add('mostrar');
                document.getElementById('lista_def'+i).classList.remove('mostrar');
                document.getElementById('lista_def'+i).classList.add('lista_def');
            }
        
            function mudar_ac(){
    
                var titulo=document.getElementById('titulo').innerHTML;
    
                var titulo_sep = titulo.split(" ");
    
                sala=titulo_sep[1];
    
                //console.log(titulo_sep[1])
                console.log(sala)
    
                if(document.getElementById('ar_condicionado').innerHTML=="Desactivar Ar condicionado"){
        
                    document.getElementById('ar_condicionado').innerHTML="Ativar Ar condicionado"
        
                    var today = new Date();
        
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
                    var dateTime = date+' '+time+'⇨';
        
                    var list = document.getElementById('lista');
                    var entry = document.createElement('li');
                    entry.appendChild(document.createTextNode(dateTime));
                    entry.appendChild(document.createTextNode('Ar condicionado desativado sala: '));
                    //console.log(i)
                    entry.appendChild(document.createTextNode(sala));
                    list.appendChild(entry);
                    
                    get+='&message_number'+message_number+'='+dateTime+'Ar condicionado desativado sala: '+sala
        
                }
                else{
                    document.getElementById('ar_condicionado').innerHTML="Desactivar Ar condicionado"
        
                    var today = new Date();
        
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
                    var dateTime = date+' '+time+'⇨';
        
                    var list = document.getElementById('lista');
                    var entry = document.createElement('li');
                    entry.appendChild(document.createTextNode(dateTime));
                    entry.appendChild(document.createTextNode('Ar condicionado ativado sala: '));
                    console.log(sala)
                    entry.appendChild(document.createTextNode(sala));
                    list.appendChild(entry);

                    get+='&message_number'+message_number+'='+dateTime+'Ar condicionado ativado sala: '+sala
        
                    console.log(entry)
                }         
            }
            
            function mudar_sala(i){              
                sala=i
                location.replace('http://localhost:8080/?sala='+i+get)
                console.log(get)
            }

          
            var intervalId = setInterval(function(){

              var titulo=document.getElementById('titulo').innerHTML;
    
              var titulo_sep = titulo.split(" ");
  
              i=titulo_sep[1];

              location.replace('http://localhost:8080/?sala='+i+get)

              }, 5000);
    
        </script>
        
        </body>
        </html> 
      `)
  })

  app.listen(port,() => {
    console.log(`server started a http://localhost:${port}.`);
  })

  