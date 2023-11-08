export default function PhotosViewer({data, showPhotos}) {
  return (
    <div className="absolute inset-0 bg-black text-white min-h-screen">
      <div className="p-8 grid gap-4 bg-black">
        <div>
          <h2 className="text-3xl mr-48">Photos of {data.title} </h2>
          <button onClick={() => showPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
            Close photos
          </button>
        </div>
        {
          data?.photos?.length > 0 && data.photos.map(photo => (
            <div key={photo}>
              <img src={`http://localhost:5000/uploads/${photo}`} alt="" />
            </div>
          ))
        }
      </div>
    </div>
  )
}