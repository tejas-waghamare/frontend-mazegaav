import React from 'react';

const Users = ({ users, setUsers, newUser, setNewUser, showToast }) => {
  // Handle adding new user
  const handleUserSubmit = () => {
    if (!newUser.name || !newUser.role || !newUser.contact) {
      showToast('कृपया सर्व फील्ड भरा.');
      return;
    }
    const newEntry = {
      id: users.length + 1,
      name: newUser.name,
      role: newUser.role,
      contact: newUser.contact,
    };
    setUsers([...users, newEntry]);
    setNewUser({ name: '', role: '', contact: '' });
    showToast(`नवीन वापरकर्ता जोडला: ${newEntry.name}`);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300 min-h-[400px]">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6 flex items-center">
        <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        वापरकर्ते व्यवस्थापन
      </h2>
      {/* Current Users */}
      <h3 className="text-xl font-medium text-gray-200 mb-4">सध्याचे वापरकर्ते</h3>
      <div className="overflow-x-auto">
        {users && users.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left text-gray-200">नाव</th>
                <th className="p-3 text-left text-gray-200">भूमिका</th>
                <th className="p-3 text-left text-gray-200">संपर्क</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-600 hover:bg-gray-600">
                  <td className="p-3 text-gray-300">{user.name}</td>
                  <td className="p-3 text-gray-300">{user.role}</td>
                  <td className="p-3 text-gray-300">{user.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400 text-lg">कोणतेही वापरकर्ते उपलब्ध नाहीत.</p>
        )}
      </div>

      {/* Add New User */}
      <h3 className="text-xl font-medium text-gray-200 mt-6 mb-4">नवीन वापरकर्ता जोडा</h3>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="नाव"
          className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <input
          type="text"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          placeholder="भूमिका (उदा. Member, Sarpanch)"
          className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <input
          type="text"
          value={newUser.contact}
          onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })}
          placeholder="संपर्क क्रमांक"
          className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <button
          onClick={handleUserSubmit}
          className="bg-gradient-to-r from-green-700 to-green-900 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-glow"
        >
          जोडा
        </button>
      </div>
    </div>
  );
};

export default Users;