/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import { useAuthStore } from "../../stores/auth.store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleLogin = async () => {
    try {
      const res = await authApi.login(email, password);
      if (!res?.data?.accessToken) throw new Error("Login inválido");

      login({
        user: res.data.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <section className="login-container">
      <h1 className="login-container__title">Iniciar sesión</h1>
      <div className="login-container__form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
        {error && <p className="login-container__form__error">{error}</p>}
      </div>
    </section>
  );
}
