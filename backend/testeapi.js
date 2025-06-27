import { chatCompletion } from './openaiClient.js';

async function testChatAPI() {
  try {
    console.log("Iniciando teste da API...");
    
    const messages = [
      { role: "system", content: "Você é um tutor de inglês." },
      { role: "user", content: "Traduza para o inglês: Cachorro" }
    ];

    const response = await chatCompletion(messages);
    console.log("✅ Resposta da API:", response.content);
    
    if(response.content.toLowerCase().includes("dog")) {
      console.log("✔ Teste passou: a IA respondeu corretamente");
    } else {
      console.log("✖ Teste falhou: resposta inesperada");
    }
  } catch (error) {
    console.error("❌ Erro no teste:", error);
  }
}

testChatAPI();