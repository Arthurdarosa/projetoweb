import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/auth/register`, { nome, email, senha });
      setSuccess('Usuário registrado com sucesso! Você será redirecionado para login...');
      setError('');
      setNome('');
      setEmail('');
      setSenha('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao registrar');
      setSuccess('');
    }
  };

  return (
    <div style={{
      boxSizing: 'border-box',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'white',
      width: '70vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          color: '#2c3e50',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          fontWeight: '600'
        }}>
          Criar nova conta
        </h2>
        
        {error && (
          <div style={{
            color: '#e74c3c',
            backgroundColor: '#fadbd8',
            padding: '0.8rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            color: '#27ae60',
            backgroundColor: '#d5f5e3',
            padding: '0.8rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '500'
            }}>
              Nome completo
            </label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'border 0.3s'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '500'
            }}>
              E-mail
            </label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'border 0.3s'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '500'
            }}>
              Senha
            </label>
            <input
              type="password"
              placeholder="Crie uma senha segura"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'border 0.3s'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Registrar
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', color: '#666' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Já tem uma conta?
          </p>
          <Link to="/login" style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;