import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/api/v1/auth/register", values);
        alert('Registration successfull, now you can log in')
      } catch (error) {
        console.error(error);
        alert('Registration failed, please try again later')
      }
    },
  });

  return (
    <div className="mt-auto mb-44">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <input type="text" id="name" {...formik.getFieldProps('name')} placeholder="John Doe" />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-600 text-xs mb-2">{formik.errors.name}</div>
        ) : null}
        <input type="email" id="email" {...formik.getFieldProps('email')} placeholder="your@email.com" />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-xs mb-2">{formik.errors.email}</div>
        ) : null}
        <input type="password" id="password" {...formik.getFieldProps('password')} placeholder="password" />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-xs mb-2">{formik.errors.password}</div>
        ) : null}
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
          Already have an account? <Link className="underline text-black" to='/auth/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}