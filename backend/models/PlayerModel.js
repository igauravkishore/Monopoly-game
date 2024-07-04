const db= require('../db/connection');
const ErrorHandler= require('../utils/errorhandler');

const getAllPlayers= async()=>{
    try{
        const [rows,fields]= await db.promise().query('SELECT * FROM Players');
        return rows;

    }
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler('Error in getting Players from db',500));
    }
};

const getPlayerById= async(playerId,next)=>{
    try{
        const [rows , fields]= await db.promise().query('SELECT * FROM Players WHERE player_id=?', [playerId]);
        return rows[0];
    }
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler('Error in getting PlayerById from db',500));
    }
};

const updatePlayerPosition=async(playerId, indication)=>{
    try{
        const query = 'UPDATE players SET in_jail = ? WHERE player_id = ?';
        await db.promise().query(query, [indication, playerId]);
        console.log('Player position updated successfully');
    }
    catch(error){
        console.error(error);
        return next(new ErrorHandler('Error in updating Player Position in database',500));
    }
}

const markPlayerAsJustVisiting= async(playerId)=>{
    try{
           const query= `UPDATE players SET in_jail = true WHERE player_id = ?`;
           await db.promise().query(query,[playerId]);
           console.log(`Player ${playerId} marked as just visiting jail.`);
    }
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler(error.message,500));
    }
};

module.exports={
    getAllPlayers,
    getPlayerById,
    updatePlayerPosition,
    markPlayerAsJustVisiting
}