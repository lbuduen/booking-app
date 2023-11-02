import { Outlet } from "react-router-dom";
import './App.css'

export default function App() {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Outlet />
    </div>
  )
}

