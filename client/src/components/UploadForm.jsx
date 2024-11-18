import React, { useState } from 'react'
import { useUploadPdfMutation } from '../slices/pdfApiSlice'
import { Button, Form, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import FormContainer from './FormContainer'

const UploadForm = ({ userId, refetchFiles }) => {
	const [file, setFile] = useState(null)
	const [uploadPdf, { isLoading }] = useUploadPdfMutation()

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleUpload = async () => {
		if (!file) {
			toast.error('Please select a file to upload')
			return
		}

		try {
			// const response = await uploadPdf(formData).unwrap()
			const response = await uploadPdf({ userId, file }).unwrap()
			toast.success('File uploaded successfully')

			refetchFiles(userId)
			setFile(null)
			// Handle response as needed, such as navigating to the display page
		} catch (error) {
			toast.error('Failed to upload file')
		}
	}

	return (
		<FormContainer>
			<Form>
				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Label>Upload PDF</Form.Label>
					<Form.Control
						type='file'
						accept='application/pdf'
						onChange={handleFileChange}
						placeholder='Name of the file to be uploaded'
					/>
				</Form.Group>
				<Button onClick={handleUpload} disabled={isLoading}>
					{isLoading ? <Spinner animation='border' size='sm' /> : 'Upload'}
				</Button>
			</Form>
		</FormContainer>
	)
}

export default UploadForm
