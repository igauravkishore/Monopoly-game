const db=require('../db/connection');
const ErrorHandler=require('../utils/errorhandler');

const getAllProperties = async(next)=>{
    try {
        const [rows, fields] = await db.promise().query('SELECT * FROM Properties');
        return rows;
    }  
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler('error in getting properties from db',500));
    }
};

const getPropertyById= async(propertyId,next)=>{
    try{
        const query= 'SELECT * FROM properties WHERE property_id = ?';
        const property=await db.promise().query(query,[propertyId]);
        return property[0];
    }
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler('Error in getting propertyById from db',500));
    }
};

const getPropertyByOwnerId= async(ownerId,next)=>{
    try{
        const query= 'SELECT * FROM properties WHERE owner_id = ?';
        const property=await db.promise().query(query,[ownerId]);
        return property[0];
    }
    catch(error)
    {
        console.error(error);
        return next(new ErrorHandler('Error in getting propertyById from db',500));
    }
};

const updatePropertyOwner= async(propertyId, newOwnerId,next)=>
{
    try {
       
        const query = 'UPDATE Properties SET owner_id = ? WHERE property_id = ?';
        const [result] = await db.promise().query(query, [newOwnerId, propertyId]);
  
       
        if (result.affectedRows === 0) {
          return next(new ErrorHandler(`Failed to update property owner for property with ID ${propertyId}`));
        }
  
        console.log(`Property with ID ${propertyId} updated with new owner ${newOwnerId}`);
      } catch (error) {
        console.error(error);
         return next(new ErrorHandler(`Error updating property owner`));
      }
}

const getPropertiesByMonopolyGroup=async(monopolyGroup,next)=>{
    try{
          const query= 'SELECT * FROM properties WHERE monopoly_group = ?';
          const [properties]= await db.promise().query(query,[monopolyGroup]);
          return properties;
    }
    catch(error)
    {
         console.log('Error fetching properties by monopoly group:', error);
         return next(new ErrorHandler(`Error updating property owner`,500));

    }
}

const updatePropertyHouses=async(propertyId, newHousesBuilt,next)=>{
    try{
        const query = 'UPDATE properties SET houses_built = ? WHERE property_id = ?';
      const [result] = await db.promise().query(query, [newHousesBuilt, propertyId]);
      return result;
    }
    catch(error)
    {
        console.log('Error updating houses_built in propertiesModel:', error);
         return next(new ErrorHandler(`Error updating houses_built in propertiesModel`,500));
    }
}

const updateProperty=async(property,next)=>{
    try {
        const query = 'UPDATE properties SET owner_id = ?, houses_built = ?, hotels_built = ? WHERE property_id = ?';
        const { owner_id, houses_built, hotels_built, property_id } = property;
        const [result] = await db.promise().query(query, [ owner_id, houses_built, hotels_built, property_id ]);
        return result;
    } catch (error) {
        console.log('Error updating hotels_built in propertiesModel:', error);
        return next(new ErrorHandler(`Error updating hotels_built in propertiesModel`,500));
    }
}

const mortgageProperty=async(propertyId,next)=>{
    try {
        const query = 'UPDATE Properties SET mortgaged = true WHERE property_id = ?';
        await db.promise().execute(query, [propertyId]);
    } catch (error) {
        console.log('error in mortgaged property', error);
        return next(new ErrorHandler(`error in mortgaged property`,500));
    }
}
const  unmortgagedProperty=async(propertyId,next)=>{
    try {
        const query = 'UPDATE Properties SET mortgaged = false WHERE property_id = ?';
        await db.promise().execute(query, [propertyId]);
    } catch (error) {
        console.log('error in unmortgaged property', error);
        return next(new ErrorHandler(`error in unmortgaged property`,500));
    }
}



module.exports={
    getAllProperties,
    getPropertyById,
    updatePropertyOwner,
    getPropertiesByMonopolyGroup,
    updatePropertyHouses,
    updateProperty,
    getPropertyByOwnerId,
    mortgageProperty,
    unmortgagedProperty
};