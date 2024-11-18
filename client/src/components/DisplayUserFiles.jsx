import { useGetUserFilesQuery } from '../slices/pdfApiSlice'
import Accordion from 'react-bootstrap/Accordion'
import FileContent from './FileContent'
import Collapse from 'react-bootstrap/Collapse'
import { useState } from 'react'

const DisplayUserFiles = ({ userId }) => {
	const { data: files, isLoading, error, refetch } = useGetUserFilesQuery(userId)
	const [openFileId, setOpenFileId] = useState(null)

	if (isLoading) return <p>Loading files...</p>
	if (error && files === null) return <p>Error loading files: {error.message}</p>

	const handleToggle = (fileId) => {
		setOpenFileId((prevId) => (prevId === fileId ? null : fileId))
	}

	return (
		<Accordion className=' py-5 w-100'>
			{files ? (
				files.map((file) => (
					<Accordion.Item eventKey={file._id} key={userId + file._id}>
						<Accordion.Header onClick={() => handleToggle(file._id)}>
							{file.fileName.split('.')[0].toUpperCase()}
						</Accordion.Header>
						<Collapse in={openFileId === file._id}>
							<div>
								<Accordion.Body>
									{openFileId === file._id && (
										<FileContent
											fileId={file._id}
											refetchFiles={refetch}
											userId={userId}
										/>
									)}
								</Accordion.Body>
							</div>
						</Collapse>
					</Accordion.Item>
				))
			) : (
				<></>
			)}
		</Accordion>
	)
}

export default DisplayUserFiles
