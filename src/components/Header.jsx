import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import { Link } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              MyBlog
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Thoughts on code, design, and building things
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="#" className="text-lg text-gray-600 hover:text-gray-900 font-medium transition">
              Home
            </Link>
            <Link to="#" className="text-lg text-gray-600 hover:text-gray-900 font-medium transition">
              About
            </Link>
            <Link to="#" className="text-lg text-gray-600 hover:text-gray-900 font-medium transition">
              Archive
            </Link>
            <Link to="/" className="...">Home</Link>
            <Link to="/profile" className="...">Profile</Link>

            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-gray-700">
                  Welcome, <strong>{user.name}</strong>
                </span>
                <button
                  onClick={logout}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-md"
              >
                Login / Register
              </button>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-3xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>

              <div className="mt-20 flex flex-col space-y-8">
                <Link to="#" className="text-2xl font-medium text-gray-800 hover:text-indigo-600 transition">
                  Home
                </Link>
                <Link to="#" className="text-2xl font-medium text-gray-800 hover:text-indigo-600 transition">
                  About
                </Link>
                <Link to="#" className="text-2xl font-medium text-gray-800 hover:text-indigo-600 transition">
                  Archive
                </Link>

                <div className="border-t border-gray-200 pt-8">
                  {user ? (
                    <div className="space-y-6">
                      <p className="text-xl text-gray-800">
                        Welcome, <strong>{user.name}</strong>
                      </p>
                      <button
                        onClick={logout}
                        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-md"
                    >
                      Login / Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Header;