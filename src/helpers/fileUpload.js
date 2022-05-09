export const fileUpLoad = async (file) => {
	const cloudUrl = 'https://api.cloudinary.com/v1_1/dpavykafk/upload'
	const formData = new FormData()
	formData.append('file', file)
	formData.append('upload_preset', 'react-journal')

	try {
		const response = await fetch(cloudUrl, {method: 'POST', body: formData})
		if (response.ok) {
			const data = await response.json()
			return data.secure_url
		} else {
			throw await response.json()
		}
	} catch (error) {
		throw error
	}
}
