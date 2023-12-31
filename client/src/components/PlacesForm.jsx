import { useState } from "react"
import { useFormik, FormikProvider } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";
import * as Yup from 'yup';
import axios from 'axios';
import topbar from "topbar";
import { toast } from "react-toastify";

import Perk from './Perk'
import PhotoUploader from './PhotoUploader';
import { QueryError } from "../utils/tools";

const initialData = {
  title: '',
  address: '',
  description: '',
  extraInfo: '',
  checkIn: '',
  checkOut: '',
  maxGuests: 1,
  perks: [],
  price: 100,
}

export default function PlacesForm() {
  const { action: id } = useParams()
  const navigate = useNavigate()
  const [photos, setPhotos] = useState([])

  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['place', id], queryFn: async () => {
      if (id !== 'new') {
        const { data } = await axios.get('/api/v1/places/' + id)
        data['checkIn'] = DateTime.fromISO(data['checkIn']).toFormat("yyyy-LL-dd'T'hh:mm");
        data['checkOut'] = DateTime.fromISO(data['checkOut']).toFormat("yyyy-LL-dd'T'hh:mm");
        setPhotos(data.photos)
        return data
      }
      return false
    },
  })

  const mutation = useMutation({
    mutationFn: (data) => {
      const method = data?._id ? 'put' : 'post'
      const url = data?._id ? '/api/v1/places/' + data._id : '/api/v1/places'
      return axios({
        method, url, data
      });
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['places', 'user'] })
      if (id !== 'new') {
        queryClient.setQueryData(['place', id], data)
      }
      toast.success(`${data.title} data has been saved successfully`)
      navigate('/account/places')
    },
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: query.data || initialData,
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      mutation.mutate({ ...values, photos })
    }
  })

  const inputLabel = (text, inputId = null) => (
    <label htmlFor={inputId} className="inline-block text-xl mt-4">{text}</label>
  )

  const inputDescription = (text) => (
    <p className="text-gray-500 text-xs">{text}</p>
  )

  const inputHeader = (labelText, descText, inputId = null) => (
    <>
      {inputLabel(labelText, inputId)}
      {inputDescription(descText)}
    </>
  )

  if (query.isPending || mutation.isPending) {
    topbar.show()
  } else {
    topbar.hide()
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {(query.isError || mutation.isError) && <QueryError error={query.error || mutation.error} />}

      {inputHeader('Title', 'Title for your place, should be short and catchy as in advertisement', "title")}
      <input type="text" id="title" placeholder="My lovely apartament" {...formik.getFieldProps("title")} />

      {inputHeader('Address', 'Address for this place', "address")}
      <input type="text" id="address" placeholder="address" {...formik.getFieldProps("address")} />

      {inputHeader('Photos', 'more = better')}
      <PhotoUploader photos={photos} onChangePhotos={setPhotos} />

      {inputHeader('Description', 'Description of this place', "description")}
      <textarea id="description" rows={4} {...formik.getFieldProps("description")} />

      {inputHeader('Price per night', 'Price of this place per night', "price")}
      <input type="number" id="price" {...formik.getFieldProps("price")} />

      {inputHeader('Perks', "Select all the perks of your place")}
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <FormikProvider value={formik}>
          <Perk value="wifi">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
            <span>WiFi</span>
          </Perk>
          <Perk value="parking">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span>Free parking spot</span>
          </Perk>
          <Perk value="tv">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span>TV</span>
          </Perk>
          <Perk value="pets">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
            <span>Pets</span>
          </Perk>
          <Perk value="entrance">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Private entrance</span>
          </Perk>
        </FormikProvider>
      </div>

      {inputHeader('Extra info', 'House rules, etc', "extraInfo")}
      <textarea id="extraInfo" {...formik.getFieldProps("extraInfo")} />

      {inputHeader('Check in & out times', 'Add the check in and out times, remember to have some window for cleaning between guests')}
      <div className="grid sm:grid-cols-3 mt-2 gap-2">
        <div>
          <label htmlFor="checkIn">Check in time</label>
          <input type="datetime-local" id="checkIn" {...formik.getFieldProps("checkIn")} placeholder="14:00" />
        </div>
        <div>
          <label htmlFor="checkOut">Check out time</label>
          <input type="datetime-local" id="checkOut" {...formik.getFieldProps("checkOut")} placeholder="20:00" />
        </div>
        <div>
          <label htmlFor="maxGuests">Max number of guests</label>
          <input type="number" id="maxGuests" {...formik.getFieldProps("maxGuests")} placeholder="5" />
        </div>
      </div>

      <button type="submit" className="primary my-4">Save</button>
    </form>
  )
}