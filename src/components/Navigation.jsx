import  { Link, useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const loginType = localStorage.getItem('loginType');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginType');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 p-4 flex justify-around items-center fixed top-0 w-full z-50 shadow-lg">
      {isAuthenticated ? (
        <>
          {loginType === 'user' ? (
            <>
              <Link
                to="/"
                className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  location.pathname === '/' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
                }`}
              >
                होम
              </Link>
              <Link
                to="/programs"
                className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  location.pathname === '/programs' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
                }`}
              >
                कार्यक्रम
              </Link>
              <Link
                to="/water"
                className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  location.pathname === '/water' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
                }`}
              >
                पाणी पुरवठा
              </Link>
              <Link
                to="/report"
                className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  location.pathname === '/report' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
                }`}
              >
                तक्रार
              </Link>
              <Link
                to="/about"
                className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  location.pathname === '/about' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
                }`}
              >
                बद्दल
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/grampanchayat-dashboard"
                className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  location.pathname === '/grampanchayat-dashboard' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
                }`}
              >
                डॅशबोर्ड
              </Link>
              <Link
                to="/grampanchayat-dashboard/users"
                className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  location.pathname === '/grampanchayat-dashboard/users' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
                }`}
              >
                वापरकर्ते
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="text-xl font-medium bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            लॉगआउट
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className={`text-xl font-medium p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow ${
            location.pathname === '/login' ? 'bg-orange-700 shadow-glow' : 'hover:bg-green-700'
          }`}
        >
          लॉगिन
        </Link>
      )}
    </nav>
  );
};

export default Navigation;