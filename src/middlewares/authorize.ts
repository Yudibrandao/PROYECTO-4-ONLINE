import { Request, Response, NextFunction } from 'express';
import { userRoles } from '../constants/UserRoles';



export const authorizeMiddleware = (allowedRoles: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = Number(req.tokenData.userRole);

        if (userRole === userRoles.ADMIN.id) {
            return next();
        }

        if (allowedRoles.includes(userRoles.TATUADOR.name)) {
            return  next();
        } else if (allowedRoles.includes(userRoles.CLIENTE.name)) {
            return next();
        } else {
            res.status(401).json({ message: "Unauthorized" })
        }
    }
}