import api from '@/api/api'
import { GoogleIcon } from '@/components/ui/google-logo'
import useAuthStore from '@/stores/authStore'
import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertCircleIcon } from 'lucide-react'

const RegistrationForm = ({ apiUrl, registerUrl }: { apiUrl: string; registerUrl: string }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [, navigate] = useLocation()
  const setIsAuthorized = useAuthStore(state => state.setIsAuthorized)
  const [invalidCreds, setInvalidCredentials] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const username = (form.username as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value

    try {
      const response = await api.post(apiUrl, { username, password })
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
        setIsAuthorized(true)
        navigate('/')
      }
      if (response.status !== 200) {
        alert('Failed to register')
        console.error(response.statusText)
        navigate(registerUrl)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) setInvalidCredentials(true)
      else alert(error)
      // console.error(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Google login clicked')
  }

  const renderRegistrationMessage = () => {
    if (invalidCreds)
      return (
        <div className="text-primary">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Invalid Credentials</AlertTitle>
            <AlertDescription>
              <p>Please verify your billing information and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Chack username</li>
                <li>Check password</li>
                <li>Please try again</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
  }

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {registerUrl === '/login' ? 'Welcom Back' : 'Create an Account'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {renderRegistrationMessage()}
            {registerUrl === '/login' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="text-primary hover:text-primary-dark">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="w-full btn-primary">
              {registerUrl === '/login' ? ' Login' : ' Register'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {registerUrl === '/login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <Link
              href={registerUrl === '/login' ? '/register' : '/login'}
              className="text-primary hover:text-primary-dark"
            >
              {registerUrl === '/login' ? 'Create an account' : 'Log in'}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default RegistrationForm
