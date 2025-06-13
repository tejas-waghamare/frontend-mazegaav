import { useState, useEffect } from 'react';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    // Mock data (replace with API call: fetch('/api/programs'))
    const mockPrograms = [
      { id: 1, title: "ग्राम स्वच्छता अभियान", date: "१५ जून २०२५", time: "सकाळी १०:००", location: "ग्रामपंचायत सभागृह", description: "गाव स्वच्छ ठेवण्यासाठी सामुदायिक उपक्रम." },
      { id: 2, title: "पाणी व्यवस्थापन बैठक", date: "२० जून २०२५", time: "संध्याकाळी ५:००", location: "शाळा मैदान", description: "पाणी पुरवठा नियोजन." }
    ];
    setPrograms(mockPrograms);
  }, []);

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold text-center mb-4">ग्रामपंचायत कार्यक्रम</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFilter('upcoming')}
          className={`p-2 mx-2 rounded ${filter === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          आगामी
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`p-2 mx-2 rounded ${filter === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          भूतकाळातील
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {programs.map(program => (
          <div key={program.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{program.title}</h2>
            <p>दिनांक: {program.date}</p>
            <p>वेळ: {program.time}</p>
            <p>स्थळ: {program.location}</p>
            <p>{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;