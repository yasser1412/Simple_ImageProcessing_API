import express from 'express';

const main = express.Router();

main.get('/', (req, res) => {
  res.send('Api main route');
});

export default main;
