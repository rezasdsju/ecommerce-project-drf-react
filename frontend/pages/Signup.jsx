
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const response = await fetch(`${BASE_URL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok) {
                setMsg("Signup successful. Redirecting to login...");
                setTimeout(() => navigate("/login"), 800);
            } else {
                setMsg(JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
            setMsg("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    placeholder="Email"
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

                <input
                    type="password"
                    name="password2"
                    onChange={handleChange}
                    value={form.password2}
                    placeholder="Confirm Password"
                    required
                />

                <button type="submit">Sign Up</button>
                <p>{msg}</p>
            </form>
        </div>
    );
};

export default SignUp;
