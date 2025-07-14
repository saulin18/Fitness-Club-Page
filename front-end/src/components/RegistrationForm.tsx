import api from '@/api/api'
import { GoogleIcon } from '@/components/ui/google-logo'
import useAuthStore from '@/stores/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation } from 'wouter'
import { z } from 'zod'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { toast } from 'sonner'

type FormData = {
  username: string
  password: string
}

const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Required*' })
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(25, { message: 'Username must be at most 25 characters long' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores'
    })
    .regex(/^\S+$/, { message: 'Username must not contain spaces' }),
  password: z
    .string()
    .min(1, { message: 'Required*' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' })
    .regex(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/(?=.*\d)/, { message: 'Password must contain at least one number' })
})

const RegistrationForm = ({ apiUrl, registerUrl }: { apiUrl: string; registerUrl: string }) => {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const [, navigate] = useLocation()
  const setIsAuthorized = useAuthStore(state => state.setIsAuthorized)
  const [invalidCreds, setInvalidCredentials] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  // Handlers
  const onSubmit: SubmitHandler<FormData> = async data => {
    const { username, password } = data

    try {
      const response = await api.post(apiUrl, { username, password })
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)

        setIsAuthorized(true)

        const message = registerUrl === '/login' ? 'Login successful' : 'Registration successful'
        toast.success(message, {
          description: 'You are now logged in.'
        })

        navigate('/')
      }
      if (response.status > 399) {
        toast.error('Failed to register', {
          description: 'Please try again later or contact support.'
        })
        console.error(response.statusText)
        navigate(registerUrl)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) setInvalidCredentials(true)
      else
        toast.error('An error occurred', {
          description: `Please try again later or contact support.\nError: ${error}`
        })
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Google login clicked')
  }

  const clearInvalidCreds =
    (field: 'username' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
      register(field).onChange(event)
      if (invalidCreds) setInvalidCredentials(null)
    }

  // Render functions
  const renderRegistrationMessage = () => {
    if (invalidCreds)
      return (
        <div className="text-primary">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Invalid Credentials</AlertTitle>
            <AlertDescription>
              <p>Please verify your login information and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Check username</li>
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
            {registerUrl === '/login' ? 'Welcome Back' : 'Create an Account'}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                {...register('username')}
                onChange={clearInvalidCreds('username')}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 justify-between"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  {...register('password')}
                  onChange={clearInvalidCreds('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
                )}
              </div>
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
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="text-primary hover:text-red-400 transition-colors">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center w-full">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </span>
              ) : registerUrl === '/login' ? (
                'Login'
              ) : (
                'Register'
              )}
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
              className="text-primary hover:text-red-400 transition-colors"
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
