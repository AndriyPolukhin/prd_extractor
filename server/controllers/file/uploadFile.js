import asyncHandler from 'express-async-handler'
import File from '../../models/fileModel.js'
import path from 'node:path'
import fs from 'node:fs'
import pdfParseNew from 'pdf-parse-new'

export const uploadFile = asyncHandler(async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: 'User id is not provided' })
	}
	if (!req.files || !req.files.file) {
		return res.status(400).json({ message: 'No file uploaded yet' })
	}

	const uploadedFile = req.files.file
	const filePath = path.join('server', 'uploads', uploadedFile.name)

	// Save the file to the server
	await uploadedFile.mv(filePath)

	try {
		// Use pdf-parse for text extraction
		const pdfBuffer = fs.readFileSync(filePath)
		const pdfData = await pdfParseNew(pdfBuffer)
		const extractedText = pdfData.text

		// console.log(extractedText)
		const pdfDocument = new File({
			userId: req.params.id,
			fileName: uploadedFile.name,
			extractedText: extractedText,
		})

		await pdfDocument.save()
		// Delete the uploaded file from local storage
		fs.unlinkSync(filePath)
		res.json({ status: 'success', fileId: pdfDocument._id })
	} catch (error) {
		console.error('Error processing PDF:', error)
		res.status(500).send('Error processing PDF')
	}
})
