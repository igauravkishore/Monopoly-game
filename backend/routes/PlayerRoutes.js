const express= require('express');
const router= express.Router();
const PlayerController= require('../controllers/playerController');

router.get('/getAllPlayers', PlayerController.getAllPlayers);
router.get('/getPlayerById/:id', PlayerController.getPlayerById);
router.post('/markPlayerAsJustVisiting', PlayerController.markPlayerAsJustVisiting);
router.get('/pass-go', PlayerController.handlePassGo);
router.get('/moveToJail', PlayerController.movePlayerToJail);
router.post('/moveOutOfJail', PlayerController.moveOutOfJail);
router.get('/:playerId/calculateNetworth',PlayerController.calculateNetWorth);


module.exports=router;

