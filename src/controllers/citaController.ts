import { Request, Response } from "express";
import { Cita } from "../models/Cita";
import { Tatuador } from "../models/Tatuador";
import { Cliente } from "../models/Cliente";
import { Admin } from "typeorm";
import { Role } from "../models/Role";
import { userRoles } from "../constants/UserRoles";
import { User } from "../models/User";

export const citaController = {

    //Get all Citas
    async getAll(req: Request, res: Response) {
        try {

            const [citas, totalCitas] = await Cita.findAndCount({
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                },
            });

            res.json(citas);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
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
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    // Create Cita
    async create(req: Request, res: Response) {
        try {
            //take the id from the request
            const tokenUser = (req.tokenData);
            console.log(tokenUser.userRole);
            const { day_date, description, price, Tatuador, Cliente } = req.body;

            if (tokenUser.userRole == "3") {

                const cita = await Cita.create({
                    day_date: day_date,
                    description: description,
                    price: price,
                    tatuadorID: Tatuador,
                    clienteID: tokenUser.userId
                });
                await cita.save();
                res.json(cita);
            }
            if (tokenUser.userRole == "2") {

                const cita = await Cita.create({
                    day_date: day_date,
                    description: description,
                    price: price,
                    tatuadorID: tokenUser.userId,
                    clienteID: Cliente
                });
                await cita.save();
                res.json(cita);
            }
            if (tokenUser.userRole == "1") {

                const cita = await Cita.create({
                    day_date: day_date,
                    description: description,
                    price: price,
                    tatuadorID: Tatuador,
                    clienteID: Cliente
                });
                await cita.save();
                res.json(cita);
            }

        } catch (error) {
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    // Update Cita
    async updateCitasAdmin(req: Request, res: Response) {
        try {
            const tokenUser = (req.tokenData);

            if (tokenUser.userRole != "1") {
                return res.status(404).json({ message: "Sin permisos" });
            }
            const id = Number(req.params.id);
            const { day_date, description, price, Tatuador, Cliente, isActive } = req.body;
            let cita = await Cita.findOne({ where: { id: id } });
            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            cita.day_date = day_date;
            cita.description = description;
            cita.price = price;
            cita.tatuadorID = Tatuador;
            cita.clienteID = Cliente;
            cita.isActive = isActive

            await cita.save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    //editar citas cliente
    async updateCitasCliente(req: Request, res: Response) {
        try {
            const tokenUser = (req.tokenData);

            if (tokenUser.userRole != "3") {
                return res.status(404).json({ message: "Sin permisos" });
            }
            const id = Number(req.params.id);
            const { day_date, description, price, Tatuador, Cliente, isActive } = req.body;
            let cita = await Cita.findOne({ where: { id: id, clienteID: tokenUser.userId } });
            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            cita.day_date = day_date;
            cita.description = description;
            cita.price = price;
            cita.tatuadorID = Tatuador;
            cita.clienteID = Cliente;
            cita.isActive = isActive

            await cita.save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },


    //editar citas tatuador
    async updateCitasTatuador(req: Request, res: Response) {
        try {
            const tokenUser = (req.tokenData);

            if (tokenUser.userRole != "2") {
                return res.status(404).json({ message: "Sin permisos" });
            }
            const id = Number(req.params.id);
            const { day_date, description, price, Tatuador, Cliente, isActive } = req.body;
            let cita = await Cita.findOne({ where: { id: id, tatuadorID: tokenUser.userId } });
            if (!cita) {
                return res.status(404).json({ message: "Cita not found" });
            }

            cita.day_date = day_date;
            cita.description = description;
            cita.price = price;
            cita.tatuadorID = Tatuador;
            cita.clienteID = Cliente;
            cita.isActive = isActive

            await cita.save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },
    


    // Delete Cita
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({ where: { id: id } });

            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            await cita.remove();
            res.json({ message: "Cita borrada" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    // Get all Citas by Cliente
    async getByLogedCliente(req: Request, res: Response) {
        try {


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
                where: { clienteID: req.tokenData!.userId }
            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },


    // Get all Citas by Loged Tatuador
    async getByLogedTatuador(req: Request, res: Response) {
        try {


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
                where: { tatuadorID: req.tokenData!.userId }
            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },


    //Lista citas Admin
    async getByLogedAdmin(req: Request, res: Response) {
        try {


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

            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

}


