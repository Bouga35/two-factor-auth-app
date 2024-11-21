const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Générer un token JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);
    res.redirect('/dashboard');
  }
);

module.exports = router;
