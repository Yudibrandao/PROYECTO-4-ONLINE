import { Request, Response } from "express";
import { Tatuador } from "../models/Tatuador";
import { UserRoles } from "../constants/UserRoles";
import { User } from "../models/User";


export const TatuadorController = {
    async getAll(req:Request,res:Response){
        try{
            const page = Number(req.query.page) ||1;
            const limit = Number(req.query.limit) || 10;

            const Tatuadors = await Tatuador.findAndCount(
                {   
                    relations:{
                        user:true
                    },
                    
                    select:{
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        },
                    }
                }
            );
            res.json(Tatuador);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    async create(req:Request,res:Response){
        try{
            const {firstName, email, password, phone,style,area} = req.body;

            if(!firstName || !email || !password || !phone){
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
                role:UserRoles.Tatuador
            });

            await User.save(user);

            const tatuador = Tatuador.create({
                style:style,
                area:area,
                user:user
            });

            await Tatuador.save(Tatuador);

            res.status(201).json({message:"Tatuador created succesfully"});


        }catch(error){}
    },

}