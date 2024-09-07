import express from 'express'
import dotenv from 'dotenv'
import sequelize from './db.js'
import Finance from './models/Finance.js'
import bankRoutes from './routes/Finance.routes.js'
import emiRoute from './routes/Finance.routes.js'
import emiDetails from './routes/Finance.routes.js'


const app = express()
dotenv.config()
app.use(express.json())

app.use('/api', bankRoutes)
app.use('/api', emiRoute)
app.use('/api', emiDetails)

app.get('/', (req, res)=>{
    res.send("Hello")
})

const port = process.env.PORT

const startServer = async ()=>{
   try{
        await sequelize.authenticate()
        console.log('Connected to DB')

        await Finance.sync()

        app.listen(port, ()=>{
            console.log('Running on PORT', port)
        })
   }
   catch(err){
     console.log('Umable to connect to db', err)
   }
}

startServer()