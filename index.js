import {adminApiV1} from './controllers/admin_api_v1';
import express from 'express';
import {Kafka, logLevel} from 'kafkajs';
import {v4 as uuidv4} from 'uuid';
const winston = require('winston');

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});

if (!process.env.NODE_ENV || process.env.BROKERS) {
  logger.error('missing minimum configuration...');
  logger.error('NODE_ENV and BROKERS not set, exiting');
  process.exit(1);
}

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const kafkaConfig = {
  clientId: 'observability-api',
  brokers: process.env.BROKERS.split(','),
  ssl: process.env.SSL || false,
  logLevel: process.env.NODE_ENV === 'production'?
    logLevel.ERROR : logLevel.INFO,
};

if (process.env.SASL_MECH && process.env.USERNAME && process.env.PASSWORD) {
  logger.info('sasl auth configured in the environment');
  kafkaConfig.sasl = {
    mechanism: process.env.SASL_MECH || 'plain',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  };
}

const kafka = new Kafka(kafkaConfig);
export const admin = kafka.admin();

logger.info('connecting admin client...');
admin.connect().then(() => {
  logger.info('succesfully established connection to cluster');
}).catch((err) => {
  logger.error(`couldn't establish connection to ${process.env.BROKERS}`);
  logger.error(err);
  logger.error('shutting down after unsuccesful connection...');
  process.exit(1);
});

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
