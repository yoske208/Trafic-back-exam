import express, { Request, Response, NextFunction } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUserRefresh,
} from "../Services/AuthService";
import { generateAuthToken,verifyAdmin } from "../../Helpers/jwt";
import { authMiddleware } from "../MiddleWare/authMiddleware";

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const userMan = await loginUser(username, password);

    //V
    if (userMan) {
      const token = generateAuthToken(userMan._id as any);
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
      });
      res.json({ userMan, token });
    }
  } catch (error: any) {
    console.error(error.message);
  }
});

router.post("/refresh", async (req: Request, res: Response): Promise<void> => {
  try {
    const foundUser = await verifyUserRefresh(req, res);
    console.log((foundUser));
    
    await res.json(foundUser);
  } catch (error: any) {
    console.error(error.message);
    console.log(11);
    
  }
});

router.get("/logout", (req: Request, res: Response): void => {
  try {
    logoutUser(res);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.error(error.message);
  }
});
router.post("/register", async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  try {
    const user = await registerUser({ userName, password });
    if (user) {
      res.status(201).json({
        message: "user is sinup",
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("sinup field");
  }
});
router.get("/test", authMiddleware);

export default router;
