import express = require('express');
import { textSpanEnd } from 'typescript';

const app=express();
const port = 8080;
app.use(express.static(__dirname + '/public'));

var nr_nodos=3;
var sala=1;
var string_mensagens=''

var nodos_mostrar=[];



for (let index = 1; index <= nr_nodos; index++) {
      
  nodos_mostrar.push(index)
}



function mostrar_adicionar(i){
  console.log("empurrou111")
  if (nodos_mostrar.includes(i)) {
    console.log("empurrou111")
  }else{
    nodos_mostrar.push(i)
    console.log("empurrou")
  }

}

function mostrar_remover(i){
  if (nodos_mostrar.includes(i)) {
    nodos_mostrar.splice(nodos_mostrar.indexOf(i),1)
    console.log("removeu")
  }
}



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
    var print2=''
    var print1=''
    var print11=''
    var print21=''
    for (let i = 0; i < nr_nodos; i++) {

      if (nodos_mostrar.includes(i+1)){
        print2='mostrar'
        print1='lista_dados'
        print11='grey_server.png'
        print21='def_white.png'
      }
      else{
        print2='lista_def'
        print1='mostrar'
        print11='white_server.png'
        print21='def_grey.png'
      }
          
      x+='<ul class="menu" id="menu'+(i+1)+'">'
      x+='<li>'
      x+='        <a class="def" onclick="mudar_dados('+(i+1)+')"><img style="height:88px; width: 98px " id="dados'+(i+1)+'" src="images/'+print11+'"></a><br>'
      x+=        '<a class="def" onclick="mudar_def('+(i+1)+')"><img id="def'+(i+1)+'" src="images/'+print21+'"></a>'
      x+=    '</li>'
      x+=    '<li>'
      x+=    '<ul class="'+print1+'" id="lista_dados'+(i+1)+'" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 300px">'
      x+=        '<li>ID: 1</li>'
      x+=        '<li>Temperatura: '+l+'</li>'
      x+=        '<li>Humidade: </li>'
      x+=        '<li>Fumo: </li>'
      x+=    '</ul> '
      x+=    '<ul class="'+print2+'" id="lista_def'+(i+1)+'" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 400px">'
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


function message_list(){

  var x=''
  var array_mensagens=string_mensagens.split('next->')

    for (let index = 1; index < array_mensagens.length; index++) {

        x+='<li>'+array_mensagens[index]+'</li>'
      
    }

  return(x)
 
}

app.get('/', (req, res) => {
  console.log("queryyyy",req.query)

    var messages=req.query.message_number

    var dados_sel=req.query.mostrar

    var tipo_dados= typeof dados_sel
    
    var tipo_msg = typeof messages;

    if (tipo_msg === 'undefined') {
      string_mensagens+=''
      //console.log("mensagem recebida não defenida")
    }
    else if (tipo_msg === 'string') {
      string_mensagens+='next->'+messages
    } else {
      for (let index = 0; index < messages.length; index++) {
      
        string_mensagens+='next->'+messages[index] ; 
    }
    }

    console.log("tipo_dados",tipo_dados)
    console.log("dados_sel",dados_sel)

    if (tipo_dados === 'undefined') {
      
      //console.log("mensagem recebida não defenida")
    }
    else if (tipo_dados === 'string') {
      for (let index = 0; index < nr_nodos; index++) {      
        if(dados_sel==((index+1)+'sim')){
            mostrar_adicionar((index+1))
        }
        else if(dados_sel==((index+1)+'nao')){
            mostrar_remover((index+1))
        }
      }     
    } 
    else {
      for (let index1 = 0; index1 < tipo_dados.length; index1++) {
      
        for (let index = 0; index < nr_nodos; index++) {      
          if(dados_sel[index1]==((index+1)+'sim')){
              mostrar_adicionar((index+1))
          }
          else if(dados_sel[index1]==((index+1)+'nao')){
              mostrar_remover((index+1))
          }
        }   
    }
    }
    //console.log("mensagem registada total",string_mensagens)

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
          height: 100%;
        
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
          height: 100%;
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
             
            var get='';

            var mostrar='';

            
            
            console.log(get)

        
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

                    get+='&message_number='+dateTime+'Foi realizada a mudança para a sala '+sala
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
                  `+message_list()+`
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

                mostrar+='&mostrar='+i+'sim'
                
            }
        
            function mudar_def(i){
                document.getElementById('dados'+i).src="images/white_server.png"
                document.getElementById('def'+i).src="images/def_grey.png"
        
                document.getElementById('lista_dados'+i).classList.remove('lista_dados');
                document.getElementById('lista_dados'+i).classList.add('mostrar');
                document.getElementById('lista_def'+i).classList.remove('mostrar');
                document.getElementById('lista_def'+i).classList.add('lista_def');

                mostrar+='&mostrar='+i+'nao'
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
                    
                    get+='&message_number='+dateTime+'Ar condicionado desativado sala: '+sala
        
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

                    get+='&message_number='+dateTime+'Ar condicionado ativado sala: '+sala
        
                    console.log(entry)
                }         
            }
            
            function mudar_sala(i){              
                sala=i
                location.replace('http://localhost:8080/?sala='+i+''+get)
                console.log(get)
            }

          
            var intervalId = setInterval(function(){

              var titulo=document.getElementById('titulo').innerHTML;
    
              var titulo_sep = titulo.split(" ");
  
              i=titulo_sep[1];
              location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)
              

              }, 10000);
    
        </script>
        
        </body>
        </html> 
      `)
  })

  app.listen(port,() => {
    console.log(`server started a http://localhost:${port}.`);
  })

  