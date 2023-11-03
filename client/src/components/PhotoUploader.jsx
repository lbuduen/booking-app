import { useRef } from "react"
import axios from 'axios'

export default function PhotoUploader({photos, setPhotos: onChangePhotos}) {
  const photoLinkRef = useRef(null)

  const uploadPhotoLink = async () => {
    const url = photoLinkRef.current.value
    if (url) {
      try {
        const res = await axios.post('/api/v1/place/upload-photo-link', { photoLink: url })
        onChangePhotos(prev => [...prev, res.data.filename])
        photoLinkRef.current.value = ''
      } catch (error) {
        console.error(error)
      }
    }
  }

  const uploadPhotoFiles = async (evt) => {
    const files = evt.target.files
    const data = new FormData()
    for (const file of files) {
      data.append('photos', file)
    }
    try {
      const res = await axios.post("/api/v1/upload/photos", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      onChangePhotos(prev => [...prev, ...res.data.filenames])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <input type="text" ref={photoLinkRef} placeholder="Add using a link" />
        <button type="button" onClick={uploadPhotoLink} className="bg-gray-200 px-4 rounded-2xl w-32">Add photo</button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {
          photos && photos.map((photo, i) => (
            <div key={i}>
              <img className='rounded-2xl' src={`http://localhost:5000/uploads/${photo}`} alt="" />
            </div>
          ))
        }
        <label className="flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-6 text-2xl text-gray-600">
          <input type="file" multiple onChange={uploadPhotoFiles} className='hidden' />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
        </label>
      </div>
    </>
  )
}