import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { userRoles } from '../constants/UserRoles';
import { Role } from '../models/Role';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenData } from '../types/types';


export const authController = {
    async register(req:Request, res:Response): Promise<void> {
        try {
            //get values from request body
            const { firstName, email, password } = req.body;
            
            //check if values are provided
           if(!firstName || !email || !password){
              res.status(400).json({ 
                 message: "No se pudo crear el usuario",         
            });
              return;
           }
           
             //hash the password         
           const hashedPassword = bcrypt.hashSync(password, 10);
           
  
           //Create the user with the values provided
           const userToCreate = User.create({
              firstName: firstName,
              email: email,
              password : hashedPassword,
              role: userRoles.CLIENTE,
           });
  
           //save the user in DB
           await User.save(userToCreate);

           res.status(201).json({ message: "Usuario creado con exito" });
  
        } catch (error) {
            //if something goes wrong, return a 500 status
            
           res.status(500).json({
            
              message: "No se pudo crear el usuario",
            
           });
           
        }
     },
  

}