import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const token = localStorage.getItem('token');
  const messagesEndRef = useRef(null);

  // Carrega a conversa ao montar o componente
  useEffect(() => {
    const loadConversation = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/conversas',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response.data.mensagens);
      } catch (error) {
        console.error('Erro ao carregar conversa:', error);
        setMessages([{ 
          role: 'assistant', 
          content: 'Olá! Sou seu tutor de inglês. Como posso te ajudar?' 
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConversation();
  }, [token]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    setIsSending(true);
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/conversas',
        { content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages(response.data.mensagens);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: 'Erro ao enviar mensagem. Tente novamente.'
      }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Tutor de Inglês IA</h2>
        <p>Aprenda inglês com nosso assistente inteligente</p>
      </div>

      <div className="chat-messages">
        {isLoading ? (
          <div className="loading-indicator">Carregando conversa...</div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-textarea"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem aqui..."
          disabled={isLoading || isSending}
        />
        <button
          className="send-button"
          onClick={sendMessage}
          disabled={isLoading || isSending || !input.trim()}
        >
          {isSending ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}

export default Chat;