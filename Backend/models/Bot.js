import mongoose from 'mongoose';

const botSchema = new mongoose.Schema({
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
name: String,
flow: Object,
usage: { type: Number, default: 0 }
});

export default mongoose.model('Bot', botSchema);