import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from 'yup';

import { useStore } from '../store';

export default function LoginPage() {
  const login = useStore((state) => state.login)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: 'lbuduendev@gmail.com',
      password: '12345678'
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate("/");
      } catch (error) {
        toast.error(error)
      }
    }
  });

  return (
    <div className="mt-auto mb-64">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <input type="email"
          id="email"
          {...formik.getFieldProps("email")}
          placeholder="your@email.com" />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-xs mb-2">{formik.errors.email}</div>
        ) : null}

        <input type="password"
          id="password"
          {...formik.getFieldProps("password")}
          placeholder="password" />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-xs mb-2">{formik.errors.password}</div>
        ) : null}
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet? <Link className="underline text-black" to='/auth/register'>Register now</Link>
        </div>
      </form>
    </div>
  )
}