const express = require('express');
const router = express.Router();
const GameController = require('../controllers/gameController');

router.post('/rollDiceAndMOve',GameController.rollDiceAndMOve);

module.exports = router;
