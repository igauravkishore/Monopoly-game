const PlayerModel= require('../models/PlayerModel');
const ErrorHandler= require('../utils/errorhandler');
const TransactionModel= require('../models/TransactionsModel');
const propertiesModel= require('../models/PropertiesModel');
const PASS_GO_SALARY = 200;


const getAllPlayers= async(req, res,next)=>{
    try{
        const players= await PlayerModel.getAllPlayers();
        res.json({success:true ,players});
    }
    catch (error) {
        console.error(error);
        return next(new ErrorHandler('Error getting all players', 500));
    }
};

const getPlayerById= async(req,res,next)=>{
      const playerId= req.params.id;
    try{
        const player= await PlayerModel.getPlayerById(playerId);
        if(!player)
        {
            return next(new ErrorHandler('Player not found', 404));
        }
        // res.redirect('/Players/moveToJail');
        res.json({ success: true, player });
    }
    catch (error) {
        console.error(error);
        return next(new ErrorHandler('Error getting player by ID', 500));
    }
};

const movePlayer= async(playerId, spaces, req,res,next)=>{
    try{
        const player= await PlayerModel.getPlayerById(playerId);
        player.position+=spaces;
        await playerModel.updatePlayerPosition(playerId, player.position);
        res.status(200).send('Player moved successfully');
    }
    catch{
         console.error("erron in moving player",error);
         return next(new ErrorHandler("Internal server error(in movePlayer)",500));
    }
};

const movePlayerToJail = async (req,res,next) => {
   
      const playerId= req.query.playerId;
    try {
        // Logic to move the player's game piece to jail  
        await PlayerModel.updatePlayerPosition(playerId, true);
        res.status(200).json({success:true , message:`player ${playerId} is moved to jail successfully `});
    } catch (error) {
        console.error('Error moving player to jail:', error);
        return next(new ErrorHandler("Internal server error(in movePlerToJail)",500));
    }
};


const moveOutOfJail = async (req,res,next) => {
   
    const playerId = req.query.playerId;
  try {
      // Logic to move the player's game piece to jail  
      await PlayerModel.updatePlayerPosition(playerId, false);
      res.status(200).json({success:true , message:`player ${playerId} is moved out of jail successfully `});
  } catch (error) {
      console.error('Error moving player to jail:', error);
      return next(new ErrorHandler("Internal server error(in movePlerToJail)",500));
  }
};

const markPlayerAsJustVisiting=async(req,res,next)=>{
    try {
        const {playerId} =req.body;
        await PlayerModel.markPlayerAsJustVisiting(playerId);
        console.log(`Player ${playerId} marked as just visiting successfully.`);
        res.status(200).send(`Player ${playerId} marked as just visiting successfully.`);
      }
       catch (error) {
        console.error('Error marking player as just visiting:', error);
        return next(new ErrorHandler("Failed to mark player as just visiting",500));

      }
}

const handlePassGo=async(req,res,next)=>{
    
    const playerId=req.query.playerId;
    try {
      
        const player = await PlayerModel.getPlayerById(playerId,next);
        let playerBalance = parseInt(await TransactionModel.getPlayerBalance(playerId,next),10);

        console.log(PASS_GO_SALARY);
        console.log(playerBalance);
        playerBalance += PASS_GO_SALARY;
        console.log(playerBalance);
        
        await TransactionModel.updatePlayerBalance(playerId, playerBalance,next);


        res.status(200).json({success:true, message:`Player ${playerId} passed GO and earned $${PASS_GO_SALARY}`});
      
    } 
    catch (error) {
       
        console.error('error in handlePassGo', error);
        return next(new ErrorHandler("error in handlePassGo",500));
    }
}

const calculateNetWorth = async (req, res, next) => {
    const playerId = req.params.playerId;

    try {
      
        const playerBalance = parseInt(await TransactionModel.getPlayerBalance(playerId));
        
        const properties = (await propertiesModel.getPropertyByOwnerId(playerId));

        let totalPropertyValue = 0;
        for (const property of properties) {
            totalPropertyValue += parseInt(property.price);
        }

        const netWorth = playerBalance + totalPropertyValue;

        res.status(200).json({ success: true, netWorth });
    } catch (error) {
        console.error('Error calculating net worth:', error);
        return next(new ErrorHandler('Error calculating net worth', 500));
    }
};


module.exports={
    getAllPlayers,
    getPlayerById,
    movePlayer,
    movePlayerToJail,
    markPlayerAsJustVisiting,
    handlePassGo,
    moveOutOfJail,
    calculateNetWorth
}
