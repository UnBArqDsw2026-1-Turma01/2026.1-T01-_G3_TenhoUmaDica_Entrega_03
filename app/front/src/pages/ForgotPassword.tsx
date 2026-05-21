import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../firebase'; 

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Firebase logic placeholder
      // await sendPasswordResetEmail(auth, email);
      
      console.log('Password reset requested for:', email);
      setMessage('Se houver uma conta associada a este e-mail, enviaremos um link de recuperação.');
    } catch (err: any) {
      console.error(err);
      setError('Ocorreu um erro ao tentar enviar o e-mail de recuperação.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#001f4d] via-[#003366] to-[#0059b3] flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        {/* Voltar (Back) Link */}
        <div className="mb-3 pl-2">
          <Link to="/login" className="text-gray-300 hover:text-white flex items-center text-sm font-medium transition duration-150 w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Voltar
          </Link>
        </div>

        <div className="bg-[#0a162d] p-6 sm:p-8 rounded-2xl shadow-2xl w-full">
          
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#004080] p-4 rounded-lg">
              <span className="text-white text-2xl font-bold">Logo</span>
            </div>
          </div>

          {/* Titles & Instructions */}
          <div className="text-center mb-8 space-y-3">
            <h1 className="text-2xl font-semibold text-white">Problemas para entrar?</h1>
            <p className="text-sm text-gray-400 px-2">
              Insira o seu email e te enviaremos um link para você redefinir sua senha e voltar a acessar a sua conta.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleResetPassword} className="space-y-5">
            
            {/* Feedback Messages */}
            {message && <div className="text-green-400 text-sm text-center bg-green-900/20 p-3 rounded-lg">{message}</div>}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Qual é o seu email?</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@gmail.com"
                required
                className="w-full px-4 py-2.5 bg-[#2c3e50] border border-[#2c3e50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition duration-150"
              />
            </div>

            {/* Error Messages */}
            {error && <div className="text-red-500 text-sm text-center bg-red-900/20 p-3 rounded-lg">{error}</div>}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#004080] text-white font-semibold rounded-xl hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2 focus:ring-offset-[#0a162d] transition duration-150"
              >
                Enviar código para o email
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;