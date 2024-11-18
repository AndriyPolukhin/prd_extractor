import asyncHandler from 'express-async-handler'
import File from '../../models/fileModel.js'
export const getFiles = asyncHandler(async (req, res) => {
	const { userId } = req.params

	try {
		const files = await File.find({ userId }).select('-extractedText')
		if (!files.length) {
			return res.status(204).send('No files found for this user.')
		}

		res.json(files)
	} catch (error) {
		console.error('Error retrieving user files:', error)
		res.status(500).send('Error retrieving user files')
	}
})
