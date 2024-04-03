import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../constants/UserRoles';



export const authorizeMiddleware=(allowedRoles:string[])=>{

    return (req:Request,res:Response,next:NextFunction)=>{
        const userRole = req.tokenData.userRole;
        console.log("userRole",userRole)
        if(userRole === UserRoles.ADMIN.name){
            return next();
        }

        if(allowedRoles.includes(userRole)){
            next();
        }else{
            res.status(401).json({message:"Unauthorized"})
        }
    }
}