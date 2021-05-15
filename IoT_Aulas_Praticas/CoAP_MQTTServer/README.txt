Algumas notas para colocar esta vers�o do servidor a funcionar:

1) Instalar o node.js: https://nodejs.org/en/download/
O node.js j� tem incluido o gestor de m�dulos NPM

No final da instala��o poder� ser necess�rio reiniciar o computador (verifique se o instalador o pede)

2) Instalar o ambiente de desenvolvimento: O Visual Studio Code:
https://code.visualstudio.com/Download

Em Windows utilizem o User Installer para instalarem apenas num utilizador e a vers�o System Installer para instalarem como administradores para todos os utilizadores.

3) Descompactar o Arquivo com o c�digo fonte do servidor numa pasta � escolha.

4) Correr o Visual Studio Code (VSC) e abrir o projecto utilizando a op��o �Open Folder� navegando para a pasta onde est� o projecto

5) Abrir um terminal no VSC: Terminal -> New Terminal

6) Correr o seguinte comando: nodevars
Este comando permite definir a path dos comandos que ir�o ser necess�rios para compilar/correr o programa.

7) � necess�rio instalar o compilar de TypeScript, o TSC atrav�s do comando: npm install -g typescript

8) Para compilar o programa poder� utilizar o programa �tsc� no terminal. Este comando � um compilador de TypeScript e gera um conjunto de ficheiros .js que podem ser executados.

9) Antes de correr este programa (o servidor) � necess�rio instalar o motor de base de dados PostGreSQL (utilizado para fazer o log dos pacotes recebiso via CoAP):

https://www.postgresql.org/download/

Depois de instalar o PostGreSQL, ter� que aceder ao interface de controlo do PostGreSQL, o programa �pgAdmin 4�

Nesse programa dever� criar uma nova base de dados. Para isso dever� em primeiro lugar seleccionar o servidor local (localhost).
Primeiro dever� criar o utilizador que ir� utilizar para aceder � BD. Para isso abra o separador relativo ao local host (poder� ter que utilizar a password definida na instala��o).
Repare que existe uma op��o �Login/Group Roles�. Seleccione-a e com o bot�o direito fa�a �Create Login/Group Role�. Na janela que aparece, coloque o nome do utilizador como �iot_user� e no tab seguinte �Definition� indique a password.
Para o exemplo poder funcionar dever� utilizar �IoT2019�. Pode mudar estes dados, desde que actualize o c�digo do servidor (�app.database.ts�).
Para finalizar a cria��o do utilizador da BD dever� indicar os previl�gios deste utilizador no tab �Privileges�. Coloque todas as op��es a Yes excepto a �ltima.

O pr�ximo passo � criar a Base de Dados. Seleccione a entrada Databases do servidor local e com o bot�o direito do rato seleccione a op��o �Create -> Database�.
No tab �General� indique o nome da BD: �IoT�. Seleccione o Owner para o utilizador criado anteriormente (iot_user). De seguida carregue no bot�o �SAVE� para criar a BD.

Finalmente ter� que criar a tabela utilizada no servidor. Pode correr o seguinte comando SQL seleccionando na barra superior a op��o �Tools->Query Tool� tendo a BD rec�m-criada seleccionada:

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

Execute o query carregando no bot�o executar que tem o icon de um �trov�o� ou utilize F5.

10) Para instalar os m�dulso que foram utilizados no c�digo do servidor, pode utilizar o comando npm: npm install
Os m�dulos utilizados s�o definidos automaticamente no ficheiro package.json (este ficheiro � criado automaticamente quando importamos um novo m�dulo no c�digo)

11) Para correr o programa poder� executar a seguinte instru��o: node nomedaapp.js, ou neste caso:	node app.js

12) Se quiser transformar a sua aplica��o numa aplica��o normal do Windows, poder� seguir o seguinte tutorial:

https://scotch.io/@jimfilippou69/how-to-build-an-executable-with-nodejs

	- Now install pkg globally npm install -g pkg
	- Now build your app: pkg app.js --output myApp.exe






