import { Request, Response } from "express";
import { User } from "../models/User";
import { Cita } from "../models/Cita";
import { Tatuador } from "../models/Tatuador"; // Corregir aquí
import { Cliente } from "../models/Cliente";
import { Role } from "../models/Role";
import bcrypt from 'bcrypt';
import { UserRoles } from "../constants/UserRoles";
import { Console } from "console";

export const CitaController = {

    //Get all Citas
    async getAll(req: Request, res: Response) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const [Citas, totalCitas] = await Cita.findAndCount(
                {
                    select: {
                        id: true,
                        day_date: true,
                        description: true,
                        price: true,
                    },
                }
            );

            res.json(Citas);

        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    //Get Cita by ID
    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({
                relations: {
                    Tatuador: {
                        user: true
                    },
                    Cliente: {
                        user: true
                    },
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    Tatuador: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    },
                    Cliente: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    }
                },
                where: {
                    id: id
                }
            });
            if (!Cita) {
                res.status(404).json({ message: "Cita not found" });
                return;
            }

            console.log(Cita);

            res.json(Cita);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },


    //Create Cita
    async create(req: Request, res: Response) {
        try {
            const { day_date, description, price, Tatuador, Cliente } = req.body;
            const nuevaCita = Cita.create({
                day_date: day_date,
                description: description,
                price: price,
                TatuadorID: Tatuador,
                ClienteID: Cliente
            });

            await nuevaCita.save();
            res.json(nuevaCita);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });

        }
    },

    //Update Cita
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { day_date, description, price, Tatuador, Cliente } = req.body;
            const cita = await Cita.findOne({ where: { id: id } });

            if (!Cita) {
                res.status(404).json({ message: "Cita not found" });
                return;
            }
            Cita.day_date = day_date;
            Cita.description = description;
            Cita.price = price;
            Cita.TatuadorID = Tatuador;
            Cita.ClienteID = Cliente;
            await Cita.save();
            res.json(Cita);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    //Delete Cita
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({ where: { id: id } });
            if (!Cita) {
                res.status(404).json({ message: "Cita not found" });
                return;
            }
            await Cita.remove();
            res.json({ message: "Cita deleted" });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    //Get all Citas by Loged Cliente

    async getByLogedCliente(req: Request, res: Response) {

        const reqToken = req.tokenData.userId;

        const logedCliente = await Cliente.findOne({
            select: {
                id: true
            },
            where: {
                userID: req.tokenData!.userId
            }
        });

        console.log(req.tokenData.userId),
        
    },

}
