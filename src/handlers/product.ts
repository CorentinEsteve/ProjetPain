import { RequestHandler } from 'express'
import db from '../db'
import { body, check, validationResult } from "express-validator";
import { comparePassword } from '../modules/auth';

export const getProducts: RequestHandler = async (req, res) => {
    const products = await db.product.findMany({
        include: {
            Order: true,
            Menu: true,
            SpecialDiet: true,
        },
    })
    res.status(200).json({ products })
}

export const postProduct: RequestHandler = async (req, res) => {
    try{
        validationResult(req).throw()
        const products = await db.product.create({
            data: {
                name : req.body.name,
                image : req.body.image,
                category : req.body.category,
                description: req.body.description,
                price: req.body.price,
            }
        })
        res.status(201).json({ products })
    }
    catch(err){
        console.log("erreur : " + err)
        res.status(400).json({ message:"error creation product" })
    }
}

export const deleteProduct: RequestHandler = async (req, res) => {
    try{
        if (req.user.role == "ADMIN") {
            const product = await db.product.delete({
                where: {
                    id: req.params.uuid,
                }
            })
            res.status(200).json({ message: "product deleted", product })
        }
        else {
            return res.status(403).json({ message: "You are not allowed to delete this product" });
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({ message:"error delete product" })
    }
}

export const putProduct: RequestHandler = async (req, res) => {
    if (req.user.role == "ADMIN") {
        try{
            const product = await db.product.update({
                where: {
                    id: req.params.uuid,
                },
                data: {
                    name : req.body.name,
                    image : req.body.image,
                    category : req.body.category,
                    description: req.body.description,
                    price: req.body.price,
                }
            })
            res.status(200).json({ product })
            console.log(product)
        }
        catch(err){
            res.status(400).json({ message:"error update product" })
        }
    }
    else{
        console.log(req.user.role)
        res.status(401).json({ message: "You are not allowed to update this product" });
    }
}