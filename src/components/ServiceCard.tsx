import {useNavigate} from "react-router-dom"

type ServiceCardProps = {
  imageSrc: string
  serviceNumber?: number
  title: string
  description: string
}

export default function ServiceCard({ imageSrc, serviceNumber, title, description }: ServiceCardProps) {
  const navigate = useNavigate()
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  function handleOnClick() {
    navigate('/pengajuan/' + slug, {
      state: { 
        title,
      }
    })
  }
  return (
    <button 
      onClick={handleOnClick}
      className="max-size-64 border border-gray-300 h-full w-full rounded-lg hover:cursor-pointer"
    >
      <div className="flex flex-col h-full justify-start items-center text-center gap-4 p-8">
        <img src={imageSrc} className="size-24" />
        <div className="font-bold">
          { !!serviceNumber && (
            <div>
              PAKLAY { serviceNumber }:
            </div>
          )}
          { title }
        </div>
        <div className="font-light">
          { description }
        </div>
      </div>
    </button>
  )
}
