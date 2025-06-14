import { Link } from 'react-router-dom';
import { useState } from 'react';

const HomePage = () => {
  // Mock data for display
  const latestProgram = { title: "ग्राम स्वच्छता अभियान", date: "१५ जून २०२५", progress: 75 };
  const waterStatus = "उपलब्ध";
  const notifications = [
    { id: 1, message: "नवीन योजना जाहीर: २० जून २०२५" },
    { id: 2, message: "पाणी पुरवठा तपासणी: १८ जून २०२५" },
  ];
  const quickLinks = [
    { to: "/services", label: "सेवा" },
    { to: "/contact", label: "संपर्क" },
    { to: "/updates", label: "अपडेट्स" },
  ];

  // State for notification visibility
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 pt-15 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-xl animate-fade-in">
          माझे गाव
        </h1>
        <p className="text-xl md:text-2xl font-medium text-white/90">
          तुमच्या गावातील नवीनतम अपडेट्स, सेवा आणि योजनांचा लाभ घ्या
        </p>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-5xl mx-auto">
        {/* Notification Badge */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.length}
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-8 mt-12 w-64 bg-white bg-opacity-95 backdrop-blur-md p-4 rounded-lg shadow-xl border border-gray-200 z-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">सूचना</h3>
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li key={notification.id} className="text-gray-600 text-sm">
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Latest Program Card */}
          <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
            <div className="flex items-center mb-6">
              <svg
                className="w-10 h-10 text-blue-500 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                नवीनतम अपडेट्स
              </h2>
            </div>
            <p className="text-gray-600 text-lg mb-4">
              नवीन कार्यक्रम: <span className="text-blue-600 font-medium">{latestProgram.title}</span> - {latestProgram.date}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${latestProgram.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">प्रगती: {latestProgram.progress}%</p>
          </div>

          {/* Water Supply Card */}
          <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
            <div className="flex items-center mb-6">
              <svg
                className="w-10 h-10 text-blue-500 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 1.343-3 3v5a3 3 0 006 0v-5c0-1.657-1.343-3-3-3zm-9 9h18M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5"
                />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                पाणी पुरवठा
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              स्थिती: <span className={waterStatus === "उपलब्ध" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>{waterStatus}</span>
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">द्रुत दुवे</h3>
          <div className="flex justify-center space-x-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Report Issue Button */}
        <div className="mt-10 text-center">
          <Link
            to="/report"
            className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-bold py-4 px-10 rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
          >
            अस्वच्छ जागेची तक्रार नोंदवा
          </Link>
        </div>
      </div>

      {/* Custom Tailwind styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;