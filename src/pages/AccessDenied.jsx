import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <pattern
            id="errorGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="red"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#errorGrid)" />
        </svg>
      </div>

      {/* Error card */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="backdrop-blur-md bg-gray-800/30 border border-red-500/50 rounded-2xl p-8 text-center">
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>

          {/* Content */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Access Denied
          </h1>
          <p className="text-red-300 text-lg mb-2">
            You are not authorized to access this gallery.
          </p>
          <p className="text-gray-400 mb-8">
            This is a private photo gallery with restricted access. 
            Please contact the administrator if you believe this is an error.
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <motion.button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Sign Out & Return</span>
            </motion.button>
          </div>

          {/* Security notice */}
          <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-red-200 text-sm">
              🔒 This gallery uses email-based authentication. 
              Only pre-authorized users can access the content.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessDenied;