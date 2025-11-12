import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Layout from "./components/Layout"
import Landing from "./pages/Landing/Landing"
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import Pengajuan from "./pages/Pengajuan/Pengajuan"
import Profile from "./pages/Profile/Profile"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/masuk" element={<Login />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/dashboard-pelapor" element={<Dashboard />} />
          <Route path="/pengajuan/:slug" element={<Pengajuan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
