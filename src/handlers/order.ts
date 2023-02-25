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
      const products = req.body.products.map((product: any) => {
        return {
            id: product.id,
            quantity: product.quantity,
            product: { connect: { id: product.id } }
        }
    });
    const order = await db.order.create({
        data: {
            userId: req.user.id,
            products: {
                create: products,
            },
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
      validationResult(req).throw();
      const { products, status } = req.body;
      const orderId = req.params.uuid;

      // Update the order status
      const updatedOrder = await db.order.update({
          where: { id: orderId },
          data: { status },
          include: {
              products: true,
          },
      });

      // Update the order products
      if (products) {
          const { addProducts = [], removeProducts = [] } = products;
          const updatedProducts = await Promise.all(
              addProducts.map(async (product: { id: any, quantity: any }) => {
                  return await db.product.update({
                      where: { id: orderId },
                      data: { 
                          orderId,
                          quantity: product.quantity,
                      },
                      include: {
                          Order: true,
                      },
                  });
              })
          );
          const removedProducts = await Promise.all(
              removeProducts.map(async (product: { id: any; }) => {
                  return await db.product.update({
                      where: { id: product.id },
                      data: { orderId: null },
                      include: {
                          Order: true,
                      },
                  });
              })
          );
          res.status(200).json({
              message: "Order updated",
              order: { ...updatedOrder, products: [...updatedProducts, ...removedProducts] },
          });
      } else {
          res.status(200).json({ message: "Order updated", order: updatedOrder });
      }
  } catch (err) {
      console.log("error: " + err);
      res.status(400).json({ message: "error updating order" });
  }
};

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
