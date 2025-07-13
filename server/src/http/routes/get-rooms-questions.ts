import { desc, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../db/connections.ts';
import { schema } from '../../db/schema/index.ts';

export const getRoomsQuestionsRoute: FastifyPluginCallbackZod = async (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params as { roomId: string };

      // Primeiro verifica se a sala existe
      const roomExists = await db
        .select({ id: schema.rooms.id })
        .from(schema.rooms)
        .where(eq(schema.rooms.id, roomId))
        .limit(1);

      if (!roomExists[0]) {
        return reply.status(404).send({ error: 'Room not found' });
      }

      // Busca as perguntas da sala
      const result = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createdAt: schema.questions.createdAt,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createdAt));

      return result;
    }
  );
};
