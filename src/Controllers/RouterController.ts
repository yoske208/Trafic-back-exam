import express, { Request,Response} from "express"
import {authMiddleware,authRequest} from "../MiddleWare/authMiddleware"
import Router, {IRoutes} from "../Models/RoutesModel" 
import { addRouter,deleteRouter,editRouter,getOneRouter,getRouter} from "../Services/RoutersService"

const router = express.Router()

router.post("/", authMiddleware,async (req:authRequest,res:Response) :Promise<void> => {
    try {
      const { lineNumber, name,stations,schedule } = req.body; 
      
      const router = req.user
      console.log(router);
      
      if (! lineNumber || !name || !stations || !schedule) {
        res.status(400).json({ message: " אחד מהאלמנטים חסר" });
        return;
     } 
     console.log(5);
     
     const newRouter = new Router({lineNumber, name,stations,schedule:[]}) 
     console.log(newRouter);
     
        const routerAdd = await addRouter(newRouter)
        console.log(routerAdd);
        
        res.status(200).json(routerAdd)
        
    } catch (error:any) {
        error.status || 404, error.message;  
    }
})
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(1);
      
      const allRouter = await getRouter();
      
      console.log(allRouter);
  
      res.json(allRouter);
      console.log(res.json());
      
    } catch (error: any) {
      error.status || 404, error.message;
    }
  });
  router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const router = await getOneRouter(req.params.id);
      res.json(router);
    } catch (error: any) {
      error.status || 404, error.message;
    }
  });
  router.delete("/:id",async (req:Request,res:Response) : Promise<void> => {
    try {
        const puzzele = await deleteRouter(req.params.id)
        res.json(puzzele)
    } catch (error:any) {
        error.status || 404, error.message;

        
    }
})
router.put("")

export default router
