import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, senha });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      setError('');
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro no login');
    }
  };

  return (
    <div style={{ boxSizing: 'border-box',margin:'0px', padding: '2rem 2rem 0px 2rem ', textAlign: 'center', backgroundColor: 'white', margin: 'auto', width: '70vw', minHeight: '100vh'  }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ boxSizing: 'border-box', width: '100%', padding: 8, marginBottom: 10, marginTop: 10 }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={{ boxSizing: 'border-box', width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button className='botao1' type="submit" style={{ maxWidth: '300px', width: '100%', padding: 10 }}>Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
