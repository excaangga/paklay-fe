import saktiIcon from "/src/assets/sakti.svg"

export default function Login() {
  function handleSaktiLogin() {
    window.location.href = "https://sakti.karanganyarkab.go.id/login"
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 px-8 md:px-16 py-10 my-16 w-full max-w-[90%] md:max-w-xl border border-gray-300 rounded-lg">
        <div className="text-lg font-bold text-center">
          Masuk
        </div>
        <div className="text-center">
          Untuk menggunakan Aplikasi ini Anda dapat menggunakan akun SAKTI Karanganyar
        </div>
        <button 
          onClick={handleSaktiLogin}
          className="flex gap-4 justify-center items-center border border-gray-300 shadow-sm hover:cursor-pointer hover:bg-black/5 py-2 font-bold rounded-lg"
        >
          <img src={saktiIcon} className="size-6" />
          <div>
            Masuk dengan SAKTI
          </div>
        </button>
      </div>
    </div>
  )
}
