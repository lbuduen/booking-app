import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify"
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { useAsyncValue, useNavigate } from "react-router-dom";
import * as Yup from "yup"

export default function BookingWidget({ data }) {
  const { data: user } = useAsyncValue()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (bookingData) => {
      return axios.post('/api/v1/bookings', bookingData)
    },
    onSuccess: res => {
      toast.success("Your booking has been saved, we'll be waiting for you!")
      navigate("/account/bookings/" + res.data._id)
    }
  })

  const formik = useFormik({
    initialValues: {
      checkIn: '',
      checkOut: '',
      guests: 1,
      name: user.name,
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      checkIn: Yup.date().required(),
      checkOut: Yup.date().required(),
      guests: Yup.number().max(data.maxGuests),
    }),
    onSubmit: async (values) => {
      mutation.mutate({ ...values, place: data._id, price: getNumberOfNights() * data.price })
    }
  })

  const getNumberOfNights = () => {
    if (!formik.values.checkIn || !formik.values.checkOut)
      return

    const checkOutDate = DateTime.fromISO(formik.values.checkOut);
    const checkInDate = DateTime.fromISO(formik.values.checkIn);
    const diffDays = checkOutDate.diff(checkInDate, 'days')

    return diffDays.toObject().days
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
        Price: ${data.price} / per night
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-1 my-3">
          <div>
            <label htmlFor="checkIn">Check in:</label>
            <input type="datetime-local" id="checkIn" {...formik.getFieldProps("checkIn")} />
          </div>
          <div>
            <label htmlFor="checkOut">Check out:</label>
            <input type="datetime-local" id="checkOut" {...formik.getFieldProps("checkOut")} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="guests">Number of guests:</label>
          <input type="number" max={data.maxGuests} id="guests" {...formik.getFieldProps("guests")} />
        </div>

        {getNumberOfNights() > 0 && (
          <>
            <div className="mb-3">
              <label htmlFor="name">Your full name:</label>
              <input type="text" id="name" placeholder="John Doe" {...formik.getFieldProps("name")} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone number:</label>
              <input type="tel" id="phone" placeholder="+15052145" {...formik.getFieldProps("phone")} />
            </div>
          </>
        )}

        <button type="submit" className="primary">
          Book this place {getNumberOfNights() > 0 && `$${data.price * getNumberOfNights()}`}
        </button>
      </form>
    </div>
  )
}