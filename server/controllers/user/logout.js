// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
		expires: new Date(0),
	})
	res.cookie('jwt_refresh', '', {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
		expires: new Date(0),
	})
	res.status(200).json({ message: 'Logged out successfully' })
}
