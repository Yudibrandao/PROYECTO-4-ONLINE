import { Request, Response } from "express";
import { Tatuador } from "../models/Tatuador";
import { userRoles } from "../constants/UserRoles";
import { User } from "../models/User";


export const tatuadorController = {
    async getAll(req:Request,res:Response){
        try{
        
            const tatuadors = await Tatuador.findAndCount(
                {   
                    relations:{
                        user:true
                    },
                    
                    select:{
                        user:{
                            firstName:true,
                            email:true,
                            
                        },
                    }
                }
            );
            res.json(tatuadors);

        }catch(error){
            res.status(500).json({message:"Algo salio mal"});
        }
    },

    async create(req:Request,res:Response){
        try{
            const {firstName, email, password,style,area} = req.body;

            if(!firstName || !email || !password ){
                res.status(400).json({message:"No se pudo crear el tatuador"});
                return;
            }

            const userExists = await User.findOne({where:{email:email}});

            if(userExists){
                res.status(400).json({message:"Email no valido"});
                return;
            }

            const user = User.create({
                firstName:firstName,
                email:email,
                password:password,
                role:userRoles.TATUADOR
            });

            await User.save(user);

            const tatuador = Tatuador.create({
                style:style,
                area:area,
                user:user
            });

            await Tatuador.save(tatuador);

            res.status(201).json({message:"Tatuador creado con exito"});


        }catch(error){}
    },

}