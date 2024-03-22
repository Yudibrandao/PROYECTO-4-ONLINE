import { Request, Response } from "express";
import { Tatuadores } from "../models/Tatuador";
import { UserRoles } from "../constants/UserRoles";
import { User } from "../models/User";


export const TatuadorController = {
    async getAll(req:Request,res:Response){
        try{
            const page = Number(req.query.page) ||1;
            const limit = Number(req.query.limit) || 10;

            const artists = await Tatuadores.findAndCount(
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
            res.json(Tatuadores);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    async create(req:Request,res:Response){
        try{
            const {firstName, email, password, phone,style,area} = req.body;

            if(!firstName || !email || !password || !phone){
                res.status(400).json({message:"Failed to create artist"});
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
                phone:phone,
                role:UserRoles.ARTIST
            });

            await User.save(user);

            const artist = Tatuador.create({
                style:style,
                area:area,
                user:user
            });

            await Tatuadores.save(artist);

            res.status(201).json({message:"Artist created succesfully"});


        }catch(error){}
    },

}