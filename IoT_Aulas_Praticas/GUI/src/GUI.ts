import express = require('express');
import { textSpanEnd } from 'typescript';

const { DynamoDBClient, ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"
var tools = require('./function.js');

const app=express();
const port = 8080;
app.use(express.static(__dirname + '/public'));

var nr_nodos=4;

var sala=1;
var string_mensagens=''
var nodos_mostrar=[];

const dbclient = new DynamoDBClient({ region: REGION });
  var l=0;
  var intervalId = setInterval(function(){
    l=l+1;
    console.log("x")
  }, 5000);
  
  async function contagem_de_salas() {
    
    var nr_salas=0;
    const params = {
      // Specify which items in the results are returned.
      FilterExpression: "ROOM_ID > :s ",
      // Define the expression attribute value, which are substitutes for the values you want to compare.
      ExpressionAttributeValues: {
        
        ":s": { N: "0" },
        
      },
      // Set the projection expression, which the the attributes that you want.
      ProjectionExpression: "ROOM_ID, AC",
      TableName: "ar_condicionado_sala",
    };
    try {
      const data = await dbclient.send(new ScanCommand(params));
      data.Items.forEach(function (element, index, array) {
        //console.log(element.ROOM_ID.N + " (" + element.AC.N + ")");
        nr_salas=nr_salas+1;
        return data;
      });
    } catch (err) {
      console.log("Error", err);
    }
    console.log(nr_salas)

    var i=1;
    var id_array=[];
    var room_array=[];


      // Create DynamoDB service object
      

      async function contagem_de_nodos() {


        while(i<=nr_salas){

          // Set the parameters
            const params = {
              KeyConditionExpression: "ROOM_ID = :s ",
            
              ExpressionAttributeValues: {
                ":s": { N: ""+i+"" },
          
              },
              ProjectionExpression: "ROOM_ID, DEV_ID",
              TableName: "CONFIGURATION",
            };

            try {
              const results = await dbclient.send(new QueryCommand(params));
              results.Items.forEach(function (element, index, array) {
                console.log(element.DEV_ID.N );
                id_array.push(element.DEV_ID.N);
                room_array.push(element.ROOM_ID.N);
                

              });

            } catch (err) {
              console.error(err);
            }
            console.log(i)

            if(i==nr_salas){
              console.log(id_array)
              console.log(room_array)
            



// -----------------------------------funções de contrução da interface-----------------------------------------------------------



for (let index = 1; index <= nr_nodos; index++) {
      
  nodos_mostrar.push(index)
}



function mostrar_adicionar(i){

  if (nodos_mostrar.includes(i)) {

  }else{
    nodos_mostrar.push(i)
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

    for (let i = 1; i <= nr_salas; i++) {
        
        text_salas=text_salas+'<a onclick="mudar_sala('+i+')">Sala '+(i)+'</a> '
        
    }
return (text_salas)  
}



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
      x+=           '<input onclick="hold()"  type="number" min="1" max="'+nr_nodos+'" id="sala" name="sala" value="1"><br><br>'
      x+=            '<label for="freq_tem">Tempo de aquisição Temp/Hum:</label><br>'
      x+=           '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_tem" name="freq_tem" value="50">s<br><br>'
      x+=           '<label for="freq_fum">Tempo de aquisição Fumo:</label><br>'
      x+=           '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_fum" name="freq_fum" value="50">s<br><br>'
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

  //-------------------------------------processamento de comandos GET------------------------------------------------
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
    var conv=req.query.sala+''  
        sala=parseInt(conv)

    //--------------------------------print da página HTML------------------------------------------
    
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
             
            var get='';

            var mostrar='';
            
            var nr_nodos=`+nr_nodos+`
            
            console.log(get)

            //função que trata dos dados após clicarmos no botão de enviar
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

            window.addEventListener('scroll',function() {
              //When scroll change, you save it on localStorage.
              localStorage.setItem('scrollPosition',window.scrollY);
          },false);
        
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
            
        //mostrar ou não a interface de mostragem dos dados
            function mudar_dados(i){
                document.getElementById('dados'+i).src="images/grey_server.png"
                document.getElementById('def'+i).src="images/def_white.png"
        
                document.getElementById('lista_dados'+i).classList.remove('mostrar');
                document.getElementById('lista_dados'+i).classList.add('lista_dados');
                document.getElementById('lista_def'+i).classList.remove('lista_def');
                document.getElementById('lista_def'+i).classList.add('mostrar');

                mostrar+='&mostrar='+i+'sim'
                
            }

            //mostrar ou não a interface de mudança de defenições
            function mudar_def(i){
                document.getElementById('dados'+i).src="images/white_server.png"
                document.getElementById('def'+i).src="images/def_grey.png"
        
                document.getElementById('lista_dados'+i).classList.remove('lista_dados');
                document.getElementById('lista_dados'+i).classList.add('mostrar');
                document.getElementById('lista_def'+i).classList.remove('mostrar');
                document.getElementById('lista_def'+i).classList.add('lista_def');

                mostrar+='&mostrar='+i+'nao'
            }
            
            //função que atua quando procuramos mudar o valor do ar condicionado colocando nas menssagens laterais
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
            
            //função que atua quando clicamos para mudar de sala
            function mudar_sala(i){              
                sala=i
       
                localStorage.removeItem('scrollPosition');

                
                for (let index = 1; index <= nr_nodos; index++) {
     
                  mostrar+='&mostrar='+index+'sim'
                } 
                                
                
                location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)


                
                console.log(get)
            }

            //funcao que aumenta o intervalo de reload temporariamente quando o utilizador interage com o formulário
            function hold(){

              clearInterval(intervalId);
              intervalId = setInterval(reload, 15000);
              console.log("reload to timer")

            }
            
            //funcao que atua no reload da página 
            function reload(){

              var titulo=document.getElementById('titulo').innerHTML;
    
              var titulo_sep = titulo.split(" ");
  
              i=titulo_sep[1];

              location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)

              

              }
          
            //intervalo para dar auto reload à janela
            var intervalId = setInterval(reload, 5000);

            //função para manter o mesmo nível de scroll na página
              window.addEventListener('load',function() {
                if(localStorage.getItem('scrollPosition') !== null)
                   window.scrollTo(0, localStorage.getItem('scrollPosition'));
            },false);
    
        </script>
        
        </body>
        </html> 
      `)
  })

}
        


i=i+1;


};

}
contagem_de_nodos();

}
contagem_de_salas();


app.listen(port,() => {
  console.log(`server started a http://localhost:${port}.`);
})