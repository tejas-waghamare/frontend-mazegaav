import { Link } from 'react-router-dom';

const HomePage = () => {
  // Mock data for display
  const latestProgram = { title: "ग्राम स्वच्छता अभियान", date: "१५ जून २०२५" };
  const waterStatus = "उपलब्ध";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 pt-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
          माझे गाव
        </h1>
        <p className="text-lg md:text-xl font-medium">
          तुमच्या गावातील नवीनतम अपडेट्स आणि सेवा
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Program Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-blue-500 mr-3"
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
              <h2 className="text-2xl font-semibold text-gray-800">
                नवीनतम अपडेट्स
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              नवीन कार्यक्रम: {latestProgram.title} - {latestProgram.date}
            </p>
          </div>

          {/* Water Supply Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-blue-500 mr-3"
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
              <h2 className="text-2xl font-semibold text-gray-800">
                पाणी पुरवठा
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              स्थिती: <span className={waterStatus === "उपलब्ध" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>{waterStatus}</span>
            </p>
          </div>
        </div>

        {/* Report Issue Button */}
        <div className="mt-8 text-center">
          <Link
            to="/report"
            className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white text-xl font-semibold py-4 px-8 rounded-full hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            अस्वच्छ जागेची तक्रार नोंदवा
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;