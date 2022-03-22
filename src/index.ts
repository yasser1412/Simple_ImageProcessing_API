import express from 'express';
import main from './routes/index';
import images from './routes/images';

const app = express();
const PORT = process.env.PORT || 8000;

app.use('/api', main);
app.use('/api/images', images);

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);

export default app;
