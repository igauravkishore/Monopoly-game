const app=require("./app");
const connection=require("./db/connection");
const PopertiesRoutes=require('./routes/PropertiesRoutes');
const TransactionsRoutes=require('./routes/TransactionsRoutes');
const CardsRoutes=require('./routes/CardsRoutes');
const PlayerRoutes= require('./routes/PlayerRoutes');
const GameRoutes=require('./routes/GameRoutes');
const errorHandlerMiddleware = require('./middleware/error'); 


app.get("/",(req,res)=>{
    res.send('hello dear');
});

app.use('/Properties', PopertiesRoutes);
app.use('/Transactions', TransactionsRoutes);
app.use('/Cards',CardsRoutes);
app.use('/Players',PlayerRoutes);
app.use('/game',GameRoutes);

app.use(errorHandlerMiddleware);

const port=3008;
app.listen(port,()=>{console.log(`server is running on port ${port}`)});