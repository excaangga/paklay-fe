import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export interface Field {
  label: string
  type: string
  name: string
  options?: string[]
  desc?: string
  descUrl?: string
  isRequired?: boolean
  disabled?: boolean
}

interface DynamicFormProps {
  fields: Field[]
  subfields?: Field[]
  onSubmit: (data: Record<string, any>) => void
  onSubfieldsSubmit?: (data: Record<string, any>) => void
  hasPreviousStep?: boolean
  onBack?: () => void
  submitButtonText?: string
  initialData?: Record<string, any>
  onChange?: (data: Record<string, any>) => void
  hasNav?: boolean
}

export function DynamicForm({
  fields,
  subfields,
  onSubmit,
  onSubfieldsSubmit,
  hasPreviousStep,
  onBack,
  submitButtonText = "Selanjutnya >",
  initialData = {},
  onChange,
  hasNav = true
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [preview, setPreview] = useState<Record<string, string>>({})
  const [fileTypes, setFileTypes] = useState<Record<string, string>>({})
  const navigate = useNavigate()

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type, files } = e.target as HTMLInputElement
    let newData: Record<string, any> = {}

    if (type === "file" && files?.[0]) {
      const file = files[0]
      newData = { ...formData, [name]: file }
      setFormData(newData)
      const fileURL = URL.createObjectURL(file)
      setPreview((prev) => ({ ...prev, [name]: fileURL }))
      setFileTypes((prev) => ({ ...prev, [name]: file.type }))
    } else {
      newData = { ...formData, [name]: value }
      setFormData(newData)
    }

    if (onChange) onChange(newData)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(formData)
  }

  function handleSubfieldsSubmit(e: React.MouseEvent) {
    e.preventDefault()
    if (onSubfieldsSubmit) onSubfieldsSubmit(formData)
  }

  function handleUrlClick(url: string) {
    navigate(url)
  }

  function renderField(f: Field) {
    return (
      <div key={f.name} className="flex flex-col gap-2">
        <label className="font-semibold flex items-center gap-1">
          {f.label}
          {f.isRequired && <span className="text-red-500">*</span>}
        </label>

        {f.type === "textarea" ? (
          <textarea
            name={f.name}
            value={formData[f.name] || ""}
            onChange={handleChange}
            required={f.isRequired}
            disabled={f.disabled}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            rows={3}
          />
        ) : f.type === "select" ? (
          <select
            name={f.name}
            value={formData[f.name] || ""}
            onChange={handleChange}
            required={f.isRequired}
            disabled={f.disabled}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <option value="">Pilih {f.label}</option>
            {f.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : f.type === "file" ? (
          <div className="flex flex-col">
            <div className="flex gap-2">
              <div className="w-full border border-gray-300 rounded-md px-3 py-2 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">
                    {formData[f.name]?.name || "Pilih file"}
                  </span>
                </div>
              </div>

              <label className="max-h-9 flex items-center justify-center bg-gray-200 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-300 text-xs font-medium">
                Pilih
                <input
                  type="file"
                  name={f.name}
                  onChange={handleChange}
                  required={f.isRequired}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
            </div>

            {f.desc && (
              <div className="text-xs font-light mt-2">
                {f.desc}{" "}
                {f.descUrl && (
                  <button
                    type="button"
                    onClick={() => handleUrlClick(f.descUrl!)}
                    className="font-bold hover:underline hover:cursor-pointer"
                  >
                    di sini
                  </button>
                )}
              </div>
            )}

            {preview[f.name] && (
              <div className="mt-2">
                {fileTypes[f.name]?.includes("pdf") ? (
                  <iframe
                    src={preview[f.name]}
                    className="w-52 h-64 border border-gray-300 rounded-md"
                    title="PDF Preview"
                  />
                ) : (
                  <img
                    src={preview[f.name]}
                    alt="Preview"
                    className="w-52 border border-gray-300 rounded-md"
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <input
            type={f.type}
            name={f.name}
            value={formData[f.name] || ""}
            onChange={handleChange}
            required={f.isRequired}
            disabled={f.disabled}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        )}

        {f.type !== "file" && f.desc && (
          <div className="text-xs font-light mt-1">
            {f.desc}{" "}
            {f.descUrl && (
              <button
                type="button"
                onClick={() => handleUrlClick(f.descUrl!)}
                className="font-bold hover:underline hover:cursor-pointer"
              >
                di sini
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-3 text-sm" onSubmit={handleSubmit}>
      {/* Main Fields */}
      {fields.map((f) => renderField(f))}

      {/* Subfields Section */}
      {subfields && subfields.length > 0 && (
        <div className="mt-6 border border-gray-300 shadow-sm rounded-lg p-4 flex flex-col gap-3">
          <div className="text-lg font-bold mb-2">Data Dukung Tambahan</div>
          {subfields.map((sf) => renderField(sf))}

          <button
            type="button"
            onClick={handleSubfieldsSubmit}
            className="self-center w-40 bg-blue2 hover:bg-blue2/70 hover:cursor-pointer text-white py-2 rounded-md text-sm font-semibold"
          >
            Simpan Data Dukung
          </button>
        </div>
      )}

      { hasNav ? (
        <div
          className={`flex ${
            hasPreviousStep ? "justify-between" : "justify-end"
          } mt-4`}
        >
          {hasPreviousStep && (
            <button
              type="button"
              onClick={onBack}
              className="w-32 bg-orange3 hover:bg-orange3/70 hover:cursor-pointer text-white py-2 rounded-md text-sm font-semibold"
            >
              &lt; Sebelumnya
            </button>
          )}
          <button
            type="submit"
            className="w-32 bg-blue5 hover:bg-blue5/70 hover:cursor-pointer text-white py-2 rounded-md text-sm font-semibold"
          >
            {submitButtonText}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="self-center w-24 bg-blue2 hover:bg-blue2/70 hover:cursor-pointer text-white py-2 rounded-md text-sm font-semibold"
        >
          Simpan
        </button>
      )}
    </form>
  )
}
