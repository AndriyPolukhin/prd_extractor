import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import { generateToken, generateRefreshToken } from '../../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ message: 'email and password are required' })
	}

	const user = await User.findOne({ email })

	if (!user) return res.status(401).json({ message: 'invalid credentials' }) // unathorized

	const match = await user.matchPassword(password)
	if (user && match) {
		generateToken(res, user._id)
		const refreshToken = generateRefreshToken(res, user._id)
		user.refreshToken = refreshToken
		await user.save()

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
		})
	} else {
		res.status(401).json({ message: 'username or password are invalid' })
		throw new Error('Invalid email or password')
	}
})

export default authUser
