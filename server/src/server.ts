import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { createRoomsRoute } from './http/routes/create-rooms.ts';
import { getRoomsQuestionsRoute } from './http/routes/get-rooms-questions.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';

// Cria a instância do Fastify com suporte a tipagem TypeScript
const app = fastify().withTypeProvider<ZodTypeProvider>();

// Configura CORS para permitir requisições de qualquer origem
app.register(fastifyCors, {
  origin: true,
});

// Define o compilador de serialização para resposta da API
app.setSerializerCompiler(serializerCompiler);

// Define o compilador de validação para parâmetros de entrada
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyMultipart);

app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomsQuestionsRoute);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.get('/health', (request, reply) => {
  return reply.status(200).send({ status: 'ok' });
});

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando na porta ${address}`);
});
