<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <!DOCTYPE html>
<html>
<head>
<link href="style.css" rel="stylesheet" type="text/css">
    <title>Tela de Login</title>
</head>
<body>

<div id="container-amarelo-azul">

	<div id="container-login">
	    <h1>CADASTRO </h1>
	    <hr>
	    <form action="../back-end/autenticar.jsp" method="post">
	        
			<div id="nomeComp">
				<div>
	        		<input class="inputs" type="text" name="nome" placeholder="Nome"  required><br>
				</div>
				<div>
	        		<input class="inputs" type="text" name="sobreNome" placeholder="Sobrenome"  required><br>
				</div>
			</div>	
	        
	        <input class="inputs"  type="password" id="senha" name="senha" placeholder="Digite sua senha"  required><br>
	        
	        
	        <input class="inputs"  type="password" id="confSenha" name="confSenha" placeholder="Repita sua senha" required><br>
	
	        <input class="botao" type="submit" value="Enviar">
	    </form>
    </div> 
    <div id="msgErro" >
    	<p>As senhas digitadas não coicidem, Digite novamente por favor</p>
    </div>
</div>
</body>
</html>