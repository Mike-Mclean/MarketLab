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

    return (
      <section>
        <div class="login-page">
          <div class="login-registration-box">
            <h2>Login</h2>
            <UserForm onSubmit={handleLogin} buttonText="Login" />
            <div class="register-link">
              <p>Don't have an account? <a href='#'>Register</a></p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default LoginPage;
