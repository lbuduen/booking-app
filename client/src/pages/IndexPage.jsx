import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import topbar from "topbar";

export default function IndexPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['places'], queryFn: async () => {
      const { data } = await axios.get('/api/v1/places')
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 mt-8">
      {data.length > 0 && data.map(place => (
        <Link to={'/place/' + place._id} key={place._id}>
          {place.photos?.[0] && (
            <div className="flex mb-2">
              <img className="rounded-xl aspect-square object-cover" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt={place.description} />
            </div>
          )}
          <p className="font-bold">{place.address}</p>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}