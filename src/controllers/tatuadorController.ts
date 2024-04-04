import { Request, Response } from "express";
import { Tatuador } from "../models/Tatuador";
import { UserRoles } from "../constants/UserRoles";
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
            res.status(500).json({message:"Something went wrong"});
        }
    },

    async create(req:Request,res:Response){
        try{
            const {firstName, email, password,style,area} = req.body;

            if(!firstName || !email || !password ){
                res.status(400).json({message:"Failed to create Tatuador"});
                return;
            }

            const userExists = await User.findOne({where:{email:email}});

            if(userExists){
                res.status(400).json({message:"Email already in use"});
                return;
            }

            const user = User.create({
                firstName:firstName,
                email:email,
                password:password,
                role:UserRoles.TATUADOR
            });

            await User.save(user);

            const tatuador = Tatuador.create({
                style:style,
                area:area,
                user:user
            });

            await Tatuador.save(tatuador);

            res.status(201).json({message:"Tatuador created succesfully"});


        }catch(error){}
    },

}