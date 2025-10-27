/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await authApi.register(username, email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <section className="register-container">
      <h1 className="register-container__title">Crear cuenta</h1>
      <div className="register-container__form">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button onClick={handleRegister}>Registrarse</button>
        {error && <p className="register-container__form__error">{error}</p>}
      </div>
    </section>
  );
}
