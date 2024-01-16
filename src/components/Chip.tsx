import React from 'react'
import { User as UserType } from '../types/User'

type ChipProps = {
  user: UserType
  highlighted: UserType | null
  handleFocus: () => void | undefined
  setChips: React.Dispatch<React.SetStateAction<UserType[]>>
}

const Chip: React.FC<ChipProps> = (props) => {
  const { user, setChips, handleFocus, highlighted } = props

  const handleChipRemove = () => {
    setChips((prev) => prev.filter((item) => item.id !== user.id))
    handleFocus()
  }

  const iAmHighlighted = user.id === highlighted?.id

  return (
    <div
      className={`flex items-center gap-6 max-w-max bg-gray-300 p-2 rounded-full ${
        iAmHighlighted ? 'border-2 border-blue-600' : 'border-2'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-100 text-sm text-blue-600">
          {user.name[0]}
        </div>
        <span className="text-xs">{user.name}</span>
      </div>

      <button
        onClick={handleChipRemove}
        className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-600 text-sm text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
export default Chip
