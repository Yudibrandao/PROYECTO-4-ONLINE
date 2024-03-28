import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Split the token from the header    n
    const token = req.headers.authorization?.split(" ")[1];

    // If there is no token, return a 401 status
    if (!token) {
        res.status(401).json({ message: "No Autorizado" });
        return;
    }

    try {
        // Verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        // Add the token data to the request    
        req.tokenData = {
            userId: decoded.userId,
            userRole: decoded.userRole,
        }

        // Call the next middleware
        next();

    } catch (error) {
        res.status(401).json({ message: "No Autorizado" });
        return;
    }
}
