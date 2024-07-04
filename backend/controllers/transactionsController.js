const TransactionModel= require('../models/TransactionsModel');
const ErrorHandler= require('../utils/errorhandler');
const PropertyModel= require('../models/PropertiesModel');


const getAllTransactions= async(req,res,next)=>{
    try{
        const transactions= await TransactionModel.getAllTransactions(next);
        res.json({success: true, transactions});
    }
    catch(error)
    {
        console.log(error);
        return next(new ErrorHandler('Error getting transactions',500));
    }
}

const payRent= async(req,res,next)=>{
    try {
         const playerId = req.params.playerId;
         const propertyId = req.params.propertyId;
         console.log(playerId);
        const [property] = await PropertyModel.getPropertyById(propertyId);
        
        console.log(property);
        console.log(`ownerId of property= ${property.owner_id}`);

        if(property.owner_id !=playerId)
        {   
            if(!property.mortgaged)

          {   const propertyOwnerId = property.owner_id;
        
        const playerBalance = await TransactionModel.getPlayerBalance(playerId,next);

        const rentAmount = property.rent;

        if (parseInt(playerBalance) < parseInt(rentAmount)) {
            return next(new ErrorHandler('Insufficient funds to pay rent',500));
        }

        const updatedBalance = parseFloat(playerBalance) - parseFloat(rentAmount);

        await TransactionModel.updatePlayerBalance(playerId, updatedBalance,next);

        const propertyOwnerBalance = await TransactionModel.getPlayerBalance(propertyOwnerId,next);
        const updatedOwnerBalance = parseFloat(propertyOwnerBalance) + parseFloat(rentAmount);
        await TransactionModel.updatePlayerBalance(propertyOwnerId, updatedOwnerBalance,next);

        console.log(`Rent of ${rentAmount} paid to ${propertyOwnerId}`);
        res.status(200).json({success:true ,message:`Rent of ${rentAmount} paid to ${propertyOwnerId}`});
    }
    else {
        console.log(`Property ${propertyId} is mortgaged. No rent is paid.`);
        res.status(200).json({success:true ,message:`Property ${propertyId} is mortgaged. No rent is paid.`});
      }
    }
    else {
        console.log(`Player ${playerId} owns property ${propertyId}. No rent is collected.`);
        res.status(200).json({success:true ,message:`Player ${playerId} owns property ${propertyId}. No rent is collected.`});
      }
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Error paying rent',500));
    }
};

const payTax= async(playerId, taxAmount,next)=>{
    try{
     
        const playerBalance = await TransactionModel.getPlayerBalance(playerId,next);

      if (playerBalance < taxAmount) {
        return next(new Error('Insufficient funds to pay tax',500));
      }

      const updatedBalance = playerBalance - taxAmount;

      await TransactionModel.updatePlayerBalance(playerId, updatedBalance,next);

      console.log(`Tax of ${taxAmount} paid by player ${playerId}`);
    }
    catch(error)
    {
        console.log(error);
        return next(new ErrorHandler('Error paying Tax',500));
    }
}



module.exports={
    getAllTransactions,
    payRent,
    payTax
    
};