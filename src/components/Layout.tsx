import { Link, Outlet, useNavigate } from 'react-router-dom';
import buildingIcon from './../assets/building.svg'
import emailIcon from './../assets/email.svg'
import phoneIcon from './../assets/phone.svg'
import whatsappIcon from './../assets/whatsapp.svg'
import paklayIcon from './../assets/paklay.svg'
import plusIcon from './../assets/plus.svg'
import burgerIcon from './../assets/burger.svg'
import Button from './Button';
import {useState} from 'react';

// TODO: Change this to the actual context
const initialCtx = {
  isAuthenticated: false
}

export default function Layout() {
  const navigate = useNavigate()
  
  const [ctx, setCtx] = useState(initialCtx)
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLoginButton() {
    navigate('/masuk')
    setCtx({
      isAuthenticated: true
    })
    setMenuOpen(false)
  }

  // TODO: implement the real function
  function handleLogoutButton() {
    alert('Logged Out')
    navigate('/')
    setCtx({
      isAuthenticated: false
    })
    setMenuOpen(false)
  }

  return (
    <div className='flex flex-col text-black2'>
      {/* Header */}
      <div className='sticky top-0 z-50 bg-white'>
        <div className='font-bold flex flex-col gap-1 text-center p-6'>
          <div className='text-2xl'>
            PAKET LAYANAN KOMPLIT (PAKLAY ONLINE ADMINDUK)
          </div>
          <div className=''>
            DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL KABUPATEN KARANGANYAR
          </div>
        </div>

        {/* Navbar - Mobile */}
        <div className='flex justify-between items-center px-6 py-4 shadow-xl border-t border-gray-100 md:hidden'>
          <img src={paklayIcon} className='w-32' />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <img src={menuOpen ? plusIcon : burgerIcon} className={`size-5 transition-transform ${menuOpen ? "rotate-45" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col bg-white border-t border-gray-200 shadow-xl md:hidden">
            <Link to="/" className="py-3 font-bold border-b border-gray-300" onClick={() => setMenuOpen(false)}>
              <div className='px-6'>
                Beranda
              </div>
            </Link>
            {ctx.isAuthenticated && (
              <div className="flex flex-col">
                <Link 
                  to="/dashboard-pelapor" 
                  className="py-3 font-light border-b border-gray-300" 
                  onClick={() => setMenuOpen(false)}
                >
                  <div className='px-6'>
                    Dashboard Pelapor
                  </div>
                </Link>
                <Link to="/profil" className="py-3 font-light" onClick={() => setMenuOpen(false)}>
                  <div className='px-6'>
                    Profil
                  </div>
                </Link>
              </div>
            )}
            <div className="">
              {!ctx.isAuthenticated ? (
                <button 
                  onClick={handleLoginButton}
                  className='w-full bg-blue2 px-6 py-3 text-left text-white font-bold'
                >
                  Masuk
                </button>
              ) : (
                <button 
                  onClick={handleLogoutButton}
                  className='w-full bg-blue2 px-6 py-3 text-left text-white font-bold'
                >
                  Keluar
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navbar - Medium upwards screen */}
        <div className='flex justify-between items-center px-16 py-4 shadow-xl border-t border-gray-100 hidden md:flex'>
          <div className='flex gap-8 items-center'>
            <img src={paklayIcon} className='w-32' />
            <Link to={'/'} className='font-bold'>
              Beranda
            </Link>
            { ctx.isAuthenticated && (
              <div className='flex gap-8 items-center'>
                <Link to={'/dashboard-pelapor'} className='font-light'>
                  Dashboard Pelapor
                </Link>
                <Link to={'/profil'} className='font-light'>
                  Profil
                </Link>
              </div>
            )}
          </div>
          <div>
            { !ctx.isAuthenticated ? (
              <Button text='Masuk' onClick={handleLoginButton} />
            ) : (
                <Button text='Keluar' onClick={handleLogoutButton} />
              )}
          </div>
        </div>
      </div>

      {/* Konten */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="flex flex-col lg:flex gap-2 bg-blue3 px-8 md:px-16 py-6">
        <div className='lg:flex lg:justify-between md:mt-6'>
          <div className='flex flex-col lg:flex gap-2 text-center mb-4 md:text-left'>
            <div className='text-2xl font-bold'>
              D I S D U K C A P I L
            </div>
            <div>
              <div>
                Dinas Kependudukan dan Pencatatan Sipil
              </div>
              <div>
                Kabupaten Karanganyar
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:gap-4 md:mb-8 lg:max-w-[50%]">
            <div className="flex items-center gap-4">
              <img src={buildingIcon} className="w-7 h-7 flex-shrink-0" />
              <div>
                Komplek Perkantoran Cangakan, Jl. Kapten Mulyadi, Manggung, Cangakan, Kec. Karanganyar, Kab. Karanganyar, Jawa Tengah 57712
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img src={emailIcon} className="w-7 h-7 flex-shrink-0" />
              <div>disdukcapil@karanganyarkab.go.id</div>
            </div>

            <div className="flex items-center gap-4">
              <img src={phoneIcon} className="w-7 h-7 flex-shrink-0" />
              <div>(0271) 495035</div>
            </div>

            <div className="flex items-center gap-4">
              <img src={whatsappIcon} className="w-7 h-7 flex-shrink-0" />
              <div>0811-2634-333</div>
            </div>
          </div>
        </div>


        <div className='border-t border-blue2 mt-4'>
          <div className='text-center mt-4 md:mt-6'>
            ©2024. Powered by Dinas Komunikasi dan Informatika Kabupaten Karanganyar. PAKLAY v1.0.01
          </div>
        </div>
      </footer>
    </div>
  )
}
