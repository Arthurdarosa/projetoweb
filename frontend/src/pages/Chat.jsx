import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá, sou uma IA instruída para te ajudar com seu aprendizado no inglês, como posso te ajudar?' }
  ]);
  const token = localStorage.getItem('token');
  const messagesEndRef = useRef(null);

  // Scroll automático ao final da conversa
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: 'user', content: input };
  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setInput('');

  try {
    const response = await axios.post(
      'http://localhost:3000/api/conversas/chat',
      { mensagens: updatedMessages },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Corrigido: Criar objeto de mensagem no formato esperado
    const assistantMessage = {
      role: 'assistant',
      content: response.data.resposta // Acessa a propriedade 'resposta'
    };
    
    setMessages([...updatedMessages, assistantMessage]);
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    const errorMessage = {
      role: 'assistant',
      content: 'Erro ao se comunicar com a IA. Tente novamente.'
    };
    setMessages([...updatedMessages, errorMessage]);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: '1rem' }}>
      <h2>Chat com IA</h2>

      <div 
        style={{ 
          border: '1px solid #ccc', 
          borderRadius: 8, 
          height: 400, 
          padding: '1rem', 
          overflowY: 'auto', 
          backgroundColor: '#f9f9f9' 
        }}
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              marginBottom: 12, 
              textAlign: msg.role === 'user' ? 'right' : 'left' 
            }}
          >
            <span 
              style={{ 
                display: 'inline-block',
                padding: '8px 12px', 
                borderRadius: 16, 
                backgroundColor: msg.role === 'user' ? '#007bff' : '#e5e5ea', 
                color: msg.role === 'user' ? 'white' : 'black',
                maxWidth: '75%',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <textarea
        rows={3}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem aqui..."
        style={{ 
          width: '100%', 
          marginTop: 12, 
          padding: 10, 
          borderRadius: 6, 
          border: '1px solid #ccc',
          resize: 'none',
          fontSize: 16
        }}
      />

      <button 
        onClick={sendMessage} 
        style={{ 
          marginTop: 10, 
          padding: '10px 20px', 
          borderRadius: 6, 
          border: 'none', 
          backgroundColor: '#007bff', 
          color: 'white', 
          fontWeight: 'bold',
          cursor: 'pointer' 
        }}
      >
        Enviar
      </button>
    </div>
  );
}

export default Chat;
