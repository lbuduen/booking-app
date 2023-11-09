import { useState } from "react";
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import topbar from 'topbar'
import axios from "axios"
import { DateTime } from "luxon";
import { QueryError } from "../utils/tools";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

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

  topbar.hide()

  if (isError) {
    return <QueryError error={error} />
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{data.title}</h1>

      <AddressLink address={data.address} />

      <PlaceGallery data={data} />

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