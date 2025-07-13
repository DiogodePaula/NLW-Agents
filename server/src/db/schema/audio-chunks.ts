import { pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.ts';

export const audioChunks = pgTable('audio_chunks', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id')
    .references(() => rooms.id)
    .notNull(),
  transcription: text().notNull(),
  embeddings: vector({ dimensions: 768 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

// O campo embeddings armazena vetores de 768 dimensões que representam
// o conteúdo semântico do áudio transcrito cada dimensão é um número que
// captura aspectos específicos do significado, permitindo busca por similaridade
