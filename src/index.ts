import express from 'express'
import * as dotenv from 'dotenv'
import { protect } from './modules/auth'
import productRoutes from './routes/product'
import orderRoutes from './routes/order'
import { createNewUser, deleteUser, signIn } from './handlers/user'
import userRoutes from './routes/user'
import cors from 'cors';
dotenv.config()

const app = express()
const port = 3001

app.use(express.json()) 
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
})

app.use(cors({
    origin: `http://localhost:3000`,
}));

app.use('/api', protect, [productRoutes, orderRoutes, userRoutes])
app.post('/signUp', createNewUser)
app.post('/signIn', signIn)
app.post('/deleteUser', protect, deleteUser)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



