import { Request,Response } from "express";
import { User } from "../models/User";
import { Cita } from "../models/Cita";
import { Artist } from "../models/Artist";
import { Client } from "../models/Client";
import { Role } from "../models/Role";
import bcrypt from 'bcrypt';
import { UserRoles } from "../constants/UserRoles";
import { Console } from "console";

export const CitaController = {

    //Get all Citas
    async getAll(req:Request,res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const [Citas,totalCitas] = await Cita.findAndCount(
                {
                    select:{
                        id:true,
                        day_date:true,
                        description:true,
                        price:true,
                    },
                }
            );
            
            res.json(Citas);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Get Cita by ID
    async getById(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({
                where:{id:id},
                select:{
                    id:true,
                    day_date:true,
                    description:true,
                    price:true,
                    artistID:true,
                    clientID:true
                    
                    }
                    
                }
                
            );
            res.json(Cita);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Create Cita
    async create(req:Request,res:Response){
        try {
            const {day_date,description,price,artist,client} = req.body;
            const Cita = Cita.create({
                day_date:day_date,
                description: description,
                price:price,
                artistID:artist,
                clientID:client
            });

            await Cita.save();
            res.json(Cita);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
            
        }
    },

    //Update Cita
    async update(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const {day_date,description,price,artist,client} = req.body;
            const Cita = await Cita.findOne({where:{id:id}});
                
            if(!Cita){
                res.status(404).json({message:"Cita not found"});
                return;
            }
            Cita.day_date = day_date;
            Cita.description = description;
            Cita.price = price;
            Cita.artistID = artist;
            Cita.clientID = client;
            await Cita.save();
            res.json(Cita);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Delete Cita
    async delete(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const Cita = await Cita.findOne({where:{id:id}});
            if(!Cita){
                res.status(404).json({message:"Cita not found"});
                return;
            }
            await Cita.remove();
            res.json({message:"Cita deleted"});
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Get all Citas by Client
    
    async getByLogedClient(req:Request,res:Response){

    const reqToken = req.tokenData.userId;
    console.log(reqToken); 

    const logedClient = await Client.findOne({
        select:{
            id:true
        },
        where:{
            userID:req.tokenData!.userId
        }});

        console.log("CLIENT", logedClient);
    const Citas = await Cita.find({
        relations:{
            artist:{
                user:true
            },
            client:{
                user:true
            },
        },
        select:{
            id:true,
            day_date:true,
            description:true,
            price:true,
            artist:{
                    id:true,
                    user:{
                        firstName:true,
                        email:true,
                        phone:true,
                    }                                
            },
            client:{
                id:true,
                user:{
                    firstName:true,
                    email:true,
                    phone:true,                
                }
            
            
            }
        },
        where:{
            clientID:logedClient!.id
        }});

        res.json(Citas);

    },

    //Get all Citas by Loged Artist
    async getByLogedArtist(req:Request,res:Response){
        const artist = await Artist.findOne({
            select:{
                id:true
            },
            where:{
                userID:req.tokenData?.userId
            }});
            console.log(req.tokenData);
            console.log(artist);
    
        const Citas = await Cita.find({
            relations:{
                artist:true,
                client:true,
            },
            select:{
                id:true,
                day_date:true,
                description:true,
                price:true,
                artist:{
                        id:true,
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        }                                  
                },
                client:{
                    id:true, 
                    user:{
                        firstName:true,
                        email:true,
                        phone:true,
                    }               
                }
                },
                where:{
                    artistID:artist?.id
                }
                
            });
            res.json(Citas).status(200);
    
        }

}