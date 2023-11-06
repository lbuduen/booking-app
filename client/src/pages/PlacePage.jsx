import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PlacePage() {
  const [place, setPlace] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getPlaceById = async (id) => {
      try {
        const { data } = await axios.get('/api/v1/places/' + id)
        setPlace(data)
      } catch (error) {
        console.error(error);
      }
    }
    getPlaceById(id)
  }, [id])

  return (
    <div className="mt-8">
      
    </div>
  )
}