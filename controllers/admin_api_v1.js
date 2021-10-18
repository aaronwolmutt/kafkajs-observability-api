import {Router} from 'express';
import {admin, logger} from '..';

export const adminApiV1 = new Router();

adminApiV1.use(async (req, res, next) => {
  res.setHeader('Accept-Version', 'v1');
  next();
});

adminApiV1.get('/topics', async (req, res) => {
  await admin.listTopics()
      .then((topics) => {
        logger.info(`found ${topics.length} topics...`);
        logger.info('sent topics array');
        return res.status(200).send(topics);
      }).catch((err) => {
        logger.error('error handled getting Kafka topics');
        return res.status(500).send();
      });
});

adminApiV1.get('/cluster', async (req, res) => {
  await admin.describeCluster()
      .then((clusterInfo) => {
        logger.info('found cluster info');
        logger.info('sending cluster info to client');
        return res.status(200).send(clusterInfo);
      }).catch((err) => {
        logger.error(`error handled getting cluster info ${err}`);
        return res.status(500).send();
      });
});
