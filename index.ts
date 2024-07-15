import { root } from './graphql/root_resolver';
import { schema } from './graphql/schema';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import * as expressPlayground from 'graphql-playground-middleware-express';
import { databaseConnection } from './mongodb/connection';

const app = express();

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const start = async () => {
  try {
    await databaseConnection();

    app.listen(3000, () => {
      console.log('Server started on port 3000');
      console.log(
        'Running a GraphQL API server at http://localhost:3000/graphql'
      );
      console.log('GraphQL playground at http://localhost:3000/playground');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
