import express from 'express'
import * as dotenv from 'dotenv'
import { protect } from './modules/auth'
import { createNewUser, deleteUser, signIn } from './handlers/user'
import userRoutes from './routes/user'
dotenv.config()


const app = express()
const port = 3000

app.use(express.json()) 
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
})

app.use('/api', protect, [userRoutes])
app.post('/signUp', createNewUser)
app.post('/signIn', signIn)
app.post('/deleteUser', protect, deleteUser)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



