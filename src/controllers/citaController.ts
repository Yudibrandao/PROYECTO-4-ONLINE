import { Request,Response } from "express";
import { User } from "../models/User";
import { Cita } from "../models/Cita";
import { Tatuador } from "../models/Tatuador";
import { cliente } from "../models/Cliente";
import { Role } from "../models/Role";
import bcrypt from 'bcrypt';
import { UserRoles } from "../constants/UserRoles";
import { Console } from "console";

export const citaController = {

    //Get all Appointments
    async getAll(req:Request,res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const [cita,totalCitas] = await Cita.findAndCount(
                {
                    select:{
                        id:true,
                        day_date:true,
                        description:true,
                        price:true,
                    },
                }
            );
            
            res.json(citas);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Get Appointment by ID
    async getById(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const Citas = await Cita.findOne({
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
            res.json(cita);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Create Appointment
    async create(req:Request,res:Response){
        try {
            const {day_date,description,price,artist,client} = req.body;
            const appointment = Citas.create({
                day_date:day_date,
                description: description,
                price:price,
                artistID:artist,
                clientID:client
            });

            await cita.save();
            res.json(appointment);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
            
        }
    },

    //Update Appointment
    async update(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const {day_date,description,price,artist,client} = req.body;
            const appointment = await Appointment.findOne({where:{id:id}});
                
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }
            appointment.day_date = day_date;
            appointment.description = description;
            appointment.price = price;
            appointment.artistID = artist;
            appointment.clientID = client;
            await appointment.save();
            res.json(appointment);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Delete Appointment
    async delete(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const appointment = await Appointment.findOne({where:{id:id}});
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }
            await appointment.remove();
            res.json({message:"Appointment deleted"});
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Get all Appointments by Client
    
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

        console.log(req.tokenData);
    const appointments = await Appointment.find({
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

        res.json(appointments);

    },

    //Get all Appointments by Loged Artist
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
    
        const appointments = await Appointment.find({
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
            res.json(appointments).status(200);
    
        }

}