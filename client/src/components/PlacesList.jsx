import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import axios from "axios"
import topbar from "topbar"
import { QueryError } from "../utils/tools"
import PlaceImg from "./PlaceImg"

export default function PlacesList() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['places', 'user'], queryFn: async () => {
      const { data } = await axios.get('/api/v1/places/user')
      return data
    }
  })

  if (isPending) {
    return topbar.show()
  }

  topbar.hide()

  if (isError) {
    return <QueryError error={error} />
  }

  return (
    <div className="mt-4">
      {data.length > 0 && data.map(place => (
        <Link to={`/account/places/${place._id}`} key={place._id} className="bg-gray-100 p-4 my-2 rounded-2xl flex gap-4 items-center cursor-pointer">
          <div className="w-1/3 bg-gray-300">
            <PlaceImg place={place} i={0} />
          </div>
          <div className="w-2/3">
            <h2 className="text-xl">{place.title}</h2>
            <p className="text-sm mt-2">{place.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}