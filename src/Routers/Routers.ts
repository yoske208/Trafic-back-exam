import express, { IRouter, NextFunction, Request, Response }  from 'express'
import authController from "../../src/Controllers/AuthController"
import busController from "../Controllers/BusController"
import userController from "../Controllers/BusController"
import routerController from "../Controllers/BusController"
import { handleError } from '../Utils/HendaleError';
import { verifyAdmin, verifyUser } from '../../Helpers/jwt';

const router:IRouter = express.Router()

router.use("/routers",routerController)
router.use("/users",userController)
router.use("/buses",busController)
router.use("/auth",authController );

router.use((req:Request,res:Response)=>{
handleError(res,404,"Miki is not found at Nimrodi Tower")
})


export default router