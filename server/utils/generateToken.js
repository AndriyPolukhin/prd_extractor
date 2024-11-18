import jwt from 'jsonwebtoken'

export const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '2d',
	})

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
		sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict', // Prevent CSRF attacks
		maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
	})

	return token
}

export const generateRefreshToken = (res, userId) => {
	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '4d' })

	res.cookie('jwt_refresh', refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
		maxAge: 4 * 24 * 60 * 60 * 1000,
	})

	return refreshToken
}

export default generateToken
