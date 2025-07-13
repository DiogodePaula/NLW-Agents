import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../db/connections.ts';
import { schema } from '../../db/schema/index.ts';
import { generateAnswer, generateEmbedding } from '../../services/gemini.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = async (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string().uuid(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params as { roomId: string };
      const { question } = request.body as { question: string };

      // embedding forma de comparar semântica de frases, so e possível compara embedding com embedding
      // usando o mesmo modelo e algoritmo de embedding
      const embedding = await generateEmbedding(question);
      const embeddingString = `[${embedding.join(',')}]`;
      // 1. Buscar chunks que sejam relevantes para a pergunta
      // 2. Gerar resposta com base nas chunks relevantes
      // 3. Salvar resposta no banco de dados
      // 4. Retornar resposta

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingString}::vector)`,
        })
        .from(schema.audioChunks)
        .where(
          // 0.7 grau de similaridade, quanto mais perto de um mais provável de responder a pergunta do usuario
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingString}::vector) > 0.7`
          )
        )
        .orderBy(sql`(${schema.audioChunks.embeddings} <=> ${embeddingString}::vector)`) // ordena pela similaridade
        .limit(3);

      let answer: string | null = null;

      if (chunks.length > 0) {
        const transcriptions = chunks.map((chunk) => chunk.transcription);

        answer = await generateAnswer(question, transcriptions);
      }

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
          answer,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create new question');
      }

      return reply.status(201).send({ questionId: insertedQuestion.id, answer });
    }
  );
};
