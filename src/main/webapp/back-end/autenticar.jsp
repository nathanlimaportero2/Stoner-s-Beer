<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.io.*, java.util.*" %>
<%-- Obtém os parâmetros do formulário --%>
<%
String usuario = request.getParameter("usuario");
String senha = request.getParameter("senha");
String confirmarSenha = request.getParameter("confSenha");

if (senha.equals(confirmarSenha)) {
    // Senha e confirmação de senha são iguais, então você pode realizar o processamento do cadastro aqui
    // Por exemplo, você pode salvar os dados no banco de dados
    // Neste exemplo, vamos apenas imprimir os dados para demonstração
%>
<!DOCTYPE html>
<html>
<head>
    <title>Cadastro Bem-Sucedido</title>
</head>
<body>
    <%
	response.sendRedirect("../front-end/Carrinho.html"); %>
</body>
</html>
<%
} else {
    // Senha e confirmação de senha não correspondem
%>
<html>
<head>
    <title>Erro no Cadastro</title>
</head>
<body>
    <h1>Erro no Cadastro</h1>
    <p>As senhas não correspondem. Por favor, tente novamente.</p>
    
    <%
	response.sendRedirect("../front-end/erroLogin.jsp"); %>
</body>
</html>
<%
}
%>