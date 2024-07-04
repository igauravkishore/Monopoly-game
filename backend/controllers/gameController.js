const ErrorHandler = require('../utils/errorhandler');
const GameModel = require('../models/GameModel');
const playerController= require('./playerController');
const transactionController= require('./transactionsController');
const propertiesController= require('./propertiesController');
const playerModel= require('../models/PlayerModel');
const propertiesModel=require('../models/PropertiesModel');



const boardLayout=[
    { position: 1, name: 'GO' },
    { position: 2, name: 'Park Place', property_id:1},
    { position: 3, name: 'Chance' },
    { position: 4, name: 'Chance'},
    { position: 5, name: 'Jail' },
    { position: 6, name: 'Boardwalk', property_id:2},
    { position: 7, name: 'Community Chest' },
    { position: 8, name: 'Community Chest' },
    { position: 9, name: 'GO' },
    { position: 10, name: 'Marvin Gardens',property_id:3 },
    { position: 11, name: 'Jail' },
    { position: 12, name: 'GO' },
    { position: 13, name: 'Chance' },
    { position: 14, name: 'Baltic Avenue',property_id:4},
    { position: 15, name: 'Community Chest' },
    { position: 16, name: 'GO' },
    { position: 17, name: 'Reading Railroad',property_id:5},
    { position: 18, name: 'Chance' }
];

function rollDie() {
    return Math.floor(Math.random()*6)+1;
}

const rollDiceAndMOve=async(req,res,next)=>{
    const player= req.body;
    console.log(player);
    const die1= rollDie();
    const die2= rollDie();
    const totalRoll= die1 + die2;

    console.log(`Player ${player.name} rolled ${die1} and ${die2}. Total: ${totalRoll}`);

    moveGamePiece(player, totalRoll,res,next);

}


async function moveGamePiece(player, totalRoll,res,next) {
 
    let currentPositionIndex= boardLayout.findIndex(space =>space.name===player.position);
    console.log("currentPositionIndex",currentPositionIndex);
    let newPositionIndex= (currentPositionIndex + totalRoll) % boardLayout.length;
    console.log("newPositionIndex",newPositionIndex);
    player.position= boardLayout[newPositionIndex].name;
    
    console.log("player-position",player.position);

    if (player.position === 'Jail') {
        console.log(`Player ${player} is in Jail.`);
        res.redirect(`/Players/moveToJail?playerId=${player.playerId}`)
    }
    else if(player.position==='Chance'){    
        console.log(`Player ${player} landed on a Chance space.`);
        res.redirect(`/Cards/draw-card?cardType=Chance`);
      
    } else if (player.position === 'Community Chest') {
 
        console.log(`Player ${player} landed on a Community Chest space.`);
        res.redirect(`/Cards/draw-card?cardType=Community Chest`);
       
    } else if (player.position === 'GO') {
        console.log(`Player ${player.playerId} passed GO and earned $200.`);
        res.redirect(`/Players/pass-go?playerId=${player.playerId}`);
       

    } else {
       
        const propertyId=boardLayout[newPositionIndex].property_id;
        console.log("propertyID",propertyId);
        const [property]= await propertiesModel.getPropertyById(propertyId,next);
        console.log(`Player ${player.playerId} landed on a property.`);
        console.log("propertyPrice",property.price);
        if(property.owner_id==null)
        {
            res.redirect(`/Properties/buyProperty/${player.playerId}/${propertyId}`);
        }
        else
        {
            res.redirect(`/Transactions/payRent/${player.playerId}/${propertyId}`);
            // res.redirect(`/Properties/buyProperty/${player.playerId}/${propertyId}`);
        }
       
    }
}



module.exports = {

    rollDiceAndMOve
};
