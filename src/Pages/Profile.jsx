import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-32 text-center">
        <p className="text-2xl text-gray-600 mb-8">Please log in to view your profile.</p>
        <Link to="/" className="text-indigo-600 hover:underline text-lg">← Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12">Profile</h1>
      <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100">
        <div className="flex items-center mb-10">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600">
            {user.name[0].toUpperCase()}
          </div>
          <div className="ml-8">
            <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">Member since 2025</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 mb-10">Your personal space.</p>
        <button onClick={logout} className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;