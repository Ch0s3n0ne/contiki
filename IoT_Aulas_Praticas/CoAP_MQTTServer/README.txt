Algumas notas para colocar esta versão do servidor a funcionar:

1) Instalar o node.js: https://nodejs.org/en/download/
O node.js já tem incluido o gestor de módulos NPM

No final da instalação poderá ser necessário reiniciar o computador (verifique se o instalador o pede)

2) Instalar o ambiente de desenvolvimento: O Visual Studio Code:
https://code.visualstudio.com/Download

Em Windows utilizem o User Installer para instalarem apenas num utilizador e a versão System Installer para instalarem como administradores para todos os utilizadores.

3) Descompactar o Arquivo com o código fonte do servidor numa pasta à escolha.

4) Correr o Visual Studio Code (VSC) e abrir o projecto utilizando a opção «Open Folder» navegando para a pasta onde está o projecto

5) Abrir um terminal no VSC: Terminal -> New Terminal

6) Correr o seguinte comando: nodevars
Este comando permite definir a path dos comandos que irão ser necessários para compilar/correr o programa.

7) É necessário instalar o compilar de TypeScript, o TSC através do comando: npm install -g typescript

8) Para compilar o programa poderá utilizar o programa «tsc» no terminal. Este comando é um compilador de TypeScript e gera um conjunto de ficheiros .js que podem ser executados.

9) Antes de correr este programa (o servidor) é necessário instalar o motor de base de dados PostGreSQL (utilizado para fazer o log dos pacotes recebiso via CoAP):

https://www.postgresql.org/download/

Depois de instalar o PostGreSQL, terá que aceder ao interface de controlo do PostGreSQL, o programa «pgAdmin 4»

Nesse programa deverá criar uma nova base de dados. Para isso deverá em primeiro lugar seleccionar o servidor local (localhost).
Primeiro deverá criar o utilizador que irá utilizar para aceder à BD. Para isso abra o separador relativo ao local host (poderá ter que utilizar a password definida na instalação).
Repare que existe uma opção «Login/Group Roles». Seleccione-a e com o botão direito faça «Create Login/Group Role». Na janela que aparece, coloque o nome do utilizador como «iot_user» e no tab seguinte «Definition» indique a password.
Para o exemplo poder funcionar deverá utilizar «IoT2019». Pode mudar estes dados, desde que actualize o código do servidor («app.database.ts»).
Para finalizar a criação do utilizador da BD deverá indicar os previlégios deste utilizador no tab «Privileges». Coloque todas as opções a Yes excepto a última.

O próximo passo é criar a Base de Dados. Seleccione a entrada Databases do servidor local e com o botão direito do rato seleccione a opção «Create -> Database».
No tab «General» indique o nome da BD: «IoT». Seleccione o Owner para o utilizador criado anteriormente (iot_user). De seguida carregue no botão «SAVE» para criar a BD.

Finalmente terá que criar a tabela utilizada no servidor. Pode correr o seguinte comando SQL seleccionando na barra superior a opção «Tools->Query Tool» tendo a BD recém-criada seleccionada:

CREATE SEQUENCE IF NOT EXISTS public.log_temp_id_seq;

ALTER SEQUENCE public.log_temp_id_seq
	OWNER TO iot_user;

CREATE TABLE public.log_temp
(
    id bigint NOT NULL DEFAULT nextval('log_temp_id_seq'::regclass),
    id_device integer,
    temp integer,
    volt integer,
    ts timestamp without time zone,
    CONSTRAINT pk_log_temp PRIMARY KEY (id)
);

ALTER TABLE public.log_temp
    OWNER to iot_user;

GRANT ALL ON TABLE public.log_temp TO iot_user;

GRANT ALL ON TABLE public.log_temp TO postgres;

Execute o query carregando no botão executar que tem o icon de um «trovão» ou utilize F5.

10) Para instalar os módulso que foram utilizados no código do servidor, pode utilizar o comando npm: npm install
Os módulos utilizados são definidos automaticamente no ficheiro package.json (este ficheiro é criado automaticamente quando importamos um novo módulo no código)

11) Para correr o programa poderá executar a seguinte instrução: node nomedaapp.js, ou neste caso:	node app.js

12) Se quiser transformar a sua aplicação numa aplicação normal do Windows, poderá seguir o seguinte tutorial:

https://scotch.io/@jimfilippou69/how-to-build-an-executable-with-nodejs

	- Now install pkg globally npm install -g pkg
	- Now build your app: pkg app.js --output myApp.exe






