import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, allowedEmails } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;

      if (allowedEmails.includes(email)) {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/home");
      } else {
        alert("Access Denied. Your email is not authorized.");
        await auth.signOut();
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/home");
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">
      <div className="bg-[#1f1f1f] p-10 rounded-2xl shadow-2xl w-[300px] text-center">
        <h1 className="text-2xl font-bold mb-6">Futuristic Gallery</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;