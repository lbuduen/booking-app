export default function PlaceImg({ place, i = 0, className = null }) {
  if (!place.photos?.length) {
    return ''
  }
  if (className) {
    className = "object-cover"
  }
  return (
    <img src={`http://localhost:5000/uploads/${place.photos[i]}`} className={className} alt="" />
  )
}