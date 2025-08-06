import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { registerUser } from "../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const result = await registerUser(formData);
    if (result.success) navigate("/homepage");
    return result;
  };

  return <UserForm onSubmit={handleRegister} buttonText="Register" requireConfirmPassword={true} />;
}