import eyeIcon from "/src/assets/eye.svg"
import infoIcon from "/src/assets/info.svg"
import editIcon from "/src/assets/edit.svg"
import trashIcon from "/src/assets/trash.svg"
import {statusStyles} from "../pages/Dashboard/status_styles"

type Props = {
  status: string
  code: string
  date: string
  description: string
}

export default function SubmissionCard({ status, code, date, description }: Props) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
      <div className="flex justify-end">
        <span className={`px-3 py-1 text-sm rounded-md font-semibold ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      <div className="border-t border-gray-300 shadow-sm my-1">
      </div>

      <div className="text-sm grid grid-cols-12 gap-x-2 gap-y-1">
        <span className="font-semibold col-span-4 text-left">Kode Pengajuan</span> 
        <span className="col-span-2 text-right">:</span> 
        <span className="col-span-6">{code}</span> 

        <span className="font-semibold col-span-4 text-left">Dibuat Pada</span>
        <span className="col-span-2 text-right">:</span>
        <span className="col-span-6">{date}</span>

        <span className="font-semibold col-span-4 text-left">Keterangan</span>
        <span className="col-span-2 text-right">:</span>
        <span className="col-span-6">{description}</span>
      </div>

      <div className="border-t border-gray-300 shadow-sm my-1">
      </div>

      <div className="flex justify-end gap-3 mt-2 text-gray-600">
        <button className="hover:cursor-pointer" title="Lihat">
          <img src={eyeIcon} className="size-6" />
        </button>
        <button className="hover:cursor-pointer" title="Lihat">
          <img src={infoIcon} className="size-6" />
        </button>
        {status === "Diajukan" && (
          <>
            <button className="hover:cursor-pointer" title="Lihat">
              <img src={editIcon} className="size-6" />
            </button>
            <button className="hover:cursor-pointer" title="Lihat">
              <img src={trashIcon} className="size-6" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
