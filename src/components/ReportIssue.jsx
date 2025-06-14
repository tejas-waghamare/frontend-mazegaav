// import { useState } from 'react';

// const ReportIssue = () => {
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [location, setLocation] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setPhoto(file);
//     setPreview(file ? URL.createObjectURL(file) : null);
//   };

//   const handleSubmit = async () => {
//     if (!description || !photo || !location) {
//       setMessage('कृपया वर्णन, फोटो आणि स्थान प्रविष्ट करा.');
//       setMessageType('error');
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('photo', photo);
//     formData.append('location', location);

//     // Assume API endpoint: /api/report (mocked for now)
//     try {
//       // const response = await fetch('/api/report', { method: 'POST', body: formData });
//       setTimeout(() => {
//         // Simulate API call
//         setMessage('तक्रार यशस्वीरित्या नोंदवली!');
//         setMessageType('success');
//         setDescription('');
//         setPhoto(null);
//         setPreview(null);
//         setLocation('');
//         setIsSubmitting(false);
//       }, 1000);
//     } catch (error) {
//       setMessage('तक्रार नोंदवण्यात अडचण: ' + error.message);
//       setMessageType('error');
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 pt-24">
//       {/* Header Section */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight drop-shadow-md animate-fade-in">
//           तक्रार नोंदवा
//         </h1>
//         <p className="text-lg md:text-xl text-gray-600 mt-2">
//           अस्वच्छ जागेची तक्रार जलद आणि सहज नोंदवा
//         </p>
//       </div>

//       {/* Form Section */}
//       <div className="max-w-lg mx-auto bg-white bg-opacity-15 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:scale-105">
//         <div className="space-y-6">
//           {/* Description Input */}
//           <div>
//             <label className="block text-lg font-semibold text-gray-700 mb-2">
//               वर्णन
//             </label>
//             <textarea
//               className="w-full p-4 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none"
//               placeholder="अस्वच्छ जागेचे वर्णन प्रविष्ट करा"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows="4"
//             />
//           </div>

//           {/* Location Input */}
//           <div>
//             <label className="block text-lg font-semibold text-gray-700 mb-2">
//               स्थान
//             </label>
//             <input
//               type="text"
//               className="w-full p-4 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
//               placeholder="स्थान प्रविष्ट करा (उदा. गावातील रस्ता, मैदान)"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//           </div>

//           {/* Photo Upload */}
//           <div>
//             <label className="block text-lg font-semibold text-gray-700 mb-2">
//               फोटो
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handlePhotoChange}
//               className="w-full p-4 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all duration-300"
//             />
//             {preview && (
//               <div className="mt-4">
//                 <img
//                   src={preview}
//                   alt="पूर्वावलोकन"
//                   className="w-full h-48 object-cover rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold py-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
//               isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin h-5 w-5 mr-3 text-white"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   />
//                 </svg>
//                 सबमिट करत आहे...
//               </div>
//             ) : (
//               'तक्रार सबमिट करा'
//             )}
//           </button>

//           {/* Message Display */}
//           {message && (
//             <div
//               className={`p-4 rounded-lg text-center text-lg font-semibold ${
//                 messageType === 'error'
//                   ? 'bg-red-100 text-red-700'
//                   : 'bg-green-100 text-green-700'
//               } animate-pulse`}
//             >
//               {message}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Custom Tailwind styles for animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fadeIn 1s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ReportIssue;


import { useState } from 'react';

const ReportIssue = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState('');
  const [audio, setAudio] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [activeSection, setActiveSection] = useState('report');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for reported and solved issues
  const reportedIssues = [
    { id: 1, description: 'रस्त्यावरील कचरा', location: 'मुख्य रस्ता', status: 'प्रलंबित', date: '2025-06-10' },
    { id: 2, description: 'मैदानातील घाण', location: 'गाव मैदान', status: 'प्रलंबित', date: '2025-06-12' },
  ];
  const solvedIssues = [
    { id: 3, description: 'नाल्यातील कचरा', location: 'गल्ली नं. ५', status: 'निराकरण झाले', date: '2025-06-08' },
  ];

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Start audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudio(audioBlob);
        setAudioPreview(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      setMessage('मायक्रोफोन उपलब्ध नाही किंवा परवानगी नाकारली: ' + error.message);
      setMessageType('error');
    }
  };

  // Stop audio recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Delete audio recording
  const deleteRecording = () => {
    setAudio(null);
    setAudioPreview(null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!description && !audio) {
      setMessage('कृपया वर्णन किंवा ऑडिओ रेकॉर्डिंग प्रविष्ट करा.');
      setMessageType('error');
      return;
    }
    if (!photo || !location) {
      setMessage('कृपया फोटो आणि स्थान प्रविष्ट करा.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    if (description) formData.append('description', description);
    if (audio) formData.append('audio', audio, 'recording.webm');
    formData.append('photo', photo);
    formData.append('location', location);

    try {
      // Simulate API call
      setTimeout(() => {
        setMessage('तक्रार यशस्वीरित्या नोंदवली!');
        setMessageType('success');
        setDescription('');
        setPhoto(null);
        setPreview(null);
        setLocation('');
        setAudio(null);
        setAudioPreview(null);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setMessage('तक्रार नोंदवण्यात अडचण: ' + error.message);
      setMessageType('error');
      setIsSubmitting(false);
    }
  };

  // Sub-component for issue lists
  const IssueList = ({ issues, title }) => (
    <div className="p-6 pt-24 min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 tracking-tight drop-shadow-lg animate-slide-in">
          {title}
        </h1>
      </div>
      <div className="max-w-3xl mx-auto">
        {issues.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">कोणताही डेटा उपलब्ध नाही</p>
        ) : (
          <div className="space-y-6">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-100 transform transition-all hover:scale-105 duration-300"
              >
                <h3 className="text-xl font-semibold text-amber-700">{issue.description}</h3>
                <p className="text-gray-600 mt-2"><strong>स्थान:</strong> {issue.location}</p>
                <p className="text-gray-600"><strong>स्थिती:</strong> {issue.status}</p>
                <p className="text-gray-600"><strong>तारीख:</strong> {issue.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Sub-component for profile
  const Profile = () => (
    <div className="p-6 pt-24 min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 tracking-tight drop-shadow-lg animate-slide-in">
          प्रोफाइल
        </h1>
      </div>
      <div className="max-w-lg mx-auto bg-white bg-opacity-20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-amber-700 mb-2">नाव</label>
            <p className="w-full p-4 bg-white bg-opacity-90 border border-gray-200 rounded-xl text-gray-800">
              Tejas
            </p>
          </div>
          <div>
            <label className="block text-lg font-semibold text-amber-700 mb-2">ईमेल</label>
            <p className="w-full p-4 bg-white bg-opacity-90 border border-gray-200 rounded-xl text-gray-800">
              tejas@example.com
            </p>
          </div>
          <button
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-bold py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => alert('प्रोफाइल संपादन यशस्वी!')}
            aria-label="प्रोफाइल संपादित करा"
          >
            प्रोफाइल संपादित करा
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed mt-21   inset-y-0 left-0 w-64 bg-gradient-to-b from-red-800 to-amber-700 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 animate-fade-in">तक्रार व्यवस्थापन</h2>
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveSection('report');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                activeSection === 'report' ? 'bg-amber-600 shadow-lg' : 'hover:bg-amber-700'
              }`}
              aria-label="तक्रार नोंदवा"
            >
              तक्रार नोंदवा
            </button>
            <button
              onClick={() => {
                setActiveSection('reported');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                activeSection === 'reported' ? 'bg-amber-600 shadow-lg' : 'hover:bg-amber-700'
              }`}
              aria-label="नोंदवलेल्या तक्रारी"
            >
              नोंदवलेल्या तक्रारी
            </button>
            <button
              onClick={() => {
                setActiveSection('solved');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                activeSection === 'solved' ? 'bg-amber-600 shadow-lg' : 'hover:bg-amber-700'
              }`}
              aria-label="निराकरण झालेल्या तक्रारी"
            >
              निराकरण झालेल्या तक्रारी
            </button>
            <button
              onClick={() => {
                setActiveSection('profile');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                activeSection === 'profile' ? 'bg-amber-600 shadow-lg' : 'hover:bg-amber-700'
              }`}
              aria-label="प्रोफाइल"
            >
              प्रोफाइल
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="साइडबार टॉगल करा"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {activeSection === 'report' && (
          <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6 pt-24">
            {/* Header Section */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 tracking-tight drop-shadow-lg animate-slide-in">
                तक्रार नोंदवा
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-3 animate-fade-in">
                अस्वच्छ जागेची तक्रार जलद आणि सहज नोंदवा
              </p>
            </div>

            {/* Form Section */}
            <div className="max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-100 transform transition-all hover:scale-105 duration-500">
              <div className="space-y-8">
                {/* Description Input */}
                <div>
                  <label className="block text-lg font-semibold text-amber-700 mb-3">
                    वर्णन (पर्यायी)
                  </label>
                  <textarea
                    className="w-full p-4 bg-white bg-opacity-90 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 resize-none shadow-sm"
                    placeholder="अस्वच्छ जागेचे वर्णन प्रविष्ट करा (पर्यायी)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    aria-label="वर्णन"
                  />
                </div>

                {/* Voice Recording */}
                <div>
                  <label className="block text-lg font-semibold text-amber-700 mb-3">
                    ऑडिओ रेकॉर्डिंग
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex-1 bg-gradient-to-r ${
                        isRecording ? 'from-red-600 to-red-700' : 'from-amber-500 to-orange-500'
                      } text-white text-lg font-bold py-3 rounded-xl hover:from-green-400 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                      disabled={isSubmitting}
                      aria-label={isRecording ? 'रेकॉर्डिंग थांबवा' : 'रेकॉर्डिंग सुरू करा'}
                    >
                      {isRecording ? 'रेकॉर्डिंग थांबवा' : 'रेकॉर्डिंग सुरू करा'}
                    </button>
                  </div>
                  {audioPreview && (
                    <div className="mt-4 space-y-2">
                      <audio
                        controls
                        src={audioPreview}
                        className="w-full rounded-lg shadow-md"
                        aria-label="ऑडिओ पूर्वावलोकन"
                      />
                      <button
                        onClick={deleteRecording}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-bold py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        aria-label="रेकॉर्डिंग हटवा"
                      >
                        रेकॉर्डिंग हटवा
                      </button>
                    </div>
                  )}
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-lg font-semibold text-amber-700 mb-3">
                    स्थान
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-white bg-opacity-90 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 shadow-sm"
                    placeholder="स्थान प्रविष्ट करा (उदा. गावातील रस्ता, मैदान)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    aria-label="स्थान"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-lg font-semibold text-amber-700 mb-3">
                    फोटो
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full p-4 bg-white bg-opacity-90 border border-gray-200 rounded-xl text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 transition-all duration-300 shadow-sm"
                    aria-label="फोटो अपलोड"
                  />
                  {preview && (
                    <div className="mt-4">
                      <img
                        src={preview}
                        alt="फोटो पूर्वावलोकन"
                        className="w-full h-64 object-cover rounded-xl shadow-md transform transition-all hover:scale-105 duration-300"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-bold py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label="तक्रार सबमिट करा"
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
                    className={`p-4 rounded-xl text-center text-lg font-semibold ${
                      messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    } animate-pulse`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activeSection === 'reported' && <IssueList issues={reportedIssues} title="नोंदवलेल्या तक्रारी" />}
        {activeSection === 'solved' && <IssueList issues={solvedIssues} title="निराकरण झालेल्या तक्रारी" />}
        {activeSection === 'profile' && <Profile />}
      </div>

      {/* Custom Tailwind styles for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReportIssue;