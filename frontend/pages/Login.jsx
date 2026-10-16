
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../src/utils/auth";

const Login = () => {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form, setForm] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const response = await fetch(`${BASE_URL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok) {
                saveToken(data);
                setMsg("Login Successfully. Redirecting");

                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                setMsg(data.detail || "Login Failed");
            }
        } catch (error) {
            console.log(error);
            setMsg("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login Page</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                    placeholder="Username"
                    required
                />

                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    placeholder="Password"
                    required
                />

                <button type="submit">Login</button>
                <p>{msg}</p>
            </form>
        </div>
    );
};

export default Login;
