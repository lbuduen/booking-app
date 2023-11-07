import axios from "axios"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import topbar from 'topbar'

export default function PlacePage() {
  const { id } = useParams()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['place', id], queryFn: async () => {
      const { data } = await axios.get('/api/v1/places/' + id)
      return data
    },
  })

  if (isPending) {
    return topbar.show()
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  topbar.hide()

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{data.title}</h1>
      <a href={`https://maps.google.com/?q=${data.address}`} target="_blank" className="block font-semibold underline my-2">{data.address}</a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          {data.photos?.[0] && (
            <img src={`http://localhost:5000/uploads/${data.photos[0]}`} alt="" />
          )}
        </div>
        <div className="grid gap-2">
          {data.photos?.[1] && (
            <img src={`http://localhost:5000/uploads/${data.photos[1]}`} alt="" />
          )}
          {data.photos?.[2] && (
            <img src={`http://localhost:5000/uploads/${data.photos[2]}`} alt="" />
          )}
        </div>
      </div>
    </div>
  )
}