const mysql= require('mysql2');

const connection= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE

})

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });



  // creating properties table
  const createPropertiesTable=`
  CREATE TABLE IF NOT EXISTS Properties (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    owner_id INT,
    rent DECIMAL(10, 2) NOT NULL,
    monopoly_group VARCHAR(50),
    houses_built INT DEFAULT 0,
    hotels_built INT DEFAULT 0
  )
  `;
  // FOREIGN KEY (owner_id) REFERENCES Players(player_id)

  connection.query(createPropertiesTable, (error,results)=>{
    if(error){
        console.error('Error creating Properties table;',error);
    }
    else{
        console.log('Properties Table created or already exists');
    }
  });



const createTransactionTable=`
CREATE TABLE IF NOT EXISTS Transactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  property_id INT NOT NULL,
  transaction_type ENUM('purchase', 'rent', 'build_house', 'build_hotel') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL
);
`;
//FOREIGN KEY (player_id) REFERENCES Players(player_id),
//FOREIGN KEY (property_id) REFERENCES Properties(property_id)

connection.query(createTransactionTable, (error,result)=>{
  if(error)
  {
    console.log('Error creating Transaction Table',error);
  }
  else{
    console.log('Transactions table created or already exists');
  }
});



const createPlayerBalTable=`
CREATE TABLE IF NOT EXISTS PlayerBalances (
  player_id INT PRIMARY KEY,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  FOREIGN KEY (player_id) REFERENCES Players(player_id)
)
`;
connection.query(createPlayerBalTable, (error,result)=>{
  if(error)
  {
    console.log('Error creating PlayerBalances Table',error);
  }
  else
  {
    console.log('PlayerBalances Table created or already exists');
  }
});



const createCardsTable=`
CREATE TABLE IF NOT EXISTS Cards (
  card_id INT AUTO_INCREMENT PRIMARY KEY,
  card_name VARCHAR(255) NOT NULL,
  card_description TEXT NOT NULL,
  card_type ENUM('Chance', 'Community Chest') NOT NULL

)
`;
connection.query(createCardsTable, (error,result)=>{
  if(error)
  {
    console.log('Error creating Cards Table',error);
  }
  else
  {
    console.log('Cards Table created or already exists');
  }
});



const createPlayersTable=`
CREATE TABLE IF NOT EXISTS Players (
  player_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  active BOOLEAN DEFAULT true
)
`;

connection.query(createPlayersTable, (error, results)=>{
  if(error)
  {
    console.log('Error creating Players Table',error);
  }
  else
  {
    console.log('Players Table created or already exists');
  }
})


   module.exports=connection;