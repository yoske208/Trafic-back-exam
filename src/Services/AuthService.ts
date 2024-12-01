import bcrypt from "bcrypt";

import { Response ,Request } from "express";
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User, { IUser } from "../Models/UserModel";

export interface authRequest extends Request{
  user?: mongoose.Types.ObjectId
}
interface JwtPayload {
  _id: string; // מזהה המשתמש
}

interface TokenPayload {
  id: string;
  isAdmin: boolean;
}



interface userDTO {
  userName: string;
  password: string;
}

const TOKEN_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';


const registerUser = async ({
  userName,
  password,
}: userDTO): Promise<IUser | null> => {
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      throw new Error("Username already exists");
    }
    const newUser = new User({
      userName,
      password,
    });

    await newUser.save();

    return newUser;
  } catch (error: any) {
    throw new Error(error?.message || "error from register");
  }
};


const loginUser = async (username: string, password: string) => {
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) throw new Error("User not found");
    const isPasswordCorrect = await bcrypt.compare(password ,foundUser.password);

    if (!isPasswordCorrect) throw new Error("Incorrect password or email");

    return foundUser;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

const verifyUserRefresh = async (req: Request, res: Response) => {
  // Check if cookies exist
  if (!req.headers.cookie) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Access denied. No cookies found.' 
    });
    
  }
  console.log(req.headers.cookie);

  // Get token from cookies
   const token = req.cookies['auth_token'];
   console.log(token);
   
   
   // Check if token exists
   if (!token) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    // Try to verify the token
    const decoded = jwt.verify(token, TOKEN_SECRET, {
      algorithms: ['HS256']
    }) as TokenPayload;

    // Add decoded user to request
    (req as any).user = decoded;

    const userId = decoded._id
    const foundUser = await User.findById(userId)
    return foundUser
     


  } catch (error) {
    console.error('Token verification error:', error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Token expired. Please log in again.' 
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid or malformed token.' 
      });
    }

    return res.status(500).json({ 
      status: 'error', 
      message: 'Internal error during authentication.' 
    });
  }
};

const logoutUser = (res: Response): void => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, loginUser, logoutUser,verifyUserRefresh };
