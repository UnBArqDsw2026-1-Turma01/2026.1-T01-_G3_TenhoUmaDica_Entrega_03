import React, { useState } from 'react';
import '../pages/AvaliacoesPage/AvaliacoesPage.css';
import { saveDebugToken } from '../utils/firebaseDebugToken';

interface FirebaseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenReceived: (token: string) => void;
}

export function FirebaseAuthModal({ isOpen, onClose, onTokenReceived }: FirebaseAuthModalProps) {
  const [firebaseApiKey, setFirebaseApiKey] = useState("");
  const [firebaseEmail, setFirebaseEmail] = useState("teste@teste.com");
  const [firebasePassword, setFirebasePassword] = useState("123456");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: firebaseEmail,
          password: firebasePassword,
          returnSecureToken: true
        })
      });

      const data = await response.json();

      if (response.ok && data.idToken) {
        saveDebugToken(data.idToken);
        onTokenReceived(data.idToken);
        onClose();
        setFirebasePassword("123456"); // Resetando pro default após uso
      } else {
        alert(`Erro na autenticação Firebase:\n${data.error?.message || 'Token não recebido'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Falha na requisição à API do Firebase.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-container" onSubmit={handleFirebaseLogin}>
        <div className="modal-header">
          <h2>Autenticação Firebase</h2>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="modal-form-group">
          <label>API Key de Web (Web API Key)</label>
          <input 
            type="text" 
            className="modal-input" 
            value={firebaseApiKey}
            onChange={(e) => setFirebaseApiKey(e.target.value)}
            required
          />
        </div>

        <div className="modal-form-group">
          <label>Email do usuário</label>
          <input 
            type="email" 
            className="modal-input" 
            placeholder="teste@email.com"
            value={firebaseEmail}
            onChange={(e) => setFirebaseEmail(e.target.value)}
            required
          />
        </div>

        <div className="modal-form-group">
          <label>Senha</label>
          <input 
            type="password" 
            className="modal-input" 
            placeholder="******"
            value={firebasePassword}
            onChange={(e) => setFirebasePassword(e.target.value)}
            required
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-btn modal-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="modal-btn modal-btn-submit" disabled={isAuthenticating}>
            {isAuthenticating ? "Autenticando..." : "Gerar Token"}
          </button>
        </div>
      </form>
    </div>
  );
}
