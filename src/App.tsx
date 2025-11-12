import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Pengajuan from './pages/Pengajuan/Pengajuan';
import Profile from './pages/Profile/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/masuk' element={<Login />} />
          <Route path='/profil' element={<Profile />} />
          <Route path='/dashboard-pelapor' element={<Dashboard />} />
          <Route path='/pengajuan/:slug' element={<Pengajuan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
