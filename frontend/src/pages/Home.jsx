import { Link } from 'react-router-dom';

function Home() {
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
      justifyContent: 'space-between'
    }}>
      <div>
        <h1 style={{
          marginTop: '2rem',
          marginBottom: '1.5rem',
          color: '#2c3e50',
          fontSize: '2.5rem',
          fontWeight: '600'
        }}>
          English Tutor AI
        </h1>
        
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>Sobre o Projeto</h2>
          <p style={{ 
            textAlign: 'left',
            lineHeight: '1.6',
            fontSize: '1.1rem',
            marginBottom: '1rem'
          }}>
            Este projeto foi desenvolvido para a disciplina INE5646 - Programação Web do curso de Sistemas de Informação da UFSC.
          </p>
          <p style={{ 
            textAlign: 'left',
            lineHeight: '1.6',
            fontSize: '1.1rem'
          }}>
            Nossa plataforma utiliza inteligência artificial para oferecer um tutor personalizado de inglês, ajudando usuários a praticar e melhorar suas habilidades no idioma através de conversas interativas.
          </p>
        </div>

        <div style={{ margin: '2rem 0' }}>
          <p style={{ 
            fontSize: '1.2rem',
            marginBottom: '2rem',
            color: '#2c3e50'
          }}>
            Crie uma conta ou faça login em uma já existente!
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            <Link to="/login" style={{ width: '100%' }}>
              <button className='botao1' style={{
                width: '100%',
                padding: '12px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                Login
              </button>
            </Link>
            
            <Link to="/register" style={{ width: '100%' }}>
              <button className='botao1' style={{
                width: '100%',
                padding: '12px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                Registrar
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer style={{
        marginTop: '3rem',
        padding: '1.5rem',
        color: '#666',
        fontSize: '0.9rem',
        borderTop: '1px solid #e0e0e0'
      }}>
        <p>Projeto desenvolvido por:</p>
        <p style={{ fontWeight: '600', marginTop: '0.5rem' }}>
          Bruno Queiroz Castro e Arthur Rosa dos Santos
        </p>
        <p style={{ marginTop: '0.5rem' }}>INE5646 - Programação Web | UFSC</p>
      </footer>
    </div>
  );
}

export default Home;