import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editando, setEditando] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get(`${apiUrl}/api/auth/usuarios/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUsuario(res.data);
      setNome(res.data.nome);
      setEmail(res.data.email);
    })
    .catch(() => {
      setMsg('Erro ao buscar dados do usuário');
    });
  }, [token, userId, navigate]);

  const handleSalvar = () => {
    axios.put(`${apiUrl}/api/auth/usuarios/${userId}`, { nome, email }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setMsg('Dados atualizados!');
      setEditando(false);
      setUsuario(prev => ({ ...prev, nome, email }));

    })
    .catch(() => setMsg('Erro ao atualizar'));
  };

  const handleExcluir = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta?')) {
      axios.delete(`${apiUrl}/api/auth/usuarios/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        localStorage.clear();
        navigate('/');
      })
      .catch(() => setMsg('Erro ao excluir conta'));
    }
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Perfil</h2>

      {!editando ? (
        <>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button onClick={handleSalvar}>Salvar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      )}

      <hr />
      <button onClick={handleExcluir} style={{ backgroundColor: 'red', color: 'white' }}>
        Excluir Conta
      </button>

      <hr />
      <button onClick={() => navigate('/chat')}>Iniciar Chat</button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Profile;
