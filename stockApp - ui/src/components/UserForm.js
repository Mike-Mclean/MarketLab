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

            {requireConfirmPassword && (
                <div class = "input-box">
                    <input type="text" value={username} onChange={(e) => setUser(e.target.value)} placeholder=" " />
                    <label>Username</label>
                </div>
            )}

            <div class = "input-box">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " />
                <label>Email</label>
            </div>

            <div class = "input-box">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" "/>
                <label>Password</label>
            </div>

            {requireConfirmPassword && (
                <div class = "input-box">
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder=" "/>
                    <label>Confirm Password</label>
                </div>
            )}

            <div class="remember-me">
                <label><input type="checkbox"></input>Remember me</label>
                <a href="#">Forgot Password?</a>
            </div>

            <button type="submit">{buttonText}</button>


            {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
    );
}

export default UserForm;