import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bem-vindo ao Aprendizado de Inglês com IA</h1>
      <p>Faça login ou registre-se para começar!</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Registrar</button></Link>
    </div>
  );
}

export default Home;
