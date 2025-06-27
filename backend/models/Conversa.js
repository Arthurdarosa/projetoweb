import mongoose from "mongoose";
const MensagemSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true }
});

const ConversaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensagens: [MensagemSchema],
  criadoEm: { type: Date, default: Date.now }
});
console.log('salvou conversa')
export default mongoose.model('Conversa', ConversaSchema);
