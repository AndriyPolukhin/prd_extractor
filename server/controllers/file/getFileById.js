import asyncHandler from 'express-async-handler'
import File from '../../models/fileModel.js'
export const getFileById = asyncHandler(async (req, res) => {
	const pdfFile = await File.findById(req.params.id).exec()
	if (!pdfFile) return res.status(404).json({ message: 'File not found' })

	res.json({
		id: pdfFile._id,
		fileName: pdfFile.fileName,
		extractedText: pdfFile.extractedText,
	})
})
