import express = require('express');
import { textSpanEnd } from 'typescript';

const { DynamoDBClient, ScanCommand, QueryCommand , UpdateItemCommand} = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"
var tools = require('./function.js');

const app=express();
const port = 8080;
app.use(express.static(__dirname + '/public'));

var nr_nodos=1;
var sala=1;
var sala_anterior=0;
var string_mensagens=''
var ac_ativado=1;
var atualizar_ac=1;
var IDM=0;
var nr_salas=1;


var nodos_mostrar=[];
var id_array=[];
var smoke_array=[];
var temp_array=[];
var hum_array=[]
var temp_array=[]
var smokes_array=[]
var ids_array=[]
var time_stamps=[]
var timestamp_anterior=0
var indice=0;
var index_array=[]
var smoke_show=[]
var temp_show=[]
var hum_show=[]
var IDM_array=[]
var Room_array=[]



const dbclient = new DynamoDBClient({ region: REGION });


//-----------------------fim da inicialização de variáveis--------------------------------


  var l=0;
  var intervalId = setInterval(function(){
    l=l+1;
    //console.log("x")
  }, 5000);
  
//    console.log(nr_salas)


// -----------------------------------funções de contrução da interface-----------------------------------------------------------




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

function salas(room_array,idm_array){
    console.log(room_array)
    console.log(idm_array)
    var text_salas=''
    for (let i = 1; i <= room_array.length; i++) {
      if(parseFloat(idm_array[room_array.indexOf(''+i+'')])>=90){
        console.log("entrou")
        text_salas=text_salas+'<j " onclick="mudar_sala('+i+')">Sala '+(i)+'</j> '
      } 
      else{
        text_salas=text_salas+'<k " onclick="mudar_sala('+i+')">Sala '+(i)+'</k> '
      }
        
    }
return (text_salas)  
}



function nodos(){
    var x=''
    var print2=''
    var print1=''
    var print11=''
    var print21=''
    console.log("nodos a mostrar")
    console.log(nodos_mostrar)
    for (let i = 0; i < nr_nodos; i++) {

      if (nodos_mostrar.includes(i+1)){
        print2='mostrar'
        print1='lista_dados'
        if (smoke_show[i]==0) {
          print11='grey_server.png'
        }
        else{
          print11='red_server.png'
        }       
        print21='def_white.png'
        }
      else{
        print2='lista_def'
        print1='mostrar'
        if (smoke_show[i]==0) {
          print11='white_server.png'
        }
        else{
          print11='red_server.png'
        }  
        print21='def_grey.png'
      }
          
      x+='<ul class="menu" id="menu'+(i+1)+'">'
      x+='<li>'
      x+='        <a class="def" onclick="mudar_dados('+(i+1)+')"><img style="height:88px; width: 98px " id="dados'+(i+1)+'" src="images/'+print11+'"></a><br>'
      x+=        '<a class="def" onclick="mudar_def('+(i+1)+')"><img id="def'+(i+1)+'" src="images/'+print21+'"></a>'
      x+=    '</li>'
      x+=    '<li>'
      x+=    '<ul class="'+print1+'" id="lista_dados'+(i+1)+'" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 300px">'
      x+=        '<li>ID: '+id_array[i]+'</li>'
      x+=        '<li>Temperatura: '+temp_show[i]+'</li>'
      x+=        '<li>Humidade: '+hum_show[i]+'</li>'
      x+=        '<li>Fumo: '+smoke_show[i]+'</li>'
      x+=    '</ul> '
      x+=    '<ul class="'+print2+'" id="lista_def'+(i+1)+'" style="border-style: solid; margin-left: 98px; margin-top: -120px; width: 400px">'
      x+=        '<form onsubmit="return validateFormOnSubmit(this);" style="margin-left: 5px;">'
      x+=           '<input style="display: none;" onclick="hold()"  type="number" id="dev_id" name="dev_id" value="'+id_array[i]+'"><br><br>' 
      x+=           '<label style="margin-top: 5px;" for="sala">Sala:</label><br>'
      x+=           '<input onclick="hold()"  type="number" min="1" max="'+nr_salas+'" id="sala" name="sala" value="'+sala+'"><br><br>'
      x+=           '<label for="freq_tem">Tempo de aquisição Temp/Hum:</label><br>'
      x+=           '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_tem" name="freq_tem" value="'+temp_array[i]+'">s<br><br>'
      x+=           '<label for="freq_fum">Tempo de aquisição Fumo:</label><br>'
      x+=           '<input onclick="hold()"  type="number"  min="1" step="any" id="freq_fum" name="freq_fum" value="'+smoke_array[i]+'">s<br><br>'
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
        x+='<h2 style="color: #eee;" id="titulo">Sala 1 :</h2>'
    }
    else{
        x+='<h2 style="color: #eee;" id="titulo">Sala '+sala+ ' :</h2>'
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

function estado_cond(){
  var x=''

  if (ac_ativado==1) {
     x+='<button onclick="mudar_ac()" id="ar_condicionado" style="margin-left: 50%; padding: 10px;">Desactivar Ar Condicionado</button></span>'
  }
  else{
      x+='<button onclick="mudar_ac()" id="ar_condicionado" style="margin-left: 50%; padding: 10px;">Ativar Ar Condicionado</button></span>'
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
    var dev_id=req.query.pedido_update_id;

    var mudar_ac = req.query.mudar_cond

    async function contagem_de_salas() {
    
      nr_salas=0;
      IDM_array=[]
      Room_array=[]
      const params = {
        // Specify which items in the results are returned.
        FilterExpression: "ROOM_ID > :s ",
        // Define the expression attribute value, which are substitutes for the values you want to compare.
        ExpressionAttributeValues: {
          
          ":s": { N: "0" },
          
        },
        // Set the projection expression, which the the attributes that you want.
        ProjectionExpression: "ROOM_ID, AC, IDM",
        TableName: "ar_condicionado_sala",
      };
      try {
        const data = await dbclient.send(new ScanCommand(params));
        data.Items.forEach(function (element, index, array) {
          //console.log(element.ROOM_ID.N + " (" + element.AC.N + ")");
          nr_salas=nr_salas+1;
          Room_array.push(element.ROOM_ID.N)
          IDM_array.push(element.IDM.N)
          return data;
        });
      } catch (err) {
        console.log("Error", err);
      }

    async function update_parametros(){
        
    if(dev_id){
      console.log("voltou a entrar")
      var smoke_rate=req.query.freq_fum
      var temp_rate=req.query.freq_tem
      var sala_destino=req.query.sala_destino
      try {
        
            const params = {
              ExpressionAttributeNames: {
              "#SR": "Smoke_Rate",
              "#TR": "TempHum_Rate",
              "#RI": "ROOM_ID",
            
              }, 
              ExpressionAttributeValues: {
              ":t": {
                N: ""+temp_rate+""
                }, 
              ":y": {
                N: ""+smoke_rate+""
                },
                ":z": {
                  N: ""+sala_destino+""
                },
              }, 
              Key: {
              "DEV_ID": {
                N: ""+dev_id+""
                }
              }, 
              //ReturnValues: "ALL_NEW", 
              TableName: "configuration", 
              UpdateExpression: "SET #SR = :y, #TR = :t, #RI = :z"
            };
          console.log(params)
          const data = await dbclient.send(new UpdateItemCommand(params));
          //console.log("Success - item added or updated", data);
          //return data;
        } catch (err) {
          console.log("Error", err);
        }
        sala_anterior=0
        
    }
    if (mudar_ac) {

      try {
        
        const params = {
          ExpressionAttributeNames: {
          "#AC": "AC",
        
          }, 
          ExpressionAttributeValues: {
          ":t": {
            N: ""+mudar_ac+""
            }, 
          }, 
          Key: {
          "ROOM_ID": {
            N: ""+sala+""
            }
          }, 
          //ReturnValues: "ALL_NEW", 
          TableName: "ar_condicionado_sala", 
          UpdateExpression: "SET  #AC = :t"
        };
      console.log(params)
      const data = await dbclient.send(new UpdateItemCommand(params));
      //console.log("Success - item added or updated", data);
      //return data;
    } catch (err) {
      console.log("Error", err);
    }
    atualizar_ac=1
      
    }



      var conv=req.query.sala+''
      sala=parseInt(conv)
      if(!sala){
        sala=1
      }
    //--------------------------------------------------inicio das funções async------------------------------------
        async function contagem_de_nodos() {

          hum_array=[]
          temp_array=[]
          smokes_array=[]
          ids_array=[]
          time_stamps=[]
          timestamp_anterior=0
          indice=0;
          index_array=[]
          smoke_show=[]
          temp_show=[]
          hum_show=[]

          console.log("correu função no reload")


          if(sala!=sala_anterior){

            id_array=[];
            smoke_array=[]
            temp_array=[]

            // Set the parameters
            const params = {
              // Specify which items in the results are returned.
              FilterExpression: "ROOM_ID = :s ",
              // Define the expression attribute value, which are substitutes for the values you want to compare.
              ExpressionAttributeValues: {
                
                ":s": { N: ""+sala+"" },
                
              },
              // Set the projection expression, which the the attributes that you want.
              ProjectionExpression: "ROOM_ID, DEV_ID , Smoke_Rate, TempHum_Rate ",
              TableName: "configuration",
            };

            try {
              const data = await dbclient.send(new ScanCommand(params));
              data.Items.forEach(function (element, index, array) {
                
                //console.log(element.DEV_ID.N);
                id_array.push(element.DEV_ID.N)
                smoke_array.push(element.Smoke_Rate.N)
                temp_array.push(element.TempHum_Rate.N)
                //nr_resultados=nr_resultados+1;
                //return data;
              });
            } catch (err) {
              console.log("Error", err);
            }
            
            var old_id_array = id_array.slice();

            id_array.sort()
          
            var changes_array=[]
          
            for (let index = 0; index < old_id_array.length; index++) {
          
              for (let index1 = 0; index1 < id_array.length; index1++) {
          
                if (old_id_array[index]==id_array[index1]) {
          
                  changes_array.push(index1)
          
                } 
              }
              
            }
            var new_smoke_array=[];
          
            var new_temp_array=[];
          
          
            for (let index = 0; index < changes_array.length; index++) {
          
              for (let index1 = 0; index1 < changes_array.length; index1++) {
          
                if (index==changes_array[index1]) {
                  new_smoke_array.push(smoke_array[index1])
                  new_temp_array.push(temp_array[index1]) 
                }   
              }      
            }
          
            smoke_array=new_smoke_array
            temp_array=new_temp_array
          
          
           // console.log(id_array)
           // console.log(smoke_array)
           // console.log(temp_array)

              nr_nodos=id_array.length

            
              nodos_mostrar=[];

              for (let index = 1; index <= nr_nodos; index++) {
        
                nodos_mostrar.push(index)
              }
        
              sala_anterior=sala
              atualizar_ac=1

          }

          const params = {
            // Specify which items in the results are returned.
            FilterExpression: "ROOM_ID = :s ",
            // Define the expression attribute value, which are substitutes for the values you want to compare.
            ExpressionAttributeValues: {
              
              ":s": { N: ""+sala+"" },
              
            },
            // Set the projection expression, which the the attributes that you want.
            ProjectionExpression: " Tmestamp ,DEV_ID , Temper ,Hum, Smoke ",
            TableName: "dados_sensores",
          };

          try {
            const data = await dbclient.send(new ScanCommand(params));
            data.Items.forEach(function (element, index, array) {


              if (id_array.includes(element.DEV_ID.N)) {

                ids_array.push(element.DEV_ID.N)
                hum_array.push(element.Hum.N)
                smokes_array.push(element.Smoke.N)
                time_stamps.push(element.Tmestamp.N)
                temp_array.push(element.Temper.N)
              }

              


            });
          } catch (err) {
            console.log("Error", err);
          }

          console.log(time_stamps)
          console.log(ids_array)
          console.log(hum_array)
          console.log(smokes_array)

          if(atualizar_ac==1){

            const params = {
              KeyConditionExpression: "ROOM_ID = :s ",
            
              ExpressionAttributeValues: {
                ":s": { N: ""+sala+"" },
          
              },
              ProjectionExpression: "ROOM_ID, AC, IDM",
              TableName: "ar_condicionado_sala",
            };
    
            try {
              const results = await dbclient.send(new QueryCommand(params));
              results.Items.forEach(function (element, index, array) {
                
                ac_ativado=element.AC.N
                IDM=element.IDM.N
                
              });
        
            } catch (err) {
              console.error(err);
            }
            //atualizar_ac=0;

          }
//-----------------------------------------------------------------------------------------------------//
          console.log(id_array)
          for (let index1 = 0; index1 < id_array.length; index1++){

            timestamp_anterior=0
        
            for (let index = 0; index < ids_array.length; index++){
        
              if (id_array[index1]==ids_array[index]) {
        
                if (ids_array[index]>timestamp_anterior) {
        
                  timestamp_anterior=ids_array[index]
                  indice=index         
                }
              }
            }
        
            index_array.push(indice)
            
          }
        
          console.log(index_array)
        
          for (let index = 0; index < index_array.length; index++) {
        
            smoke_show.push(smokes_array[index_array[index]])
            temp_show.push(temp_array[index_array[index]])
            hum_show.push(hum_array[index_array[index]])
            
          }
        
          console.log(smoke_show)
          console.log(hum_show)
          console.log(temp_show)


      
              

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
        
        .sidenav k {
          padding: 6px 8px 6px 16px;
          text-decoration: none;
          font-size: 25px;
          color: #818181;
          display: block;
        }
        
        .sidenav k:hover {
          color: #f1f1f1;
        }
        .sidenav j {
          padding: 6px 8px 6px 16px;
          text-decoration: none;
          font-size: 25px;
          color: red;
          display: block;
        }
        
        .sidenav j:hover {
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
        /*------------------------------progress bar stuff--------------------------*/
        .meter {
          box-sizing: content-box;
          height: 20px; /* Can be anything */
          width: 40%;
          position: relative;
          margin: -1.5% 0 20px 0; /* Just for demo spacing */
          background: #555;
          border-radius: 25px;
          padding: 10px;
          box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
        }
        .meter > span {
          display: block;
          height: 100%;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          background-color: rgb(43, 194, 83);
          background-image: linear-gradient(
            center bottom,
            rgb(43, 194, 83) 37%,
            rgb(84, 240, 84) 69%
          );
          box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
            inset 0 -2px 6px rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
        }
        .meter > span:after,
        .animate > span > span {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-image: linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
          );
          z-index: 1;
          background-size: 50px 50px;
          animation: move 2s linear infinite;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          overflow: hidden;
        }

        .animate > span:after {
          display: none;
        }

        @keyframes move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }

        .orange > span {
          background-image: linear-gradient(#f1a165, #f36d0a);
        }

        .red > span {
          background-image: linear-gradient(#f0a3a3, #f42323);
        }

        .nostripes > span > span,
        .nostripes > span::after {
          background-image: none;
        }


        body {
          background: #333;
          font-family: system-ui, sans-serif;
        }
        </style>

        <script type="text/javascript">
             
            var get='';

            var mostrar='';
            
            var nr_nodos=`+nr_nodos+`
            
            console.log(get)

            //função que trata dos dados após clicarmos no botão de enviar
            function validateFormOnSubmit(theForm) {

                var titulo=document.getElementById('titulo').innerHTML;
    
                var titulo_sep = titulo.split(" ");
    
                i=titulo_sep[1];
        
                var sala = theForm.sala.value;
                var  freq_tem= theForm.freq_tem.value;
                var freq_fum = theForm.freq_fum.value;
                var dev_id = theForm.dev_id.value;
                console.log(dev_id)                

                
                var today = new Date();
    
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
                var dateTime = date+' '+time+'⇨';
    
                var list = document.getElementById('lista');
                var entry = document.createElement('li');
                entry.appendChild(document.createTextNode(dateTime));
                entry.appendChild(document.createTextNode('Foi realizada uma mudança de configuração do '+dev_id+''));
                list.appendChild(entry);

                get+='&message_number='+dateTime+'Foi realizada uma mudança de configuração do '+dev_id+'&pedido_update_id='+dev_id+'&freq_tem='+freq_tem+'&freq_fum='+freq_fum+'&sala_destino='+sala

                location.replace('http://localhost:8080/?sala='+i+''+get+''+mostrar)
                console.log("correu location replace")
            
                




               // console.log(time)
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
        `+salas(Room_array,IDM_array)+`
        </div>
        
        <div class="main">
        
            <!---------------------------PARTE SUPERIOR----------------------------->
            <header>
                  `+titulo()+`<p style="color: #eee;">Indice de manutenção: `+IDM+`%</p>
                  <span>
                  <div class="meter red">
                    <span style="width: `+IDM+`%"></span>				
                  </div>
                  `+estado_cond()+`
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


                if(document.getElementById('dados'+i).src.indexOf("images/white_server.png") != -1){
                  document.getElementById('dados'+i).src="images/grey_server.png"
                }
                else if(document.getElementById('dados'+i).src.indexOf("images/grey_server.png") != -1){
                  document.getElementById('dados'+i).src="images/grey_server.png"
                }
                else{
                  document.getElementById('dados'+i).src="images/red_server.png"
                }

                document.getElementById('def'+i).src="images/def_white.png"
        
                document.getElementById('lista_dados'+i).classList.remove('mostrar');
                document.getElementById('lista_dados'+i).classList.add('lista_dados');
                document.getElementById('lista_def'+i).classList.remove('lista_def');
                document.getElementById('lista_def'+i).classList.add('mostrar');

                mostrar+='&mostrar='+i+'sim'
                
            }

            //mostrar ou não a interface de mudança de defenições
            function mudar_def(i){

                if(document.getElementById('dados'+i).src.indexOf("images/grey_server.png") != -1){
                  document.getElementById('dados'+i).src="images/white_server.png"                
                }
                else if(document.getElementById('dados'+i).src.indexOf("images/white_server.png") != -1){
                  document.getElementById('dados'+i).src="images/white_server.png"
                }
                else{
                  document.getElementById('dados'+i).src="images/red_server.png"
                }
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
    
                if(document.getElementById('ar_condicionado').innerHTML=="Desactivar Ar Condicionado"){
        
                    document.getElementById('ar_condicionado').innerHTML="Ativar Ar Condicionado"
        
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
                    
                    get+='&message_number='+dateTime+'Ar condicionado desativado sala: '+sala+'&mudar_cond='+0

                    location.replace('http://localhost:8080/?sala='+sala+''+get+''+mostrar)
        
                }
                else{
                    document.getElementById('ar_condicionado').innerHTML="Desactivar Ar Condicionado"
        
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

                    get+='&message_number='+dateTime+'Ar condicionado ativado sala: '+sala+'&mudar_cond='+1

                    location.replace('http://localhost:8080/?sala='+sala+''+get+''+mostrar)
        
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
              intervalId = setInterval(reload, 20000);
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
    }
    contagem_de_nodos();

  }
  update_parametros();
  //---antes
  }
  contagem_de_salas();
  })




app.listen(port,() => {
  console.log(`server started a http://localhost:${port}.`);
})