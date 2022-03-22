import express from 'express';

const main = express.Router();

main.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Api main route');
});

export default main;
