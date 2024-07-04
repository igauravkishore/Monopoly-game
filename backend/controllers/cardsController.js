const ErrorHandler = require('../utils/errorhandler');
const CardModel = require('../models/CardsModel');



const drawCard = async (req, res, next) => {
    try {
        const cardType = req.query.cardType;
        const drawnCard = await CardModel.drawCard(cardType,next);
        
        res.status(200).json({ success: true, card: drawnCard });
    } catch (error) {
        console.error('Error drawing card:', error);
        return next(new ErrorHandler('Error drawing card', 500));
    }
};


module.exports = {
    drawCard
};
