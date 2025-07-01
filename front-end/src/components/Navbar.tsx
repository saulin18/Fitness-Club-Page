import { Menu } from 'lucide-react'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import useAuthStore from '@/stores/authStore'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthorized, setIsAuthorized } = useAuthStore()
  const [location] = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('refresh')
    setIsAuthorized(token !== null)
  }, [isAuthorized, setIsAuthorized])

  const registration = () => {
    const registrationURLs = ['/login', '/register', '/logout']
    if (registrationURLs.includes(location)) return null
    if (isAuthorized)
      return (
        <Button className="bg-primary text-white hover:bg-primary-dark transition-colors">
          <a href="/logout">Logout</a>
        </Button>
      )
    if (!isAuthorized)
      return (
        <Button className="bg-primary text-white hover:bg-primary-dark transition-colors">
          <a href="/login">Login</a>
        </Button>
      )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-20 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-primary dark:text-primary-dark"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-bold text-xl text-gray-900 dark:text-gray-100">Fitness Club</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              Home
            </Link>
            <a
              href="/know-more"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              Training
            </a>
            <a
              href="#footer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              Contact
            </a>
            {registration()}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
              {isOpen ? (
                <X size={24} className="z-40 relative" onClick={() => setIsOpen(false)} />
              ) : (
                <Menu size={24} className="z-40 relative" onClick={() => setIsOpen(true)} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4"
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="container mx-auto px-4 space-y-4">
              <Link
                href="/"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors"
              >
                Home
              </Link>
              <a
                href="/know-more"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors"
              >
                Training
              </a>
              <a
                href="#footer"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors"
              >
                Contact
              </a>
              {registration()}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
