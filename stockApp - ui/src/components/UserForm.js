import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserForm({ onSubmit, buttonText, requireConfirmPassword = false }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUser] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (requireConfirmPassword && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const result = await onSubmit({ email, password, username });
        if (result?.error) setError(result.error);
    };

    return (
        <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUser(e.target.value)} placeholder="Username" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {requireConfirmPassword && (
        <input
          type="password"
          placeholder="Retype Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
      )}
        <button type="submit">{buttonText}</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
    );
}

export default UserForm;