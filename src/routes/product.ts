import { Request, RequestHandler, Response, Router } from "express";
import { deleteProduct, getProducts, postProduct, putProduct } from "../handlers/product";
import { enrichUser } from "../modules/auth";

const app = Router()

app.get('/products', getProducts)

app.post('/products', postProduct)

app.delete('/products/:uuid',enrichUser, deleteProduct)

app.put('/products/:uuid', putProduct)

export default app