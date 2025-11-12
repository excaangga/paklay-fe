import xIcon from "/src/assets/x.svg"
import {useState} from "react"

// NOTE: pass this as props if needed
const bannerProps = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
}

export default function InformationBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="flex flex-col gap-2 bg-blue4 rounded-lg p-6">
      <div className="flex justify-between">
        <div className="text-sm font-semibold text-gray-700">
          Informasi
        </div>

        <button
          className="text-cyan-800 hover:text-cyan-600 hover:cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <img src={xIcon} className="size-3" />
        </button>
      </div>

      <div className="text-lg font-bold text-gray-900 mr-3">
        {bannerProps.title}
      </div>

      <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed mr-3">
        {bannerProps.desc}
      </div>
    </div>
  )
}
