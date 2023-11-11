import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header";
import { QueryError } from "../utils/tools";

export default function AuthLayout() {
  const { userPromise } = useLoaderData()

  return (
    <Suspense fallback={'Loading...'}>
      <Await
        resolve={userPromise}
        errorElement={<QueryError />}
      >
        {() => (
          <>
          <div className="py-4 px-8 flex flex-col min-h-screen">
            <Header />
            <Outlet />
          </div>
        </>
        )}
      </Await>
    </Suspense>
  )
}

