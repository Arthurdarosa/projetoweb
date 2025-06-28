import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ boxSizing: 'border-box',margin:'0px', padding: '2rem 2rem 0px 2rem ', textAlign: 'center', backgroundColor: 'white', margin: 'auto', width: '70vw', minHeight: '100vh'  }}>
      <h1 style={{marginTop:15}}>Bem-vindo ao Aprendizado de Inglês com IA</h1>
      <p style={{marginTop: 15, marginBottom: 15}}>Faça login ou registre-se para começar!</p>
      <Link to="/login"><button className='botao1' style={{maxWidth: '300px', width: '100%', padding: 10, marginBottom: 10, marginTop: 10 }}>Login</button></Link>
      <br />
      <Link to="/register"><button className='botao1' style={{maxWidth: '300px', width: '100%', padding: 10 }}>Registrar</button></Link>
    </div>
  );
}

export default Home;
