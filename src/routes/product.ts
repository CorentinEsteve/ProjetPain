import { Request, RequestHandler, Response, Router } from "express";
import { deleteProduct, getProducts, postProduct, putProduct } from "../handlers/product";
import { enrichUser } from "../modules/auth";

const app = Router()

app.get('/Products', getProducts)

app.post('/Products', postProduct)

app.delete('/Products/:uuid',enrichUser, deleteProduct)

app.put('/Products/:uuid', putProduct)

export default app