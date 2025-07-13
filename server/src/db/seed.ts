import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connections.ts';
import { schema } from './schema/index.ts';

await reset(db, schema);

await seed(db, schema).refine((f) => ({
  rooms: {
    count: 5,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum(),
      createdAt: f.date(),
    },
    questions: {
      count: 20,
    },
  },
}));

await sql.end();

console.log('Seed completed');
