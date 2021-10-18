import {adminApiV1} from './controllers/admin_api_v1';
import express from 'express';
import {Kafka} from 'kafkajs';
import {v4 as uuidv4} from 'uuid';
const winston = require('winston');

if (!process.env.NODE_ENV) {
  logger.error('NODE_ENV not set, exiting');
  process.exit(1);
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});

if (process.env.BROKERS) {
  const kafka = new Kafka({
    clientId: 'observability-js',
    brokers: process.env.BROKERS.split(','),
  });
}

export const app = express();
const port = process.env.PORT || 3000;

app.all('/*', async (req, res, next) => {
  res.setHeader('X-Correlation-ID', uuidv4().toString());
  next();
});

app.use('/api/v1', adminApiV1);

app.get('/', async (req, res) => {
  return res.status(204).send();
});

app.listen(port, () => {
  logger.info(`express listening on port ${port}`);
});
