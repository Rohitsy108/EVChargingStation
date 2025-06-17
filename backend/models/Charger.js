import mongoose from 'mongoose';

const chargerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'available' }
}, { timestamps: true });

export default mongoose.model('Charger', chargerSchema);