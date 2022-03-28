import { Router } from 'express';
import Faction from '../models/faction';
const router = Router();

router.get('/factions', (req, res) => {
  res.send('All factions retrieved');
});

router.get('/faction/:id', (req, res) => {
  res.send('Faction retrieved');
});

router.post('/faction', async (req, res) => {
  try {
    const data = await Faction.create({ ...req.body });
    res.json({
      data,
      message: `Faction ${req.body.nickname || req.body.name} created`,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Unable to create faction' });
  }
});

router.put('/faction/:id', (req, res) => {
  res.send('Faction updated');
});

router.delete('/faction/:id', (req, res) => {
  res.send('Faction removed');
});

export default router;
