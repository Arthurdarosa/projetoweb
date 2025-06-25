const mongoose = require('mongoose');

const MensagemSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'ia'], required: true },
  texto: { type: String, required: true }
});

const ConversaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensagens: [MensagemSchema],
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversa', ConversaSchema);
