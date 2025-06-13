import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginType, setLoginType] = useState('user'); // 'user' or 'grampanchayat'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock credentials
    const userCredentials = { username: 'user', password: 'user123' };
    const gramPanchayatCredentials = { username: 'grampanchayat', password: 'gp123' };

    const credentials = loginType === 'user' ? userCredentials : gramPanchayatCredentials;

    if (username === credentials.username && password === credentials.password) {
      // Store login type in localStorage
      localStorage.setItem('loginType', loginType);
      localStorage.setItem('isAuthenticated', 'true');
      // Redirect based on login type
      if (loginType === 'user') {
        navigate('/');
      } else {
        navigate('/grampanchayat-dashboard');
      }
    } else {
      setError('चुकीचे युजरनेम किंवा पासवर्ड');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">लॉगिन</h1>

        {/* Login Type Selection */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setLoginType('user')}
            className={`px-4 py-2 mx-2 rounded-lg text-lg font-semibold ${
              loginType === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            युजर लॉगिन
          </button>
          <button
            onClick={() => setLoginType('grampanchayat')}
            className={`px-4 py-2 mx-2 rounded-lg text-lg font-semibold ${
              loginType === 'grampanchayat'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ग्रामपंचायत लॉगिन
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              युजरनेम
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="युजरनेम प्रविष्ट करा"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              पासवर्ड
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="पासवर्ड प्रविष्ट करा"
            />
          </div>
          {error && (
            <p className="text-red-500 text-center text-lg">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            लॉगिन करा
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;