import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Temporary bypass to test UI
    console.log('Logging in with:', { email, password });
    alert('UI is working! Login attempt with ' + email);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#001f4d] via-[#003366] to-[#0059b3] flex items-center justify-center p-4">
      
      <div className="bg-[#0a162d] p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#004080] p-4 rounded-lg">
            <span className="text-white text-2xl font-bold">Logo</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <h1 className="text-2xl font-semibold text-white mb-6 text-left">Login</h1>
          
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lm font-medium text-gray-300 mb-1">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full px-4 py-2 bg-[#2c3e50] border border-[#2c3e50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition duration-150"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lm font-medium text-gray-300 mb-1">Senha</label>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full px-4 py-2 pr-10 bg-[#2c3e50] border border-[#2c3e50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition duration-150"
              />
              
              {/* 4. The Eye Icon Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? (
                  // Open Eye SVG
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  // Closed Eye SVG (Eye with a slash)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-start mt-1">
            <Link to="/forgot-password" className="text-sm text-[#007bff] hover:text-[#0056b3] transition duration-150">
              Esqueceu a senha?
            </Link>
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full px-4 py-2.5 bg-[#004080] text-white font-semibold rounded-xl hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2 focus:ring-offset-[#0a162d] transition duration-150"
            >
              Entrar no Sistema
            </button>
          </div>
          
          <div className="text-center mt-4 text-sm text-gray-300">
            Ainda não tem uma conta?{' '}
            <Link to="/register" className="text-[#007bff] hover:text-[#0056b3] font-medium transition duration-150">
              Crie uma conta.
            </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;