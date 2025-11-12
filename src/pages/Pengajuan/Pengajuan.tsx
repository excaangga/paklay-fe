import { useLocation } from "react-router-dom"
import { useState } from "react"
import InformationBanner from "../../components/InformationBanner"
import StepIndicator from "../../components/StepIndicator"
import { DynamicForm, type Field } from "../../components/DynamicForm"

interface ServiceData { title: string }

interface FormStep {
  id: number
  label: string
  fields: Field[]
  subfields: Field[]
}

const steps: FormStep[] = [
  {
    id: 1,
    label: "Pelapor",
    fields: [
      { label: "NIK", type: "text", name: "nik", isRequired: true },
      { label: "Nama Lengkap", type: "text", name: "nama_lengkap", isRequired: true },
      { label: "Nomor Kartu Keluarga", type: "text", name: "no_kk", isRequired: true },
      { label: "Nomor HP", type: "text", name: "no_hp", isRequired: true },
      { label: "Email", type: "email", name: "email", isRequired: true },
      { label: "KTP", type: "file", name: "ktp", isRequired: true },
    ],
    subfields: []
  },
  {
    id: 2,
    label: "Pengajuan",
    fields: [
      { label: "Pilih Pengajuan", 
        type: "select", 
        name: "jenis_pengajuan", 
        options: ["Pengajuan Karena Perubahan Data", "Option 2"],
        isRequired: true
      },
    ],
    subfields: []
  },
  {
    id: 3,
    label: "Dokumen Persyaratan",
    fields: [],
    subfields: [
      { label: "Pilih Data Dukung Tambahan", type: "file", name: "additional_file" },
      { label: "Keterangan Tambahan Data Dukung", 
        type: "text", 
        name: "additional_file_desc",
        desc: "Wajib diisi jika menambahkan Data Dukung Tambahan"
      },
    ]
  }
]

const submenusSecondStep: Record<string, Field[]> = {
  "Pengajuan Karena Perubahan Data": [
    { label: "Nama Kepala Keluarga", type: "text", name: "name_kepala_kk", isRequired: true },
    { label: "Nomor Kartu Keluarga", type: "text", name: "nomor_kk_lagi", isRequired: true },
    { label: "Keterangan", 
      type: "text", 
      name: "keterangan", 
      desc: "Isikan detail perubahan yang dikehendaki",
      isRequired: true
    },
  ],
  "Option 2": [
    { label: "Deskripsi Test", type: "textarea", name: "deskripsi_test" },
  ],
}

const submenusThirdStep: Record<string, Field[]> = {
  "Pengajuan Karena Perubahan Data": [
    { label: "SK PNS/Pensiun", type: "file", name: "scan_sk_pns", desc: "Perubahan pekerjaan PNS/Pensiunan" },
    { label: "Kartu Keluarga", type: "file", name: "scan_kk", isRequired: true },
    { label: "KTP", type: "file", name: "scan_ktp", desc: "Bagi yang terdapat perubahan elemen data pada KTP" },
    { label: "Akta Perkawinan / Akta Perceraian", 
      type: "file", 
      name: "scan_akta_nikah", 
      desc: "Perubahan status perkawinan" 
    },
    { label: "Akta Kelahiran", 
      type: "file", 
      name: "scan_akta_lahir", 
      desc: "Perubahan nama, tempat tanggal lahir, nama orang tua" 
    },
    { label: "Ijazah Pendidikan Terakhir", 
      type: "file", 
      name: "scan_ijazah", 
      desc: "Perubahan pendidikan, gelar" 
    },
    { label: "Surat Pernyataan Perubahan Elemen Data Kependudukan (F1.06)", 
      type: "file", 
      name: "scan_surat_pernyataan_f106", 
      desc: "Unduh Surat Pernyataan Perubahan Elemen Data Kependudukan (F1.06)",
      descUrl: "/form-106",
      isRequired: true
    },
  ],
  "Option 2": [
    { label: "Deskripsi B1", type: "textarea", name: "deskripsi_b1" },
  ],
}

export default function Pengajuan() {
  const location = useLocation()
  const serviceData = location.state as ServiceData

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})

  function handleFormSubmit(data: Record<string, any>) {
    const currentStepData = steps.find(step => step.id === currentStep)
    const subfieldNames = currentStepData?.subfields?.map(f => f.name) || []

    // Filter out subfields from main form submission
    const filteredData: Record<string, any> = {}
    for (const [key, value] of Object.entries(data)) {
      if (!subfieldNames.includes(key)) filteredData[key] = value
    }

    const updatedData = { ...formData, ...filteredData }
    setFormData(updatedData)

    if (currentStep < steps.length) setCurrentStep(prev => prev + 1)
    else console.log("Final main form submission:", updatedData)
  }

  function handleSubfieldsSubmit(data: Record<string, any>) {
    const currentStepData = steps.find(step => step.id === currentStep)
    const subfieldNames = currentStepData?.subfields?.map(f => f.name) || []

    // Filter only subfields
    const filteredData: Record<string, any> = {}
    for (const [key, value] of Object.entries(data)) {
      if (subfieldNames.includes(key)) filteredData[key] = value
    }

    console.log("Submitted subfields only:", filteredData)
    setFormData(prev => ({ ...prev, ...filteredData }))
  }

  function handleBack() {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const currentStepData = steps.find(step => step.id === currentStep)
  const selectedOption = formData["jenis_pengajuan"]

  let displayedFields: Field[] = []

  if (currentStep === 2 && selectedOption) {
    displayedFields = [...currentStepData!.fields, ...submenusSecondStep[selectedOption]]
  } else if (currentStep === 3) {
    const previousStepOptionField: Field = {
      label: "Pilih Pengajuan",
      type: "select",
      name: "jenis_pengajuan",
      options: ["Pengajuan Karena Perubahan Data", "Option 2"],
      isRequired: true,
      disabled: true,
    }
    displayedFields = [previousStepOptionField, ...currentStepData!.fields, ...submenusThirdStep[selectedOption]]
  } else {
    displayedFields = currentStepData?.fields || []
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-10 my-6">
      <div className="text-xl font-bold">{serviceData?.title}</div>
      <InformationBanner />

      <div className="border border-gray-300 rounded-lg p-5 flex flex-col gap-3 shadow-sm bg-white">
        <StepIndicator 
          steps={steps.map(({ id, label }) => ({ id, label }))} 
          currentStep={currentStep} 
        />

        <div className="border-t border-gray-300 shadow-sm my-1"></div>

        {currentStepData && (
          <DynamicForm 
            fields={displayedFields}
            subfields={currentStepData.subfields ?? []}
            onSubfieldsSubmit={handleSubfieldsSubmit}
            onSubmit={handleFormSubmit}
            hasPreviousStep={currentStep > 1}
            onBack={handleBack}
            submitButtonText={currentStep === steps.length ? "Selesai" : "Selanjutnya >"}
            initialData={formData}
            onChange={setFormData}
          />
        )}
      </div>
    </div>
  )
}
