// src/components/Login.jsx
import { useEffect } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, allowedEmails } from "../firebase";

const allowedEmails = [
  "pmadhusreereddy_it201242@mgit.ac.in",
  "bnikitha_it201207@mgit.ac.in",
  "bjayasree_it201209@mgit.ac.in",
  "bsumanth_it201208@mgit.ac.in",
  "ypranavanreddy_it201260@mgit.ac.in",
  "akashkumarreddy955@gmail.com"
];

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (allowedEmails.includes(email)) {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/home");
      } else {
        alert("Access Denied. Your email is not authorized.");
        auth.signOut();
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);

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
