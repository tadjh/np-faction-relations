import express from 'express';
import { ORIGIN, PORT } from './config';
import cors from 'cors';
import faction from './routes/faction';
const app = express();

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', faction);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
