import { useSelector } from 'react-redux'
import { Container, Card } from 'react-bootstrap'
import { useGetUserFilesQuery } from '../slices/pdfApiSlice'
import UploadForm from '../components/UploadForm'
import DisplayUserFiles from '../components/DisplayUserFiles'

const ExtractorScreen = () => {
	const { userInfo } = useSelector((state) => state.auth)
	const { refetch } = useGetUserFilesQuery(userInfo._id)
	return (
		<div className=' py-5'>
			<Container className='d-flex justify-content-center'>
				<Card className='p-5 d-flex flex-column align-items-center hero-card bg-white w-100'>
					<h2 className='text-center mb-4'>
						{userInfo.name} please chose a pdf file to upload
					</h2>
					<p className='text-center mb-4'>
						After uploading the file the text will be extracted and displayed
					</p>
					<UploadForm userId={userInfo._id} refetchFiles={refetch} />
					<DisplayUserFiles userId={userInfo._id} refetchFiles={refetch} />
				</Card>
			</Container>
		</div>
	)
}
export default ExtractorScreen
