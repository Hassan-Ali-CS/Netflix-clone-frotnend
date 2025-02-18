import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/Reset-Password";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import FavouriteMoviesPage from "./pages/FovouriteMovie";
import Subscription from "./pages/Subscription";
import AdminPanel from "./pages/AdminPanel";
import ManageUsers from "./pages/ManageUsers";
import ManageSubscriptions from "./pages/ManageSubscriptions";
import ManageMovies from "./pages/ManageMovies";
import AdminRoute from "./AdminRoute";

import "./styles/global.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminPanel />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="subscriptions" element={<ManageSubscriptions />} />
          <Route path="movies" element={<ManageMovies />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favouritemovies" element={<FavouriteMoviesPage/>} />
        <Route path="/subscriptions" element={<Subscription />} />
        
      </Routes>
    </Router>
  );
};

export default App;
