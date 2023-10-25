import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useStore } from './store';
import './App.css'
import Header from "./components/Header";

export default function App() {
  const isAuth = useStore((state) => state.isAuth)

  useEffect(() => {
    const isUserAuth = async () => {
      await isAuth()
    }
    isUserAuth()
  }, [])

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}

