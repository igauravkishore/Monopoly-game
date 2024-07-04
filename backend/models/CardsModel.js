const db = require('../db/connection');
const ErrorHandler = require('../utils/errorhandler');


const drawCard=async(cardType,next)=>{
    try {
       
        const query = 'SELECT * FROM Cards WHERE card_type = ? ORDER BY card_id ASC LIMIT 1';
        const [row] = await db.promise().query(query, [cardType]);

        if (!row || row.length === 0) {
            return next(new ErrorHandler('No cards available in the deck',500));
        }
          const drawnCard = row[0];

          await removeTopCard(drawnCard,next);
  
          await insertCardAtBottom(drawnCard,next);
  
          return drawnCard;
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Error drawing card',500));
    }
}

const removeTopCard=async(drawnCard,next)=>{
    try {
        const query = 'DELETE FROM Cards WHERE card_id = ? AND card_type = ?';
        await db.promise().query(query, [drawnCard.card_id, drawnCard.card_type]);
        console.log("Top card is removed");
    } catch (error) {
        console.log("Error removing TopCard",error);
        return next(new ErrorHandler('Error removing TopCard',500));
    }
}

const insertCardAtBottom=async(drawnCard,next)=>{
    try {
        const query = 'INSERT INTO Cards (card_name, card_description, card_type) VALUES (?, ?, ?)';
        await db.promise().query(query, [drawnCard.card_name, drawnCard.card_description, drawnCard.card_type]);
        console.log("drawnCard inserted at bottom");
    } catch (error) {
        console.log("Error inserting TopCard at bottom",error);
        return next(new ErrorHandler('Error inserting TopCard at bottom',500));
    }
}

module.exports={
    drawCard
};