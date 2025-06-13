import { useState, useEffect } from 'react';

const WaterSupply = () => {
  const [waterData, setWaterData] = useState({ status: '', schedule: [] });
  const [searchDay, setSearchDay] = useState('');

  useEffect(() => {
    // Mock data (replace with API call: fetch('/api/water-supply'))
    const mockWaterSupply = {
      status: "उपलब्ध",
      schedule: [
        { day: "सोमवार", time: "सकाळी ६:०० - १०:००", availability: "उपलब्ध" },
        { day: "मंगळवार", time: "सकाळी ६:०० - १०:००", availability: "उपलब्ध" },
        { day: "बुधवार", time: "सकाळी ७:०० - ११:००", availability: "मर्यादित" },
        { day: "गुरुवार", time: "सकाळी ६:०० - १०:००", availability: "उपलब्ध" },
        { day: "शुक्रवार", time: "सकाळी ६:०० - १०:००", availability: "बंद" },
      ],
    };
    setWaterData(mockWaterSupply);
  }, []);

  // Filter schedule based on search query
  const filteredSchedule = waterData.schedule.filter(slot =>
    slot.day.toLowerCase().includes(searchDay.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 pt-24">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight drop-shadow-md animate-fade-in">
          पाणी पुरवठा
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          गावातील पाणी पुरवठा स्थिती आणि वेळापत्रक
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchDay}
          onChange={(e) => setSearchDay(e.target.value)}
          className="w-full max-w-md p-3 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          placeholder="दिवस शोधा (उदा. सोमवार)"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-15 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:scale-105">
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
              पाणी पुरवठा स्थिती: 
              <span className={`ml-2 ${
                waterData.status === "उपलब्ध" ? "text-green-500" : 
                waterData.status === "मर्यादित" ? "text-yellow-500" : 
                "text-red-500"
              } font-semibold`}>
                {waterData.status}
              </span>
            </h2>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">वेळापत्रक</h3>
          {filteredSchedule.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSchedule.map((slot, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-700">{slot.day}</p>
                      <p className="text-gray-600">{slot.time}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        slot.availability === "उपलब्ध" ? "bg-green-100 text-green-600" :
                        slot.availability === "मर्यादित" ? "bg-yellow-100 text-yellow-600" :
                        "bg-red-100 text-red-600"
                      }`}
                    >
                      {slot.availability}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              कोणतेही वेळापत्रक सापडले नाही
            </p>
          )}
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

export default WaterSupply;