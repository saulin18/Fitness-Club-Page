import api from '@/api/api'
import { LOGOUT_URL } from '@/api/constants'
import useAuthStore from '@/stores/authStore'
import { useEffect, useState } from 'react'
import { Redirect } from 'wouter'

const Logout = () => {
  const [redirect, setRedirect] = useState(false)
  const { isAuthorized, setIsAuthorized } = useAuthStore()

  useEffect(() => {
    const logout = async () => {
      if (!isAuthorized) return 

      const refreshToken = localStorage.getItem('refresh')

      try {
        const response = await api.post(LOGOUT_URL, { refresh: refreshToken })
        if (response.status === 200) {
          localStorage.clear()
          setIsAuthorized(false)
          setRedirect(true)
        }
        if (response.status === 400) {
          localStorage.clear()
          setRedirect(true)
        }
      } catch (error) {
        console.error('Logout failed:', error)
        console.log(error.response.data)
        setRedirect(true)
      }
    }
    logout()
  }, [setIsAuthorized, isAuthorized])

  if (redirect) return <Redirect to="/login" />
}

export default Logout
