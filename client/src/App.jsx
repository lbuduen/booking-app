import { Outlet } from "react-router-dom";
import './App.css'
import Header from "./components/Header";

export default function App() {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}

