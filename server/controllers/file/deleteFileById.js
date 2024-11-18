import asyncHandler from 'express-async-handler'
import File from '../../models/fileModel.js'

export const deleteFileById = asyncHandler(async (req, res) => {
	const pdfFile = await File.findById(req.params.id).exec()
	if (!pdfFile) return res.status(404).json({ message: 'File not found' })

	const result = await File.deleteOne(pdfFile._id)

	res.status(200).json({
		deletedCount: result.deletedCount,
	})
})
