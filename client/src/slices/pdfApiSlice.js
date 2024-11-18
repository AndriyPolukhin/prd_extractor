import { apiSlice } from './apiSlice'
const PDF_URL = '/api/files'

export const pdfApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		uploadPdf: builder.mutation({
			query: ({ userId, file }) => {
				const formData = new FormData()
				formData.append('file', file)
				return {
					url: `${PDF_URL}/upload/${userId}`,
					method: 'POST',
					body: formData,
				}
			},
		}),
		getUserFiles: builder.query({
			query: (userId) => ({
				url: `${PDF_URL}/user/${userId}`,
				method: 'GET',
			}),
		}),
		getPdfContent: builder.query({
			query: (id) => ({
				url: `${PDF_URL}/${id}`,
				method: 'GET',
			}),
		}),
		deletePdf: builder.mutation({
			query: (id) => ({
				url: `${PDF_URL}/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useUploadPdfMutation,
	useGetUserFilesQuery,
	useGetPdfContentQuery,
	useDeletePdfMutation,
} = pdfApiSlice
