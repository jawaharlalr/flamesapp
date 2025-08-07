// src/pages/Login.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Allow only the specified admin
      if (email !== "Manjumel2024@gmail.com" || password !== "raeec2025v3") {
        alert("Unauthorized admin login!");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border mb-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
