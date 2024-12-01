import express, { Express } from 'express';
import "dotenv/config";

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from "cors";
import chalk from "chalk"; 
import "dotenv/config" 
import loadInitialRouter from './src/InitialData/InitialDataRouter';
import loadInitialUser from './src/InitialData/InitialDataUser';
import loadInitialBus from './src/InitialData/InitialDataBus';
import router from './src/Routers/Routers';

// import loadInitialData from './src/initailData';

const app: Express = express();

loadInitialRouter().catch(console.error);
loadInitialUser().catch(console.error);
loadInitialBus().catch(console.error);

app.use(cors({
    origin: "0.0.0.0",
    credentials: true  
})); 

app.use(express.json());
app.use(cookieParser());
app.use(router);

// התחברות ל-MongoDB עם לוגים צבעוניים
mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log(chalk.cyanBright("Connected to MongoDB Atlas")); 
  })
  .catch((error) => {
    console.error(chalk.red("Error connecting to MongoDB:", error));  // לוג אדום כשיש שגיאה
  });

app.listen(process.env.PORT || 8000, () => {
    console.log(chalk.blue(`Listening on: http://localhost:${process.env.PORT || 8040}`));  
});
