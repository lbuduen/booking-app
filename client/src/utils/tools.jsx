import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const QueryError = ({ error }) => {
  toast.error(error.message)
  if (error.response.status === 401) {
    return <Navigate to='/auth/login' />
  }
}