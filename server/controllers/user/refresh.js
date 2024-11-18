import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import jwt from 'jsonwebtoken'

// @desc    Refresh user access token
// @route   POST /api/users/refresh
// @access  Pprivate
export const refreshUserToken = asyncHandler(async (req, res) => {
	const cookies = req.cookies

	if (!cookies?.jwt_refresh) return res.sendStatus(401)

	const refreshToken = cookies.jwt_refresh

	if (refreshToken) {
		try {
			const user = await User.findOne({ refreshToken })

			if (!user) return res.status(401).json({ message: 'No user found' })

			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

			if (user && user.email === decoded.email) {
				req.user = await User.findById(decoded.userId).select('-password')
				const accessToken = generateToken(res, user._id)

				res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					accessToken: accessToken,
				})
			}
		} catch (error) {
			res.status(403)
			throw new Error('Not authorized, no token')
		}
	}
})
