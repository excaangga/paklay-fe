import { useState } from "react"
import { DynamicForm, type Field } from "../../components/DynamicForm"

const profileFields: Field[] = [
  { label: "NIK", type: "text", name: "nik", isRequired: true },
  { label: "Nomor KK", type: "text", name: "nomor_kk", isRequired: true },
  { label: "Nama Lengkap", type: "text", name: "name", isRequired: true },
  { label: "Alamat", type: "text", name: "address", isRequired: true },
  { label: "Nomor HP", type: "text", name: "phone", isRequired: true },
  { label: "Email", type: "email", name: "email", isRequired: true },
  { label: "KTP", type: "file", name: "ktp", isRequired: true },
  {
    label: "Password",
    type: "password",
    name: "password",
    desc: "Kosongkan jika tidak ingin mengubah password",
  },
  {
    label: "Ulangi Password",
    type: "password",
    name: "password2",
    desc: "Kosongkan jika tidak ingin mengubah password",
  },
]

const dummyInitialData = {
  nik: "3276012304980003",
  nomor_kk: "3276011401201234",
  name: "Jack",
  address: "Jl. Merdeka No. 123, Bandung",
  phone: "081234567890",
  email: "jack@test.com",
  password: "",
  password2: "",
}

export default function Profile() {
  const [formData, setFormData] = useState<Record<string, any>>(dummyInitialData)

  function handleFormSubmit(data: Record<string, any>) {
    console.log("Form submitted:", data)
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-10 my-6">
      <div className="text-xl font-bold">Profil</div>

      <div className="border border-gray-300 rounded-lg p-5 flex flex-col gap-3 shadow-sm bg-white">
        <DynamicForm
          fields={profileFields}
          onSubmit={handleFormSubmit}
          initialData={formData}
          onChange={setFormData}
          hasNav={false}
        />
      </div>
    </div>
  )
}
