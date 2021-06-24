import express from 'express';
import serviceRouter from './routes/ponto.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', serviceRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log('API started');
});
