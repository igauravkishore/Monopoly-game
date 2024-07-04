const express= require('express');
const router= express.Router();
const transactionsController=require('../controllers/transactionsController');
const ErrorHandler=require('../utils/errorhandler');

router.get('/getAllTransactions', transactionsController.getAllTransactions);
// router.post('/payRent', transactionsController.payRent);
router.get('/payRent/:playerId/:propertyId', transactionsController.payRent );

  router.post('/payTax', async (req, res, next) => {
    try {
      const { playerId, taxAmount } = req.body;
  
      // Call the payRent function from the transactionsController
      await transactionsController.payTax(playerId, taxAmount);
  
      res.status(200).json({ success: true, message: 'tax paid successfully' });
    } catch (error) {
      console.error(error);
      return next (new ErrorHandler('Error paying rent', 500));
    }
  });
module.exports=router;