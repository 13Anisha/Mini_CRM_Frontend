import React from 'react';

export default function AuthButton({ user }) {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/api/auth/logout';
  };

  return (
    <div>
      {user ? (
        <button onClick={handleLogout} className="bg-red-400 text-white px-4 py-2 rounded">
          Logout ({user.displayName || user.email})
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login 
        </button>
      )}
    </div>
  );
}
