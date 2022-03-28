import express from 'express';
import { ORIGIN, PORT } from './config';
import cors from 'cors';
import faction from './routes/faction';
import connectDB from './config/db';
const app = express();

connectDB();

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', faction);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
