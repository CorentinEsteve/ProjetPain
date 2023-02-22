import { Router } from "express";
import { getOrders, postOrders, putOrders, deleteOrders } from "../handlers/order";
import { enrichUser } from "../modules/auth";

const app = Router()

app.get('/order', getOrders)

app.post('/order', postOrders)

app.put('/order/:uuid', putOrders)

app.delete('/order/:uuid', enrichUser, deleteOrders)

export default app