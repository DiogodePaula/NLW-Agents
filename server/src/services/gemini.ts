import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

// vai ser usado base64 por que vamos trabalhar aqui com audios curtos
// se fosse mandar o audio de um podcast ou algo do tipo, seria melhor mandar o arquivo e depois converter
export async function transcribeAudio(audioAdBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAdBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error('Failed to transcribe audio');
  }

  return response.text;
}

export async function generateEmbedding(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT', // diz que é para usar em buscas semánticas e utilizar este conteudo em outros prompts
    },
  });

  if (!response.embeddings?.[0]?.values) {
    throw new Error('Failed to generate embedding');
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(question: string, transcriptions: string[]) {
  const context = transcriptions.join('\n\n');

  const prompt = `
  Com base no texto abaixo, gere uma resposta de forma clara e precisa para a pergunta do usuário em português do Brasil.
  Seja preciso e natural na resposta. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.
  Não seja muito formal, seja informal e natural.

  Contexto:
  ${context}

  Pergunta:
  ${question}

  Instruções:
  - Use apenas informações do contexto para gerar a resposta.
  - Se não houver informações relevantes no contexto, responda que não há informações relevantes.
  - Se a pergunta não for relevante ao contexto, responda que não há informações relevantes.
  - Seja objetivo.
  - Mantenha um tom educativo e profissional.
  - Cite trechos relevantes do contexto se apropriado.
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error('Failed to generate answer');
  }

  return response.text;
}
