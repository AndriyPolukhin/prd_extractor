import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import generateToken from '../../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		return res.status(404).json({ message: 'provide name, email and password' })
	}

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(409).json({ message: 'User already exists. Conflict' })
		throw new Error('User already exists')
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	if (user) {
		generateToken(res, user._id)

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})
