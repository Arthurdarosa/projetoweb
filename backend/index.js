const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const conversaRoutes = require('./routes/conversa');
app.use('/api/conversas', conversaRoutes);


// Teste de rota
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Erro ao conectar MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));