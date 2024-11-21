const express = require('express');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/User');
const router = express.Router();

// Activer la 2FA
router.post('/enable-2fa', async (req, res) => {
  const userId = req.user.id; // Récupérer l'ID utilisateur
  const secret = speakeasy.generateSecret({ length: 20 });

  await User.findByIdAndUpdate(userId, {
    isTwoFactorAuthEnabled: true,
    twoFactorAuthSecret: secret.base32,
  });

  res.json({ message: '2FA activée', secret: secret.otpauth_url });
});

// Vérifier le code 2FA
router.post('/verify-2fa', async (req, res) => {
  const { userId, token } = req.body;
  const user = await User.findById(userId);

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorAuthSecret,
    encoding: 'base32',
    token,
  });

  if (verified) {
    res.json({ success: true, message: '2FA vérifiée' });
  } else {
    res.json({ success: false, message: 'Code invalide' });
  }
});

module.exports = router;
