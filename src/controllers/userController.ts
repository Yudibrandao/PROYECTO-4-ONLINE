import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { Tatuador } from "../models/Tatuador";
import { Cliente } from "../models/Cliente";
import bcrypt from 'bcrypt';
import { userRoles } from "../constants/UserRoles";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenData } from "../types/types";
// interface UserData {
//     firstName: string,
//     lastName: string,
//     email: string, 
//     password: string,
//     isActive: string;
//     role: number;
// }

export const userController = {
    //REGISTER
    async create(req: Request, res: Response) {
        try {
            let { firstName, lastName, email, password, isActive, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            if (role !== "CLIENTE" || role !== "TATUADOR") {
                role = "CLIENTE"
            }

            const user = User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                isActive: true,
                role: userRoles[role]

            });

            await user.save();

            console.log(user)

            if (role == "CLIENTE") {

                const cliente = Cliente.create({
                    userID: user.id,
                    area: "CLIENTE"
                })
                await cliente.save();
            }

            if (role == "TATUADOR") {
                const tatuador = Tatuador.create({
                    userID: user.id,
                    area: "generic",
                    style: "generic"
                })
                await tatuador.save();
            }

            // await user.save();

            res.status(200).json({ message: "Usuario creado con exito" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    //LOGIN 

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const userLogin = await User.findOne({ where: { email: email }, select: ["id", "firstName", "role_id", "password", "isActive"] });

            if (!userLogin) {
                // Lanza un error con un código de estado HTTP personalizado
                return res.status(500).json({ message: "Usuario no encontrado" });
            }
           
            if (userLogin.isActive === false) {
                // Lanza un error con un código de estado HTTP personalizado
                return res.status(300).json({ message: "Usuario bloqueado" });
            }


            
            const isPasswordValid = await bcrypt.compare(password, userLogin.password);
            if (!isPasswordValid) {
                // Lanza un error con un código de estado HTTP personalizado
                return res.status(500).json({ message: "Usuario o contraseña erronea" });

            }

            // Payload
            const tokenPayload: TokenData = {
                userId: userLogin.id,
                firstName: userLogin.firstName,
                userRole: String(userLogin.role_id),
            };

            const token = jwt.sign(
                tokenPayload,
                process.env.JWT_SECRET as string,
                { expiresIn: "24h" }
            );

            res.status(200).json({ message: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal " });
        }
    },


    //EDIT PROFILE
    async update(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const { firstName, lastName, email, password, isActive } = req.body;
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;
            user.isActive = isActive;
            await user.save();
            res.status(200).json({ message: "Usuario actualizado con exito" });
        } catch (error) {
            res.status(500).json({ message: "Algo salio mal" });
        }
    },


    //solo para administrador 
    //Obtener el perfil de los usuarios 
    async getAll(req: Request, res: Response) {
        try {

            const users = await User.findAndCount(

                {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        isActive: true,

                    }
                }
            );
            console.log(users)
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    // Obtener el perfil del usuario por Id
    async getProfileById(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);

            const user = await User.findOne({
                relations: {
                    role: true,
                },
                where: { id: userId },
            });


            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.json(user);
        } catch (error) {

            res.status(500).json({
                message: "Failed to retrieve user",
            });
        }
    },

    //borrar perfil 
    async deleteByToken(req: Request, res: Response) {

        try {
            //take the id from the request
            const tokenUser = (req.tokenData);

            //find the user by id
            const user = await User.findOne({ where: { id: tokenUser.userId } });

            console.log(user)
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            user.isActive = false
           
            //remove the user
             await user.save();
            //return a 200 status
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            //if something goes wrong, return a 500 status
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async delete(req: Request, res: Response) {
       
        try {
            //take the id from the request
            const userId = Number(req.params.id);
            //find the user by id
            const user = await User.findOne({ where: { id: userId } });
            //if the user is not found, return a 404 status
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            //remove the user
            await user.remove();
            //return a 200 status
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            //if something goes wrong, return a 500 status
            res.status(500).json({ message: "Something went wrong" });
        }
    },


    async getLogedUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { userId, firstName, userRole } = req.tokenData;


            const userLogin = await User.findOne({ where: { id: userId }, select: ["id", "firstName", "lastName", "role_id", "password", "email"] });

            if (!userLogin) {
                // Lanza un error con un código de estado HTTP personalizado
                return res.status(500).json({ message: "Usuario no encontrado" });
            }

            res.status(200).json({ message: userLogin });

        } catch (error) {
            res.status(500).json({ message: "Something went wrong11" });
        }
    },

    async updateLogedUser(req: Request, res: Response) {
        try {
            const userId = req.tokenData?.userId;
            const { firstName, lastName, email, isActive, role } = req.body;
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.isActive = isActive;
            user.role_id = role;

            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async editUserRole(req: Request, res: Response) {
        try {
            //take the user id from the request
            const userId = Number(req.params.id);

            //take the role id from the request
            const roleId = Number(req.body.roleId);

            //find the user by id
            const userToChange = await User.findOne(
                {
                    relations: {
                        role: true
                    },
                    select: {
                        id: true,
                        firstName: true,
                        role: {
                            id: true,
                        }
                    },
                    where: {
                        id: userId
                    }
                })
            //if the user is not found, return a 404 status
            if (!userToChange) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            //change the role of the user
            userToChange.role.id = roleId;

            //save the user in DB
            await User.save(userToChange);

            //return a 200 status
            res.status(200).json({ message: "Role updated successfully" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }, 

    async updateUserAdmin(req: Request, res: Response) {
        try {
            const tokenUser = req.tokenData;
    
            if (!tokenUser || tokenUser.userRole !== "1") {
                return res.status(403).json({ message: "Sin permiso del Administrador" });
            }
            
            const userId = Number(req.params.id);
            const { firstName, lastName, email, password, isActive, role, day_date, description, price, Tatuador, Cliente } = req.body;
            
            // Actualizar los campos del usuario
            let user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;
            user.isActive = isActive;
            user.role = userRoles[role];
    
            await user.save();
    
        
    
            res.status(200).json({ message: "Usuario actualizado exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salió mal" });
        }
    }
    

}