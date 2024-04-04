import { Request, Response } from "express";
import { Cita } from "../models/Cita";
import { Tatuador } from "../models/Tatuador";
import { Cliente } from "../models/Cliente";

export const CitaController = {

    //Get all Citas
    async getAll(req: Request, res: Response) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const [Citas, totalCitas] = await Cita.findAndCount({
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                },
            });

            res.json(Citas);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    //Get Cita by ID
    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({
                relations: {
                    tatuador: { user: true },
                    cliente: { user: true }
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    tatuador: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    },
                    cliente: {
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

            if (!cita) {
                return res.status(404).json({ message: "Cita not found" });
            }

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    // Create Cita
    async create(req: Request, res: Response) {
        try {
            const { day_date, description, price, Tatuador, Cliente } = req.body;
            const cita = await Cita.create({
                day_date: day_date,
                description: description,
                price: price,
                TatuadorID: Tatuador,
                ClienteID: Cliente
            }).save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    // Update Cita
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { day_date, description, price, Tatuador, Cliente } = req.body;
            let cita = await Cita.findOne({ where: { id: id } });

            if (!cita) {
                return res.status(404).json({ message: "Cita not found" });
            }

            cita.day_date = day_date;
            cita.description = description;
            cita.price = price;
            cita.TatuadorID = Tatuador;
            cita.ClienteID = Cliente;
            await cita.save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    // Delete Cita
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({ where: { id: id } });

            if (!cita) {
                return res.status(404).json({ message: "Cita not found" });
            }

            await cita.remove();
            res.json({ message: "Cita deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    // Get all Citas by Cliente
    async getByLogedCliente(req: Request, res: Response) {
        try {
            const logedCliente = await Cliente.findOne({
                select: { id: true },
                where: { userID: req.tokenData!.userId }
            });

            const citas = await Cita.find({
                relations: {
                    tatuador: { user: true },
                    cliente: { user: true }
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    tatuador: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                         
                        }
                    },
                    cliente: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                          
                        }
                    }
                },
                where: { ClienteID: logedCliente?.id }
            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },


 // Get all Citas by Loged Tatuador
    async getByLogedTatuador(req: Request, res: Response) {
        try {
            const tatuador = await Tatuador.findOne({
                select: { id: true },
                where: { userID: req.tokenData!.userId }
            });

            const citas = await Cita.find({
                relations: {
                    tatuador: { user: true },
                    cliente: { user: true }
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    tatuador: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                            
                        }
                    },
                    cliente: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                            
                        }
                    }
                },
                where: { TatuadorID: tatuador?.id }
            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

}


