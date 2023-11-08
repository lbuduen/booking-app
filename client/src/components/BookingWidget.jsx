export default function BookingWidget({ data }) {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
        Price: ${data.price} / per night
      </div>
      <div className="flex gap-1 my-4">
        <div>
          <label htmlFor="checkIn">Check in:</label>
          <input type="datetime-local" name="checkIn" id="checkIn" />
        </div>
        <div>
          <label htmlFor="checkOut">Check out:</label>
          <input type="datetime-local" name="checkOut" id="checkOut" />
        </div>
      </div>
      <div>
        <label htmlFor="guests">Number of guests:</label>
        <input type="number" max={data.maxGuests} id="guests" />
      </div>
      <button className="primary mt-4">Book this place</button>
    </div>
  )
}