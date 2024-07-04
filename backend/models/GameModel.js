const db = require('../db/connection');
const ErrorHandler = require('../utils/errorhandler');


const startGame = async () => {
    try {
   
        return game;
    } catch (error) {
        console.error(error);
        throw new ErrorHandler('Error starting game', 500);
    }
};


module.exports = {
    startGame
};
