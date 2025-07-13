import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../db/connections.ts';
import { schema } from '../../db/schema/index.ts';
import { generateEmbedding, transcribeAudio } from '../../services/gemini.ts';

export const uploadAudioRoute: FastifyPluginCallbackZod = async (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params as { roomId: string };
      const audio = await request.file();

      if (!audio) {
        return reply.status(400).send({ message: 'No audio file uploaded' });
      }
      // 1. Transcrever o audio
      // 2. Gerar vetor semántico / embeddings
      // 3. Salvar vetores no banco de dados

      // acumula todo o conteudo do audio
      const audioBuffer = await audio.toBuffer();
      const audioBase64 = audioBuffer.toString('base64');

      const transcription = await transcribeAudio(audioBase64, audio.mimetype);
      const embeddings = await generateEmbedding(transcription);

      const result = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription,
          embeddings,
        })
        .returning();

      const chunk = result[0];

      if (!chunk) {
        throw new Error('Failed to create new audio chunk');
      }

      return reply.status(201).send({ chunkId: chunk.id });
    }
  );
};
