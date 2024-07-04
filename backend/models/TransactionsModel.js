const db= require('../db/connection');
const ErrorHandler=require('../utils/errorhandler');


const getAllTransactions= async(next)=>{
    try{
           const query='SELECT * FROM transactions';
           const [row, fields]= await db.promise().query(query);
           return row;
    }
    catch(error)
    {
        console.log(error);
        return next(new ErrorHandler('Error getting transactions from the database', 500));
    }
};

const getPlayerBalance= async(playerId,next)=>{
    try{
        
         const query = 'SELECT balance FROM PlayerBalances WHERE player_id = ?';
         const [rows] = await db.promise().query(query, [playerId]);
         if (rows.length === 0) {
            return next(new ErrorHandler('Player balance not found', 500));
         }
         return rows[0].balance;
    }
    catch(error)
    {
        console.log(error);
        return next(new ErrorHandler('error in getting PlayerBalance from database', 500));

    }
};

const updatePlayerBalance= async(playerId, newBalance,next)=>{
    try{
        const query = 'UPDATE PlayerBalances SET balance = ? WHERE player_id = ?';
        await db.promise().query(query, [newBalance, playerId]);
        console.log("PlayerBalance Table is updated successfully");
    }
    catch(error)
    {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
}



module.exports={
    getAllTransactions,
    getPlayerBalance,
    updatePlayerBalance
}