import { User } from '../types/User'
import { GET_USERS } from './endpoints'
import httpClient from './httpClient'

export const getUsers = (): (() => Promise<Array<User>>) => {
  const func = async () => {
    const res = await httpClient.get<Array<User>>(GET_USERS)
    return res.data
  }

  return func
}
