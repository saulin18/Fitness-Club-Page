/* eslint-disable react-hooks/exhaustive-deps */
import api from '@/api/api'
import { ACCESS_TOKEN, REFRESH_TOKEN, REFRESH_URL } from '@/api/constants'
import useAuthStore from '@/stores/authStore'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Redirect, useLocation } from 'wouter'

const ProtectedRoute = ({ children, url }) => {
  const { isAuthorized, setIsAuthorized } = useAuthStore()
  const [, navigate] = useLocation()

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      const response = await api.post(REFRESH_URL, { refresh: refreshToken })
      if (response.status < 300 && response.status > 199) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        setIsAuthorized(true)
      }
      if (response.status > 299) {
        console.log(response.data.message)
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) {
      setIsAuthorized(false)
      return
    }
    const decode = jwtDecode(token)
    const tokenExpiration = decode.exp
    const now = Date.now() / 1000

    if (tokenExpiration < now) {
      await refreshToken()
    }
    if (tokenExpiration > now) {
      setIsAuthorized(true)
    }
  }

  if (isAuthorized === null) return <h1>LOADING...</h1>

  return isAuthorized ? children : <Redirect to={url} />
}

const ProtectedRegistrationRoute = ({ children, url }) => {
  const { isAuthorized, setIsAuthorized } = useAuthStore()
  const [, navigate] = useLocation()

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      const response = await api.post(REFRESH_URL, { refresh: refreshToken })
      if (response.status < 300 && response.status > 199) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        setIsAuthorized(true)
      }
      if (response.status > 299) {
        console.log(response.data.message)
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) {
      setIsAuthorized(false)
      return
    }
    const decode = jwtDecode(token)
    const tokenExpiration = decode.exp
    const now = Date.now() / 1000

    if (tokenExpiration < now) {
      await refreshToken()
    }
    if (tokenExpiration > now) {
      setIsAuthorized(true)
    }
  }

  if (isAuthorized === null) return <h1>LOADING...</h1>

  return !isAuthorized ? children : <Redirect to={url} />
}
export { ProtectedRoute, ProtectedRegistrationRoute }
