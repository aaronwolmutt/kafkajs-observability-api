import {adminApiV1} from './controllers/admin_api_v1';
import express from 'express';
import {v4 as uuidv4} from 'uuid';


export const app = express();
const port = process.env.PORT || 3000;

if (!process.env.NODE_ENV) {
  console.error('environment not set, exiting');
  process.exit(1);
}

app.all('/*', async (req, res, next) => {
  res.setHeader('X-Correlation-ID', uuidv4().toString());
  next();
});

app.use('/api/v1', adminApiV1);

app.get('/', async (req, res) => {
  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`express listening on port ${port}`);
});
