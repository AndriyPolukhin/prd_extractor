import express from 'express'
import { getFiles, uploadFile, getFileById, deleteFileById } from '../controllers/fileController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/user/:userId', getFiles)
router.route('/:id').get(getFileById).delete(deleteFileById)
router.post('/upload/:id', uploadFile)

export default router
