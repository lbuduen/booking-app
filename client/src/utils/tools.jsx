import { Navigate, useAsyncError } from "react-router-dom";
import { toast } from "react-toastify";
import cookie from 'react-cookies';

export const QueryError = ({ error }) => {
  const asyncError = useAsyncError();
  const err = error || asyncError

  toast.error(err.response.data.error || err.message)

  if (err.response.status === 401) {
    cookie.remove("x-access-token", { path: '/' });
    return <Navigate to='/auth/login' />
  }
}