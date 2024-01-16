import React, { FormEvent, useRef, useState } from 'react'

import { useFetch } from './hooks/useFetch'

import { getUsers } from './utils/getUsers'

import { User as UserType } from './types/User'

import Loader from './components/Loader'
import User from './components/User'
import Chip from './components/Chip'

type AppProps = Record<string, string>

const App: React.FC<AppProps> = () => {
  const { data, isLoading, isError } = useFetch(getUsers())

  const inputRef = useRef<HTMLInputElement>(null)

  const [chips, setChips] = useState<Array<UserType>>([])
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const [highlighted, setHighlighted] = useState<UserType | null>(null)

  const handleFocus = () => inputRef.current?.focus()

  const users = data
    .filter((user) => !chips.find((x) => x.id === user.id))
    .filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase())
    )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (users.length > 0) {
      setChips((prev) => [...prev, users[0]])
      setQuery('')
      handleFocus()
    }
  }

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && query === '' && chips.length > 0) {
      if (highlighted) {
        setChips((prev) => prev.filter((item) => item.id !== highlighted.id))
        setHighlighted(null)
      } else {
        const lastChip = chips[chips.length - 1]
        setHighlighted(lastChip)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto my-12 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return <div className="max-w-xl mx-auto my-12 flex items-center justify-center">Error | Something went wrong.</div>
  }

  return (
    <main className="max-w-screen-md mx-auto px-6 my-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-12 md:text-4xl md:text-center">Pick Users</h1>
      <section>
        <div className="w-full bg-blue-50 focus:outline-none p-2 border-b-2 border-b-blue-600 flex items-center gap-3 flex-wrap">
          {chips.map((chip, idx) => (
            <Chip user={chip} key={idx} setChips={setChips} handleFocus={handleFocus} highlighted={highlighted} />
          ))}
          <div className="relative flex-1">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                autoComplete="off"
                value={query}
                ref={inputRef}
                onFocus={() => setShow(true)}
                placeholder="Add New User..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleBackspace}
                className="p-2 min-w-40 bg-transparent focus:outline-none w-full"
              />
            </form>

            {show && (
              <div className="w-96 absolute top-full left-0 bg-white shadow-xl p-1 max-h-96 overflow-auto">
                {data && data.length > 0 ? (
                  <ul>
                    {users.map((user, idx) => (
                      <User user={user} key={idx} setChips={setChips} setQuery={setQuery} handleFocus={handleFocus} />
                    ))}
                  </ul>
                ) : (
                  'Empty List'
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
export default App
