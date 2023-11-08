import { useState } from "react";
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import topbar from 'topbar'
import axios from "axios"
import { DateTime } from "luxon";
import { QueryError } from "../utils/tools";
import PhotosViewer from "../components/PhotosViewer";
import BookingWidget from "../components/BookingWidget";

export default function PlacePage() {
  const { id } = useParams()
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['place', id], queryFn: async () => {
      const { data } = await axios.get('/api/v1/places/' + id)
      return data
    },
  })

  if (isPending) {
    return topbar.show()
  }

  topbar.hide()

  if (isError) {
    return <QueryError error={error} />
  }

  if (showAllPhotos) {
    return <PhotosViewer data={data} showPhotos={setShowAllPhotos} />
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{data.title}</h1>
      <a href={`https://maps.google.com/?q=${data.address}`} target="_blank" className="flex gap-1 font-semibold underline my-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {data.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {data.photos?.[0] && (
              <div>
                <img className="w-full aspect-square object-cover" src={`http://localhost:5000/uploads/${data.photos[0]}`} alt="" />
              </div>
            )}
          </div>
          <div className="grid">
            {data.photos?.[1] && (
              <img className="aspect-square object-cover" src={`http://localhost:5000/uploads/${data.photos[1]}`} alt="" />
            )}
            <div className="overflow-hidden">
              {data.photos?.[2] && (
                <img className="aspect-square object-cover relative top-2" src={`http://localhost:5000/uploads/${data.photos[2]}`} alt="" />
              )}
            </div>
          </div>
        </div>
        <button type="button" onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="grid my-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-4">
            <h2 className="font-semibold text-xl">Description</h2>
            {data.description}
          </div>
          <p>Check in: {DateTime.fromISO(data.checkIn).toLocaleString(DateTime.DATETIME_MED)}</p>
          <p>Check out: {DateTime.fromISO(data.checkOut).toLocaleString(DateTime.DATETIME_MED)}</p>
          <p>Max number of guests: {data.maxGuests}</p>
        </div>
        <div>
          <BookingWidget data={data} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-xl">Extra info</h2>
          <div className=" mb-4 mt-2 text-sm text-gray-700 leading-5">
            {data.extraInfo}
          </div>
        </div>
      </div>
    </div>
  )
}