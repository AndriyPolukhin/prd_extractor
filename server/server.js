import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import helmet from 'helmet'
const app = express()
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import corsOptions from './config/corsOptions.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { credentials } from './middleware/credentials.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import fileRoutes from './routes/fileRoutes.js'

const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(cookieParser())
app.use(fileUpload())

app.use('/api/users', userRoutes)
app.use('/api/files', fileRoutes)

if (process.env.NODE_ENV === 'production') {
	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)
	console.log(__dirname)
	app.use(express.static(path.join(__dirname, '../client/dist')))
	app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')))
	// const __dirname = path.resolve()

	// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
	// app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'dist', 'assets')))
	// app.get('*', (req, res) =>
	// 	res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html')),
	// )
} else {
	app.get('/', (req, res) => {
		res.send('API is running')
	})
}

app.use(notFound)
app.use(errorHandler)

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})
process.on('uncaughtException', (err) => {
	console.error(`There was an uncaught error: ${err}`)
	process.exit(1)
})
