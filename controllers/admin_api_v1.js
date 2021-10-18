import {Router} from 'express';
import {kafka} from '..';

export const adminApiV1 = new Router();

adminApiV1.use(async (req, res, next) => {
  res.setHeader('Accept-Version', 'v1');
  next();
});

