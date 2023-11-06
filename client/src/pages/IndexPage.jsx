import { useEffect, useState } from "react"
import axios from "axios"

export default function IndexPage() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const { data } = await axios.get('/api/v1/places')
        setPlaces(data)
      } catch (error) {
        console.error(error);
      }
    }
    getAllPlaces()
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 mt-8">
      {places.length > 0 && places.map(place => (
        <div key={place._id}>
          {place.photos?.[0] && (
            <div className="flex mb-2">
              <img className="rounded-xl aspect-square object-cover" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt={place.description} />
            </div>
          )}
          <h2 className="text-sm truncate">{place.title}</h2>
          <p className="font-bold">{place.address}</p>
        </div>
      ))}
    </div>
  )
}