import express, { Request,Response} from "express"
import User, {IUser} from "../Models/UserModel"
import {authMiddleware,authRequest} from "../MiddleWare/authMiddleware"
import { addUser,deleteUser,editUser,getOneUser,getUsers} from "../Services/UserService"

const router = express.Router()

router.post("/register",authMiddleware, async (req:authRequest,res:Response) :Promise<void> => {
    try {
      const { username,email,password,role } = req.body; 
      
      const userData = req.user
      console.log(userData);
      
      if (! username || !email || !password || !role ) {
        res.status(400).json({ message: " אחד מהאלמנטים חסר" });
        return;
     } 
     console.log(5);
     
     const newUser = new User({username,email,password,role }) 
     console.log(newUser);
     
        const user = await addUser(newUser)
        console.log(user);
        
        res.status(200).json(user)
        
    } catch (error:any) {
        error.status || 404, error.message;  
    }
})
router.get("/", async (req:Request,res:Response) : Promise<void> => {
    try {
        
        const allUsers = await getUsers();
        
        console.log(allUsers);
    
        res.json(allUsers);
        console.log(res.json());
        
      } catch (error: any) {
        error.status || 404, error.message;
      }

})

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await getOneUser(req.params.id);
      res.json(user);
    } catch (error: any) {
      error.status || 404, error.message;
    }
  });


  router.delete("/:id",async (req:Request,res:Response) : Promise<void> => {
    try {
        const user = await deleteUser(req.params.id)
        res.json(user)
    } catch (error:any) {
        error.status || 404, error.message;

        
    }
})

 router.put("/:id")

export default router
