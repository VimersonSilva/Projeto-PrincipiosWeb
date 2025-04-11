import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <label>Usuário</label>
          <input type="text" placeholder="Digite seu usuário" />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" />

          <button type="submit">Entrar</button>
        </form>
        <a href="#" className="forgot-password">Esqueci minha senha</a>
      </div>
    </div>
  );
};

export default Login;
