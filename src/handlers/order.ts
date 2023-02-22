import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import db from "../db";

export const getOrders: RequestHandler = async (req, res) => {
    try {
        const order = await db.order.findMany({
            include: {
                products: true,
                Customization: true,
                user: {
                    select: {
                    username: true,
                    email: true,
                    deliveryAddress: true,
                },
            },
        },
    });
        res.status(200).json({ order });
    } catch (err) {
        console.log("error: " + err);
        res.status(400).json({ message: "error getting orders" });
    }
};


export const postOrders: RequestHandler = async (req, res) => {
    try{
        validationResult(req).throw()
        const order = await db.order.create({
            data: {
                userId: req.user.id,
                products: req.body.products,
                deliveryDate: req.body.deliveryDate,
            }
        })
        res.status(201).json({ order })
    }
    catch(err){
        console.log("erreur : " + err)
        res.status(400).json({ message:"error creation product" })
    }
}

export const putOrders: RequestHandler = async (req, res) => {
    try {
        validationResult(req).throw()
        const order = await db.order.update({
            where: {
                id: req.params.uuid,
            },
            data: {
                products: req.body.products,
                deliveryDate: req.body.deliveryDate,
                status: req.body.status,
            }
        })
        res.status(201).json({ message: "Order updated", order })
    }
    catch (err) {
        console.log("error: " + err)
        res.status(400).json({ message: "error updating order" })
    }
}

export const deleteOrders: RequestHandler = async (req, res) => {
    try {
        const order = await db.order.delete({
            where: {
                id: req.params.uuid,
            },
        })
        res.status(200).json({ message: "Order successfully deleted", order })
    }

    catch (err) {
        res.status(400).json({ message: "error deleting order" })
    }
}
