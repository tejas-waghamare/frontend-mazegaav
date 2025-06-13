import { useState, useEffect } from 'react';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock data (replace with API call: fetch('/api/programs'))
    const mockPrograms = [
      { id: 1, title: "ग्राम स्वच्छता अभियान", date: "१५ जून २०२५", time: "सकाळी १०:००", location: "ग्रामपंचायत सभागृह", description: "गाव स्वच्छ ठेवण्यासाठी सामुदायिक उपक्रम.", progress: 60 },
      { id: 2, title: "पाणी व्यवस्थापन बैठक", date: "२० जून २०२५", time: "संध्याकाळी ५:००", location: "शाळा मैदान", description: "पाणी पुरवठा नियोजन.", progress: 30 },
    ];
    setPrograms(mockPrograms);
  }, []);

  // Filter programs based on filter type and search query
  const filteredPrograms = programs.filter(program => {
    const isUpcoming = new Date(program.date.split(' ').reverse().join('-')) >= new Date('2025-06-14');
    return (
      (filter === 'upcoming' ? isUpcoming : !isUpcoming) &&
      program.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 pt-24">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight drop-shadow-md animate-fade-in">
          ग्रामपंचायत कार्यक्रम
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">आमच्या गावातील नवीनतम आणि भूतकाळातील कार्यक्रम पहा</p>
      </div>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              filter === 'upcoming'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
            }`}
          >
            आगामी
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              filter === 'past'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
            }`}
          >
            भूतकाळातील
          </button>
        </div>
        <div className="w-full md:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            placeholder="कार्यक्रम शोधा..."
          />
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map(program => (
            <div
              key={program.id}
              className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-wide">{program.title}</h2>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
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
                  दिनांक: {program.date}
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
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
                  वेळ: {program.time}
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  स्थळ: {program.location}
                </p>
                <p className="text-gray-500">{program.description}</p>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${program.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">प्रगती: {program.progress}%</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-full">
            कोणतेही कार्यक्रम सापडले नाहीत
          </p>
        )}
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

export default Programs;