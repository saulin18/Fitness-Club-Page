import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/api/constants'
import { create } from 'zustand'

type AuthState = {
  isAuthorized: boolean
  setIsAuthorized: (value: boolean) => void
}

const hasToken = () => !!localStorage.getItem(ACCESS_TOKEN) || !!localStorage.getItem(REFRESH_TOKEN)

const useAuthStore = create<AuthState>(set => ({
  isAuthorized: hasToken(),
  setIsAuthorized: value => set({ isAuthorized: value })
}))

export default useAuthStore
