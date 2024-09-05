import React from "react";
// import LoginForm from "./LoginForm";
import LoginForm from "../LoginForm";

function StudentLogin() {
  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
    // Handle the login logic here, like saving the token or redirecting
  };

  return <LoginForm onLogin={handleLogin} role="student" />;
}

export default StudentLogin;
