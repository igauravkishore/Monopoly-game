const PropertiesModel=require('../models/PropertiesModel');
const ErrorHandler=require('../utils/errorhandler');
const TransactionModel=require('../models/TransactionsModel');

const getAllProperties= async (req,res,next)=>{
    try{
        console.log("hello getAllpropertiesController");
        const properties= await PropertiesModel.getAllProperties(next);

        res.json({success : true , properties});
    }
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler('Error getting All properties',500));
    }
};

const getPropertyById= async(req,res,next)=>{
    const propertyId= req.params.id;
    try{
       const [property]= await PropertiesModel.getPropertyById(propertyId,next);
    
       console.log(property);
       res.json({success: true, property});
    }
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler('error getting propertyById',500));
    }
};

const handleProperty= async(playerId, property, next)=>{
    try {
        // const playerId = req.body.playerId;
        // const property = req.body.property;
        
        if (property.isOwned()) {
          await transactionController.payRent(playerId, property);
        } else {
          await transactionController.buyProperty(playerId, property);
        }
        
        res.status(200).json({ success: true, message: 'Property handled successfully' });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Error handling property', 500));
      }
}

const buyPropery = async(req,res,next)=>{
  try {
  
    const playerId=req.params.playerId;
    const propertyId=req.params.propertyId;
    const [property]= await PropertiesModel.getPropertyById(propertyId,next);
    console.log(property);


    const playerBalance = await TransactionModel.getPlayerBalance(playerId,next);

    console.log("playerBalance",playerBalance);
    console.log("propertyPrice",property.price);
    if (parseInt(playerBalance) < parseInt(property.price)) {
      return next(new ErrorHandler('Insufficient funds to buy property', 500));
    }

    const updatedBalance = playerBalance - property.price;

    await TransactionModel.updatePlayerBalance(playerId, updatedBalance,next);

    await PropertiesModel.updatePropertyOwner(property.property_id, playerId,next);

    console.log(`Property ${property.name} bought successfully by Player ${playerId}`);
    res.status(200).json({ success: true, message: `Property ${property.name} bought successfully by Player ${playerId}` });
   
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Error buying property', 500));
  }
}


const hasMonopoly= async(playerId,monopolyGroup,req,res,next)=>{
  try{
      //  const {playerId}= req.body;
      //  const {monopolyGroup}=req.body;

       const properties= await PropertiesModel.getPropertiesByMonopolyGroup(monopolyGroup,next);

       let monopoly=true;

       for(const property of properties)
       {
        if (property.owner_id !== playerId) {
          monopoly=false;
          break;
      }
       }
      if(monopoly)
      {
        return { success: true, message: 'Player has monopoly' };

      }
      else{
        return { success: false, message: 'Player does not have monopoly' };
      }
      
  }
  catch(error)
  {
      console.log("Error checking monopoly",error);
      return next(new ErrorHandler('Error checking monopoly', 500));
  }
}

const calculateRent=async(req,res,next)=>{
  const {playerId}=req.body;
  const {propertyId}=req.body;
  console.log(`propertyId:${propertyId}`);

  try{

    const property= await PropertiesModel.getPropertyById(propertyId,next);
    console.log(property);
    let {rent,monopoly_group}= property[0];
    console.log(`rent:${rent} and monopoly_group:${monopoly_group}`);
   
      const hasMonopolyResponse = await hasMonopoly(playerId, monopoly_group,next);
      if (hasMonopolyResponse.success && hasMonopolyResponse.message === 'Player has monopoly') {
      
        rent *= 2;
      }

      res.status(200).json({success:true ,rent});
  }
  catch(error)
  {
    console.error("Error calculating Rent:",error);
    return next(new ErrorHandler('Error calculating Rent',500));
  }

}

const updatePropertyOwnership=async(req, res,next)=>{
  const {playerId}=req.body;
  const {propertyId}=req.body;
  try{
    await PropertiesModel.updatePropertyOwner(propertyId,playerId,next);
    res.status(200).json({success:true, message:"PropertyOwner updated successfully"});
  }
  catch(error)
  {
    console.error("Error updating property ownership",error);
    return next(new ErrorHandler('Error updating Property ownership',500));
  }
}

const buildHouses=async(req,res,next)=>{
  const {playerId}= req.body;
  const {propertyId}=req.body;
  const {numHouses}=req.body;
  try{
  
     const propertyy = await PropertiesModel.getPropertyById(propertyId,next);
     const property=propertyy[0];
     if (property.owner_id !== playerId) {
        
        return next(new ErrorHandler('You do not own this property',500));
     }

    if (property.houses_built === 4) {
      return next(new ErrorHandler('You need to build a hotel instead of more houses',500));
  }

     const monopolyGroup = property.monopoly_group;
     const HasMonopoly = await hasMonopoly(playerId, monopolyGroup,next);
     if (!HasMonopoly) {
         return next(new ErrorHandler('You need to have a monopoly to build houses',500));
     }

     if (property.houses_built + numHouses > 4) {
         return next(new ErrorHandler('You can only build up to four houses on each propertyy',500));
     }
     
          const buildingCost = property.houseCost * numHouses;
     const playerBalance = await TransactionModel.getPlayerBalance(playerId,next);

     await TransactionModel.updatePlayerBalance(playerId,playerBalance-buildingCost,next);

     await PropertiesModel.updatePropertyHouses(propertyId, property.houses_built + numHouses,next);

     res.status(200).json({success:true, message:"Houses built successfully"});
  }
  catch(error)
  {
    console.error("Error in building houses",error);
    return next(new ErrorHandler('Error in building houses',500));
  }
}

const buildHotel= async(req,res,next)=>{
  const {playerId}=req.body;
  const {propertyId}=req.body;
  try {
    const propertyy = await PropertiesModel.getPropertyById(propertyId,next);
    const property=propertyy[0];
   
    if (property.owner_id !== playerId) {
      return next(new ErrorHandler('You do not own this property',500));
    }

   const monopolyGroup = property.monopoly_group;
   const HasMonopoly = await hasMonopoly(playerId, monopolyGroup,next);
   if (!HasMonopoly) {
       return next(new ErrorHandler('You need to have a monopoly to build houses',500));
   }

    if (property.houses_built !== 4) {
        return next(new ErrorHandler('You need to build four houses first before building a hotel',500));
    }

    const hotelCost = 200; // Sample cost, you can adjust this as needed
    const playerBalance = await TransactionModel.getPlayerBalance(playerId,next);

    await TransactionModel.updatePlayerBalance(playerId, playerBalance-hotelCost,next);

    property.houses_built = 0;
    property.hotels_built++;

    await PropertiesModel.updateProperty(property);

    res.status(200).json({success:true, message:"Hotel built successfully"});
} catch (error) {
  console.error("Error in building hotels",error);
  return next(new ErrorHandler('Error in building hotels',500));
}
}

const mortgageProperty=async(req,res,next)=>{
  const propertyId = req.params.propertyId;
  try{
    await PropertiesModel.mortgageProperty(propertyId,next);
    res.status(200).json({ success: true, message: 'Property mortgaged successfully' });
  }
  catch(error)
  {
    console.error('Error mortgaging property:', error);
    return next(new ErrorHandler('Error mortgaging property', 500));
  }
}
const unmortgagedProperty=async(req,res,next)=>{
  const propertyId=req.params.propertyId;
  try {
    await PropertiesModel.unmortgagedProperty(propertyId,next);
    res.status(200).json({ success: true, message: 'Property unmortgaged successfully' });
} catch (error) {
    console.error('Error unmortgaging property:', error);
    return next(new ErrorHandler('Error unmortgaging property', 500));
}
}



module.exports={
    getAllProperties,
    getPropertyById,
    handleProperty,
    buyPropery,
    hasMonopoly,
    calculateRent,
    updatePropertyOwnership,
    buildHouses,
    buildHotel,
    mortgageProperty,
    unmortgagedProperty
};

