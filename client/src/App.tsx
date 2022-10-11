import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import SignUp from "./components/auth/SingUp";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import Services from "./components/Services/Services";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Board defaultDisplay="grid" />
              //to do check
            </PrivateRoute>
          }
        />
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
function deleteServices(): Function {
  throw new Error("Function not implemented.");
}
