import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../constants/UserRoles';


export const authorizeMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.tokenData?.userRole; // Asegúrate de que req.tokenData esté definido
        if (!userRole) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        console.log("userRole", userRole);

        if (userRole === UserRoles.ADMIN.name || allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    };
};
