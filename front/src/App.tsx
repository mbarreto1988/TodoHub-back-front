import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import TaskEditForm from "./components/TaskEditForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks EditComponent={TaskEditForm} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
