import mongoose from 'mongoose'
const fileSchema = new mongoose.Schema({
	fileName: String,
	uploadedAt: { type: Date, default: Date.now },
	extractedText: String,
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const File = mongoose.model('PdfFile', fileSchema)

export default File
