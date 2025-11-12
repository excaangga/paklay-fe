import arrowRightIcon from "./../assets/arrow-right.svg";

type PaginationProps = {
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
}

export default function Pagination({ 
  totalItems, 
  totalPages, 
  currentPage, 
  itemsPerPage,
  onPageChange, 
  onItemsPerPageChange 
}: PaginationProps) {
  return (
    <div className="flex flex-col items-start md:flex-row md:justify-between mt-4 gap-2 text-sm">
      <div>Total Pengajuan: {totalItems}</div>
      
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
        >
          <img src={arrowRightIcon} className="rotate-180" alt="Previous page" />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange && onPageChange(i + 1)}
            className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-gray-200" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-2 py-1 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
        >
          <img src={arrowRightIcon} className="" alt="Next page" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label>Tampilan per Halaman:</label>
        <select 
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange && onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}
