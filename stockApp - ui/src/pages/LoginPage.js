import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import UserForm from "../components/UserForm";
import { loginUser } from "../api/auth";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
      const result = await loginUser(formData);
      if (result.success) navigate("/homepage");
      return result;
  };

    return <UserForm onSubmit={handleLogin} buttonText="Login" />;
}

export default LoginPage;


