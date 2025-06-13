import { useState } from 'react';

const ReportIssue = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async () => {
    if (!description || !photo || !location) {
      setMessage('कृपया वर्णन, फोटो आणि स्थान प्रविष्ट करा.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('location', location);

    // Assume API endpoint: /api/report (mocked for now)
    try {
      // const response = await fetch('/api/report', { method: 'POST', body: formData });
      setTimeout(() => {
        // Simulate API call
        setMessage('तक्रार यशस्वीरित्या नोंदवली!');
        setMessageType('success');
        setDescription('');
        setPhoto(null);
        setPreview(null);
        setLocation('');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setMessage('तक्रार नोंदवण्यात अडचण: ' + error.message);
      setMessageType('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 pt-24">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight drop-shadow-md animate-fade-in">
          तक्रार नोंदवा
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          अस्वच्छ जागेची तक्रार जलद आणि सहज नोंदवा
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-lg mx-auto bg-white bg-opacity-15 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:scale-105">
        <div className="space-y-6">
          {/* Description Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              वर्णन
            </label>
            <textarea
              className="w-full p-4 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none"
              placeholder="अस्वच्छ जागेचे वर्णन प्रविष्ट करा"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              स्थान
            </label>
            <input
              type="text"
              className="w-full p-4 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="स्थान प्रविष्ट करा (उदा. गावातील रस्ता, मैदान)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              फोटो
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full p-4 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all duration-300"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="पूर्वावलोकन"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold py-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                सबमिट करत आहे...
              </div>
            ) : (
              'तक्रार सबमिट करा'
            )}
          </button>

          {/* Message Display */}
          {message && (
            <div
              className={`p-4 rounded-lg text-center text-lg font-semibold ${
                messageType === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              } animate-pulse`}
            >
              {message}
            </div>
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

export default ReportIssue;