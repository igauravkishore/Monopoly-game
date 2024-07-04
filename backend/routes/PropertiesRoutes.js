const express= require('express');
const router= express.Router();
const propertiesController=require('../controllers/propertiesController');


router.get('/getAllProperties', propertiesController.getAllProperties);
router.get('/getProperty/:id',propertiesController.getPropertyById);
router.get('/buyProperty/:playerId/:propertyId',propertiesController.buyPropery);
router.post('/hasMonopoly',propertiesController.hasMonopoly);
router.post('/calculateRent',propertiesController.calculateRent);
router.put('/updatePropertyOwnership',propertiesController.updatePropertyOwnership);
router.post('/buildHouses', propertiesController.buildHouses);
router.post('/buildHotels', propertiesController.buildHotel);
router.post('/:propertyId/mortgage', propertiesController.mortgageProperty);
router.post('/:propertyId/unmortgage', propertiesController.unmortgagedProperty);

module.exports=router;