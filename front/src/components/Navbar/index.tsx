import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-container__logo">
        TodoHub
      </Link>

      <div className="navbar-container__links">
        {isAuthenticated ? (
          <>
            <Link to="/tasks">Tareas</Link>
            <span className="navbar-container__user">Hola {user?.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
