import { useState } from "react"
import SubmissionCard from "../../components/SubmissionCard"
import Pagination from "../../components/Pagination"
import {statusStyles} from "./status_styles"
import searchIcon from "/src/assets/search.svg"
import eyeIcon from "/src/assets/eye.svg"
import infoIcon from "/src/assets/info.svg"
import editIcon from "/src/assets/edit.svg"
import trashIcon from "/src/assets/trash.svg"

export default function Dashboard() {
  const [search, setSearch] = useState("")

  const data = [
    { id: 1, status: "Diajukan", code: "REQ001", date: "2025-11-11 09:00:00", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
    { id: 2, status: "Disetujui", code: "REQ002", date: "2025-11-10 10:30:00", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
    { id: 3, status: "Ditolak", code: "REQ003", date: "2025-11-09 08:15:00", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
  ]

  const filtered = data.filter(item => 
    item.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6 px-8 py-10 my-6">
      <div className="text-xl font-bold">Dashboard Pelapor</div>

      <div className="border border-black2 rounded-lg p-4 bg-white shadow-sm">
        <div className="font-semibold mb-2">List Semua Pengajuan Saya</div>
        <div className="md:flex md:justify-end">
          <div className="relative md:max-w-64">
            <img src={searchIcon} className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-sm mb-4"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          {filtered.map(item => (
            <SubmissionCard
              key={item.id}
              status={item.status}
              code={item.code}
              date={item.date}
              description={item.desc}
            />
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-blue3">
                <tr className="text-sm font-semibold text-center">
                  <th className="px-4 py-3 border-b border-r border-gray-200">Kode Pengajuan</th>
                  <th className="px-4 py-3 border-b border-r border-gray-200">Dibuat Pada</th>
                  <th className="px-4 py-3 border-b border-r border-gray-200">Status</th>
                  <th className="px-4 py-3 border-b border-r border-gray-200">Keterangan</th>
                  <th className="px-4 py-3 border-b border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item.id} className="text-sm text-center hover:bg-gray-50 bg-white">
                    <td className={`px-4 py-3 font-mono border-r border-gray-200 ${index === filtered.length - 1 ? '' : 'border-b border-gray-200'}`}>
                      {item.code}
                    </td>
                    <td className={`px-4 py-3 border-r border-gray-200 ${index === filtered.length - 1 ? '' : 'border-b border-gray-200'}`}>
                      {item.date}
                    </td>
                    <td className={`px-4 py-3 border-r border-gray-200 ${index === filtered.length - 1 ? '' : 'border-b border-gray-200'}`}>
                      <span className={`px-3 py-2 text-sm rounded-md font-semibold ${statusStyles[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 border-r border-gray-200 ${index === filtered.length - 1 ? '' : 'border-b border-gray-200'}`}>
                      {item.desc}
                    </td>
                    <td className={`px-4 py-3 ${index === filtered.length - 1 ? '' : 'border-b border-gray-200'}`}>
                      <div className="grid grid-cols-2 gap-1">
                        <button className="p-1 hover:cursor-pointer" title="Lihat">
                          <img src={eyeIcon} className="size-6" />
                        </button>
                        <button className="p-1 hover:cursor-pointer" title="Info">
                          <img src={infoIcon} className="size-6" />
                        </button>
                        {item.status === "Diajukan" && (
                          <>
                            <button className="p-1 hover:cursor-pointer" title="Edit">
                              <img src={editIcon} className="size-6" />
                            </button>
                            <button className="p-1 hover:cursor-pointer" title="Hapus">
                              <img src={trashIcon} className="size-6" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination totalPages={3} currentPage={1} totalItems={100} itemsPerPage={10} />
      </div>
    </div>
  )
}
