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
      setMsg('Dados atualizados com sucesso!');
      setEditando(false);
      setUsuario(prev => ({ ...prev, nome, email }));
    })
    .catch(() => setMsg('Erro ao atualizar dados'));
  };

  const handleExcluir = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta permanentemente?')) {
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!usuario) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <p>Carregando...</p>
    </div>
  );

  return (
    <div style={{
      boxSizing: 'border-box',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'white',
      width: '70vw',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '600px',
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
          Meu Perfil
        </h2>

        {msg && (
          <div style={{
            color: msg.includes('Erro') ? '#e74c3c' : '#27ae60',
            backgroundColor: msg.includes('Erro') ? '#fadbd8' : '#d5f5e3',
            padding: '0.8rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {msg}
          </div>
        )}

        {!editando ? (
          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#666', marginBottom: '0.3rem' }}>Nome</p>
              <p style={{
                padding: '0.8rem',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}>
                {usuario.nome}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#666', marginBottom: '0.3rem' }}>E-mail</p>
              <p style={{
                padding: '0.8rem',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}>
                {usuario.email}
              </p>
            </div>

            <button
              onClick={() => setEditando(true)}
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
                marginBottom: '1rem',
                transition: 'background-color 0.3s'
              }}
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666',
                fontWeight: '500'
              }}>
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666',
                fontWeight: '500'
              }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button
              onClick={handleSalvar}
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '0.8rem',
                transition: 'background-color 0.3s'
              }}
            >
              Salvar Alterações
            </button>

            <button
              onClick={() => setEditando(false)}
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              Cancelar
            </button>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={() => navigate('/chat')}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '0.8rem',
              transition: 'background-color 0.3s'
            }}
          >
            Iniciar Chat com Tutor
          </button>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#7f8c8d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '0.8rem',
              transition: 'background-color 0.3s'
            }}
          >
            Sair da Conta
          </button>

          <button
            onClick={handleExcluir}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Excluir Conta Permanentemente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;