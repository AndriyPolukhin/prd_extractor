import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import File from '../../models/fileModel.js'

// @desc    Delete user profile and associated files
// @route   DELETE /api/users/profile
// @access  Private
export const deleteUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		// Delete all of the user files
		await File.deleteMany({ userId: req.user._id })

		// Delet the user
		await user.deleteOne(user._id)

		res.cookie('jwt', '', {
			httpOnly: true,
			expires: new Date(0),
		})
		res.cookie('jwt_refresh', '', {
			httpOnly: true,
			expires: new Date(0),
		})

		res.json({
			_id: user._id,
			message: `${user.name} profile and associated files deleted successfully`,
		})
	} else {
		res.status(404).json({ message: 'User  not found' })
	}
})
