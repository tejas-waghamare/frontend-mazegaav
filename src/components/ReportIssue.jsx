import { useState } from 'react';

const ReportIssue = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async () => {
    if (!description || !photo) {
      setMessage('कृपया वर्णन आणि फोटो जोडा.');
      setMessageType('error');
      return;
    }
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    // Assume API endpoint: /api/report (mocked for now)
    try {
      // const response = await fetch('/api/report', { method: 'POST', body: formData });
      setMessage('तक्रार यशस्वीरित्या नोंदवली!');
      setMessageType('success');
      setDescription('');
      setPhoto(null);
      setPreview(null);
    } catch (error) {
      setMessage('तक्रार नोंदवण्यात अडचण: ' + error.message);
      setMessageType('error');
    }
  };

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold text-center mb-4">तक्रार नोंदवा</h1>
      <div className="flex flex-col gap-4">
        <textarea
          className="border p-2 rounded-lg w-full"
          placeholder="अस्वच्छ जागेचे वर्णन"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="border p-2 rounded-lg"
        />
        {preview && <img src={preview} alt="पूर्वावलोकन" className="w-full h-48 object-cover rounded-lg mt-2" />}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-600"
        >
          तक्रार सबमिट करा
        </button>
        {message && (
          <div className={`p-4 rounded-lg text-center ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;