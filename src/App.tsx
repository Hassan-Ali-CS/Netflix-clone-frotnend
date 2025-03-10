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
import PrivateRoute from "./components/PrivateRoute";


const App: React.FC = () => {
  const appStyles: React.CSSProperties = {
    textAlign: "center",
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  };

  const logoStyles: React.CSSProperties = {
    height: "40vmin",
    pointerEvents: "none",
    animation: "App-logo-spin infinite 20s linear",
  };

  const appLinkStyles: React.CSSProperties = {
    color: "#61dafb",
    textDecoration: "none",
  };

  const appLogoSpin = `@keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }`;

  return (
    <div style={appStyles}>
      <style>{appLogoSpin}</style>
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

        <Route element={<PrivateRoute />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/favouritemovies" element={<FavouriteMoviesPage/>} />
          <Route path="/subscriptions" element={<Subscription />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
};

export default App;
