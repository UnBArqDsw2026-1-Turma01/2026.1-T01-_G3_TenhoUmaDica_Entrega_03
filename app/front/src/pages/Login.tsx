import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Temporary bypass to test UI
    console.log('Logging in with:', { email, password });
    alert('UI is working! Login attempt with ' + email);
  };

    return (
    // Added w-full to ensure it spans the whole width
    <div className="min-h-screen w-full bg-gradient-to-br from-[#001f4d] via-[#003366] to-[#0059b3] flex items-center justify-center p-4">
      
      {/* Changed max-w-lg to max-w-md, and reduced padding from p-8/12 to p-6/8 */}
      <div className="bg-[#0a162d] p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#004080] p-4 rounded-lg">
            <span className="text-white text-2xl font-bold">Logo</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Reduced title size from text-3xl to text-2xl */}
          <h1 className="text-2xl font-semibold text-white mb-6 text-center">Entrar no Sistema</h1>
          
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              className="w-full px-4 py-2 bg-[#2c3e50] border border-[#2c3e50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition duration-150"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-start mt-1">
            <Link to="/forgot-password" className="text-xs text-[#007bff] hover:text-[#0056b3] transition duration-150">
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
          
          {/* Create an Account Link */}
          <div className="text-center mt-4 text-xs text-gray-400">
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