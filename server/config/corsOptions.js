import allowedOrigins from './allowedOrigins.js'
export const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true)
		} else {
			callback(new Error('not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
}

export default corsOptions
