// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [loginType, setLoginType] = useState('user'); // 'user' or 'grampanchayat'
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const userCredentials = { username: 'user', password: 'Tej123' };
//     const gramPanchayatCredentials = { username: 'grampanchayat', password: 'gp123' };
//     const credentials = loginType === 'user' ? userCredentials : gramPanchayatCredentials;

//     if (username === credentials.username && password === credentials.password) {
//       localStorage.setItem('loginType', loginType);
//       localStorage.setItem('isAuthenticated', 'true');
//       if (loginType === 'user') {
//         navigate('/');
//       } else {
//         navigate('/grampanchayat-dashboard');
//       }
//     } else {
//       setError('चुकीचे युजरनेम किंवा पासवर्ड');
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative"
//       style={{
//         backgroundImage: "url('https://archive.indiaspend.com/wp-content/uploads/village_620.png')",
//       }}
//     >
//       {/* Overlay for subtle blur and contrast */}
//       <div className="absolute inset-0 backdrop-blur-xs  bg-opacity-100"></div>

//       {/* Login Card */}
//       <div className="relative  bg-opacity-15 backdrop-blur-xl p-10 rounded-3xl shadow-xl max-w-md w-full border border-opacity-20 transform transition-all hover:scale-105">
//         <h1 className="text-4xl font-bold text-center mb-8  tracking-wide drop-shadow-md">
//           ‖ लॉगिन ‖
//         </h1>

//         {/* Login Type Selection */}
//         <div className="flex justify-center mb-8 space-x-4">
//           <button
//             onClick={() => setLoginType('user')}
//             className={`px-6 py-2.5 cursor-pointer rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
//               loginType === 'user'
//                 ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
//                 : 'bg-white bg-opacity-30 text-black hover:bg-opacity-40'
//             }`}
//           >
//             युजर लॉगिन
//           </button>
//           <button
//             onClick={() => setLoginType('grampanchayat')}
//             className={`px-6 py-2.5 rounded-full cursor-pointer text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
//               loginType === 'grampanchayat'
//                 ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-md'
//                 : 'bg-white bg-opacity-30 text-black hover:bg-opacity-40'
//             }`}
//           >
//             ग्रामपंचायत लॉगिन
//           </button>
//         </div>

//         {/* Login Form */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-base font-medium text-white mb-2">
//               युजरनेम
//             </label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3  bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
//               placeholder="युजरनेम प्रविष्ट करा"
//             />
//           </div>
//           <div>
//             <label className="block text-base font-medium text-white mb-2">
//               पासवर्ड
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3  bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
//               placeholder="पासवर्ड प्रविष्ट करा"
//             />
//           </div>
//           {error && (
//             <p className="text-red-300 text-center text-base font-medium animate-pulse">
//               {error}
//             </p>
//           )}
//           <button
//             onClick={handleLogin}
//             className="w-full bg-gradient-to-r cursor-pointer from-red-600 to-red-700 text-white text-lg font-semibold py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             लॉगिन करा
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginType, setLoginType] = useState('user'); // 'user' or 'grampanchayat'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = () => {
    const userCredentials = { username: 'user', password: 'Tej123' };
    const gramPanchayatCredentials = { username: 'grampanchayat', password: 'gp123' };
    const credentials = loginType === 'user' ? userCredentials : gramPanchayatCredentials;

    if (username === credentials.username && password === credentials.password) {
      localStorage.setItem('loginType', loginType);
      localStorage.setItem('isAuthenticated', 'true');
      if (loginType === 'user') {
        navigate('/');
      } else {
        navigate('/grampanchayat-dashboard');
      }
    } else {
      setError('चुकीचे युजरनेम किंवा पासवर्ड');
    }
  };

const fillCredentials = (type) => {
    if (type === 'user') {
      setUsername('user');
      setPassword('Tej123');
      setLoginType('user');
    } else {
      setUsername('grampanchayat');
      setPassword('gp123');
      setLoginType('grampanchayat');
    }
    setError('');
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('https://archive.indiaspend.com/wp-content/uploads/village_620.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-xs bg-opacity-100"></div>

      {/* Credential Box - User Login */}
      <div onClick={() => fillCredentials('user')} className="absolute cursor-pointer top-10 left-4 sm:top-25 sm:left-5 bg-gradient-to-br from-sky-400 via-purple-200 to-white text-transparent bg-clip-text bg-opacity-70 p-4 rounded-lg shadow-md text-sm font-medium  backdrop-blur-md z-10 animate-bounce">
        <h2 className="font-bold mb-2 text-gray-900">युजर लॉगिन:</h2>
        <p>Username: <span className="font-semibold">user</span></p>
        <p>Password: <span className="font-semibold">Tej123</span></p>
      </div>

      {/* Credential Box - Grampanchayat Login */}
      <div onClick={() => fillCredentials('grampanchayat')} className="absolute top-10 right-4 sm:top-25 sm:right-5 cursor-pointer  bg-gradient-to-br from-red-200 via-purple-300 to-white text-transparent bg-clip-text bg-opacity-70 p-4 rounded-lg shadow-md text-sm font-medium backdrop-blur-md z-10 animate-bounce">
        <h2 className="font-bold mb-2 text-gray-900 ">ग्रामपंचायत लॉगिन:</h2>
        <p>Username: <span className="font-mono ">grampanchayat</span></p>
        <p>Password: <span className="font-semibold">gp123</span></p>
      </div>

      {/* Login Card */}
      <div className="relative bg-opacity-15 backdrop-blur-xl p-10  rounded-3xl shadow-xl max-w-md w-full border border-opacity-20 transform transition-all hover:scale-105 z-10">
        <h1 className="text-4xl font-bold text-center mb-8 tracking-wide drop-shadow-md text-white">
          ‖ लॉगिन ‖
        </h1>

        {/* Login Type Selection */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setLoginType('user')}
            className={`px-6 py-2.5 cursor-pointer rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              loginType === 'user'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                : 'bg-white bg-opacity-30 text-black hover:bg-opacity-40'
            }`}
          >
            युजर लॉगिन
          </button>
          <button
            onClick={() => setLoginType('grampanchayat')}
            className={`px-6 py-2.5 rounded-full cursor-pointer text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              loginType === 'grampanchayat'
                ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-md'
                : 'bg-white bg-opacity-30 text-black hover:bg-opacity-40'
            }`}
          >
            ग्रामपंचायत लॉगिन
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium text-white mb-2">
              युजरनेम
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="युजरनेम प्रविष्ट करा"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white mb-2">
              पासवर्ड
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="पासवर्ड प्रविष्ट करा"
            />
          </div>
          {error && (
            <p className="text-red-300 text-center text-base font-medium animate-pulse">
              {error}
            </p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r cursor-pointer from-red-600 to-red-700 text-white text-lg font-semibold py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            लॉगिन करा
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;