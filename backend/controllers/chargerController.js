import Charger from '../models/Charger.js';

export const getChargers = async (req, res, next) => {
  try {
    const chargers = await Charger.find();
    res.json(chargers);
  } catch (err) {
    next(err);
  }
};

export const createCharger = async (req, res, next) => {
  try {
    const { name, location, type, status } = req.body;
    const charger = await Charger.create({ name, location, type, status });
    res.status(201).json(charger);
  } catch (err) {
    next(err);
  }
};

export const updateCharger = async (req, res, next) => {
  try {
    const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!charger) return res.status(404).json({ message: 'Charger not found' });
    res.json(charger);
  } catch (err) {
    next(err);
  }
};

export const deleteCharger = async (req, res, next) => {
  try {
    const charger = await Charger.findByIdAndDelete(req.params.id);
    if (!charger) return res.status(404).json({ message: 'Charger not found' });
    res.json({ message: 'Charger deleted' });
  } catch (err) {
    next(err);
  }
};