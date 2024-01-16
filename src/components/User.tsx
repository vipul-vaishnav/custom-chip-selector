import React from 'react'

import { User as UserType } from '../types/User'

type UserProps = {
  user: UserType
  handleFocus: () => void | undefined
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setChips: React.Dispatch<React.SetStateAction<UserType[]>>
}

const User: React.FC<UserProps> = (props) => {
  const { user, setChips, setQuery, handleFocus } = props

  const handleClick = () => {
    setChips((prev) => [...prev, user])
    setQuery('')
    handleFocus()
  }

  return (
    <li
      role="button"
      onClick={handleClick}
      className="flex items-center justify-between py-4 px-2 border-b cursor-pointer hover:bg-gray-50 transition-all duration-150"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
          {user.name[0]}
        </div>
        <span className="text-sm">{user.name}</span>
      </div>
      <div className="text-xs text-gray-400">{user.email}</div>
    </li>
  )
}
export default User
