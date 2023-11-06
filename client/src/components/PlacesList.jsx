import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function PlacesList() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const { data } = await axios.get('/api/v1/places/user')
        setPlaces(data)
      } catch (error) {
        console.error(error);
      }
    }
    getAllPlaces()
  }, [])

  return (
    <div className="mt-4">
      {places.length > 0 && places.map(place => (
        <Link to={`/account/places/${place._id}`} key={place._id} className="bg-gray-100 p-4 my-2 rounded-2xl flex gap-4 items-center cursor-pointer">
          <div className="w-32 bg-gray-300 grow shrink-0">
            {place.photos.length > 0 && (
              <img src={`http://localhost:5000/uploads/${place.photos[0]}`} alt="" />
            )}
          </div>
          <div className="grow-0 shrink">
            <h2 className="text-xl">{place.title}</h2>
            <p className="text-sm mt-2">{place.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}