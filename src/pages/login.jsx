
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chrome } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Animated logo */}
          <div className="mx-auto flex justify-center mb-6 animate-bounce">
            <div className="bg-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
              <Chrome className="text-white" size={32} />
            </div>
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 animate-fade-in">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 animate-fade-in">
            Or{' '}
            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              return to homepage
            </a>
          </p>
        </div>
        
        <div className="mt-8 space-y-6 animate-fade-in-up">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <a
                href="http://localhost:5000/api/auth/google"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Chrome className="h-5 w-5 text-indigo-300 group-hover:text-white transition-colors" />
                </span>
                Sign in with Google
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}