import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../constants/UserRoles';

export const authorizeMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Verificar si req.tokenData está definido y tiene la propiedad userRole
        if (!req.tokenData || !req.tokenData.userRole) {
            return res.status(401).json({ message: "Unauthorized: Missing token data" });
        }

        const userRole = req.tokenData.userRole;

        if (userRole === UserRoles.ADMIN.name) {
            // Si el rol del usuario es ADMIN, permitir el acceso
            return next();
        }

        if (allowedRoles.includes(userRole)) {
            // Si el rol del usuario está en los roles permitidos, permitir el acceso
            return next();
        }

        // Si el rol del usuario no está permitido, devolver un error de autorización
        return res.status(401).json({ message: "Unauthorized: Insufficient permissions" });
    }
}
