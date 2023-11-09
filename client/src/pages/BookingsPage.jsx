import { useParams } from "react-router-dom"
import BookingsList from "../components/BookingList"
import BookingPage from "./BookingPage"


export default function BookingsPage() {
  const { action: bookingId } = useParams()

  if (bookingId) {
    return <BookingPage />
  }

  return <BookingsList />
}