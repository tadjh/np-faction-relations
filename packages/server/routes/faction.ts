import { Router } from 'express';
import Model, { Faction } from '../models/faction';
import { HydratedDocument } from 'mongoose';
const router = Router();

router.get('/factions', async (req, res) => {
  try {
    const doc = await Model.find<Faction>({ active: true }).exec();
    doc.sort((a, b) => a.order - b.order);
    res.json({
      doc,
      message: `All Active Factions retrieved`,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Unable to find active factions' });
  }
});

router.get('/faction/:id', async (req, res) => {
  try {
    const doc = await Model.findById<Faction>(req.params.id);
    res.json({
      doc,
      message: `Faction ${doc?.nickname || doc?.name} retrieved`,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Unable to find faction' });
  }
});

router.post('/faction', async (req, res) => {
  try {
    const doc: HydratedDocument<Faction> = new Model<Faction>(req.body);
    await doc.save();
    res.json({
      doc,
      message: `Faction ${doc.nickname || doc.name} created`,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Unable to add faction' });
  }
});

router.put('/faction/:id', (req, res) => {
  res.send('Faction updated');
});

router.delete('/faction/:id', (req, res) => {
  res.send('Faction removed');
});

export default router;
