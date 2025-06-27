import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

dotenv.config();

const client = ModelClient(
  process.env.INFERENCE_ENDPOINT,
  new AzureKeyCredential(process.env.GITHUB_TOKEN)
);

export async function chatCompletion(messages) {
  console.log('essa é a mensagem',messages)
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        temperature: 0.7,
        top_p: 1,
        model: process.env.OPENAI_MODEL
      }
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error?.message || 'Erro na API');
    }

    return response.body.choices[0].message;
  } catch (error) {
    console.error('Erro na API OpenAI via GitHub:', error);
    throw error;
  }
}