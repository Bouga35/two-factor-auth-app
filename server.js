require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authRoutes = require('./router/auth');
require('./config/passport');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connecter à MongoDB
mongoose.connect('mongodb://localhost:27017/two-factor-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('✅ Connecté à la base de données MongoDB !');
    })
    .catch((err) => {
      console.error('❌ Erreur de connexion à MongoDB :', err);
    });

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
