// src/components/Login.jsx
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
      // Only allow the authorized admin
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-yellow-50">
      <div className="w-full max-w-md p-8 bg-white border shadow-lg rounded-xl border-rose-200">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-center text-pink-700">
            All Results
          </h2>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-5 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 font-semibold text-white transition bg-pink-600 rounded hover:bg-pink-700"
        >
          Login
        </button>
        <div className="mt-6 text-xs text-center text-gray-400">
          Theme: Love ❤️ | Marriage 💍 | Friends 👥 | Affection 🤗 | Sister 🧕 | Enemy 💥
        </div>
      </div>
    </div>
  );
}
