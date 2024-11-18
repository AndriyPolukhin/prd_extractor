import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useGetPdfContentQuery, useDeletePdfMutation } from '../slices/pdfApiSlice'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'

const FileContent = ({ fileId, refetchFiles }) => {
	const { data, isLoading, error } = useGetPdfContentQuery(fileId)
	const [deletePdf] = useDeletePdfMutation()
	const [_, setRating] = useState(null)

	if (isLoading) return <Spinner animation='border' />
	if (error) return <p>Error loading content: {error.message}</p>

	const paragraphs = data.extractedText
		.split(/(?<=\.\s|\.\t)|(?=^:|^●|^\d+\.)/gm)
		.filter((para) => para.trim() !== '')

	const handleDelete = async () => {
		try {
			await deletePdf(fileId).unwrap()
			toast.success('File deleted successfully')
			refetchFiles()
		} catch (err) {
			toast.error('Failed to delete the file')
		}
	}

	const handleCopyContent = () => {
		const contentToCopy = paragraphs.join('\n')
		navigator.clipboard
			.writeText(contentToCopy)
			.then(() => toast.success('Content copied to clipboard'))
			.catch(() => toast.error('Failed to copy content'))
	}

	const handleRateFile = (newRating) => {
		setRating(newRating)
		toast.success(`File text extraction is rated ${newRating} stars`)
	}
	return (
		<div>
			<div className='d-flex justify-content-between align-items-center'>
				<h5>{data.fileName}</h5>
				<div>
					<Button
						variant='secondary'
						size='sm'
						onClick={handleCopyContent}
						className='mx-1'
					>
						Copy Content
					</Button>
					<Button
						variant='primary'
						size='sm'
						onClick={() => handleRateFile(5)}
						className='mx-1'
					>
						Rate ★★★★★
					</Button>
					<Button variant='danger' size='sm' onClick={handleDelete} className='mx-1'>
						Delete
					</Button>
				</div>
			</div>
			{paragraphs.map((paragraph, index) => (
				<p key={fileId + index}>{paragraph.trim()}.</p>
			))}
		</div>
	)
}

export default FileContent
