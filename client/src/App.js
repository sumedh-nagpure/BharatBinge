import "./App.css";

import Login from "./components/Login";

import Movie from "./components/Movie";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import Genre from "./components/Genre";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./components/Start";
function App() {
  return (
    <div className="App bg-gray-50 ">
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          {/* <Route path="/" element={<Start />} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movies/genre/:genretype" element={<Genre />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
