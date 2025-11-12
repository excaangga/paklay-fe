type Step = {
  id: number
  label: string
}

type StepIndicatorProps = {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="md:ml-[7%] lg:ml-[15%] flex flex-col md:flex-row md:items-center gap-4 mb-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex md:flex-1 flex-col md:flex-row items-start md:items-center gap-2 relative">
          
          {/* Circle + label */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center size-7 rounded-full border font-medium
                ${currentStep === step.id ? "bg-blue1 border-blue1 text-white" : "border-gray-400 text-gray-600"}
              `}
            >
              {step.id}
            </div>

            <div
              className={`${
                currentStep === step.id ? "text-blue1 font-semibold" : "text-gray-700"
              }`}
            >
              {step.label}
            </div>
          </div>

          {/* Connector lines */}
          {index !== steps.length - 1 && (
            <>
              {/* Mobile vertical */}
              <div
                className={`mt-1 ml-3 w-0.5 h-8 md:hidden
                  ${currentStep > step.id ? "bg-blue1" : "bg-gray-300"}
                `}
              />
              {/* Desktop horizontal */}
              <div
                className={`hidden md:block flex-1 h-0.5 
                  ${currentStep > step.id ? "bg-blue1" : "bg-gray-300"}
                `}
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}
