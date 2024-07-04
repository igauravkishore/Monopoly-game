const express= require('express');
const router=express.Router();
const CardController=require('../controllers/cardsController');

router.get('/draw-card',CardController.drawCard);


module.exports=router;