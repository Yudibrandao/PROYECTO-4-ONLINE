import { Request, Response } from "express";
import { User } from "../models/User";
import { Cliente } from "../models/Cliente";
import bcrypt from 'bcrypt';
import { UserRoles } from "../constants/UserRoles";

export const userController = {
    async create(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password, isActive, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                isActive: isActive,
                role: UserRoles[role]
            });
            await user.save();

            if (role == "Cliente") {
                const cliente = Cliente.create({
                    userID: user.id,
                    area: "Cliente"
                });
                await cliente.save();
            }

            res.status(200).json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const { firstName, lastName, email, password, isActive } = req.body;
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password; // No se debe actualizar la contraseña directamente aquí
            user.isActive = isActive;
            await user.save();

            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const users = await User.find({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    isActive: true
                }
            });
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

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
                return res.status(404).json({ message: "User not found" });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve user" });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.remove();
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async getLogedUser(req: Request, res: Response) {
        try {
            const userId = req.tokenData?.userId;
            const user = await User.findOne({
                relations: {
                    role: true
                },
                where: {
                    id: userId
                }
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(user).status(200);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async updateLogedUser(req: Request, res: Response) {
        try {
            const userId = req.tokenData?.userId;
            const { firstName, lastName, email, phone, isActive } = req.body;
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.isActive = isActive;

            await user.save();
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async
}