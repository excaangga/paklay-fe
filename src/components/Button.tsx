type ButtonProps = {
  text: string
  onClick: () => void
  type?: 'primary' | 'secondary'
  className?: string
}

export default function Button({ type = 'primary', text, onClick, className }: ButtonProps) {
  let buttonStyle

  switch (type) {
    case 'primary':
      buttonStyle = 'bg-blue2'
      break
    default:
      buttonStyle = 'bg-blue2'
      break
  }

  return (
    <button 
      onClick={onClick}
      className={`rounded px-4 py-1 text-white font-bold hover:bg-blue2/80 hover:cursor-pointer ${buttonStyle} ${className}`}
    >
      { text }
    </button>
  )
}
