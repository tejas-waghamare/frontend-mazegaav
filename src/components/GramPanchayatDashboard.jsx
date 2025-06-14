import { useState } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF

const GramPanchayatDashboard = () => {
  // Mock data
  const initialIssues = [
    {
      id: 1,
      description: "गटार स्वच्छ करणे आवश्यक आहे",
      photo: "https://images.bhaskarassets.com/web2images/521/2022/06/16/6671b38e-faf3-4b42-96bf-a1796a86d1b3_1655374897813.jpg",
      date: "१२ जून २०२५",
      status: "Pending",
      comments: "",
      assignedTo: "",
    },
    {
      id: 2,
      description: "रस्त्यावरील कचरा साफ करावा",
      photo: "https://thumbs.dreamstime.com/b/dirt-road-lined-discarded-plastic-trash-stretching-distance-houses-portraying-scene-environmental-360874707.jpg",
      date: "१३ जून २०२५",
      status: "In Progress",
      comments: "कार्य सुरू झाले आहे",
      assignedTo: "Team A",
    },
  ];

  const initialWaterSupply = [
    { id: 1, day: "सोमवार", time: "सकाळी ६:०० - १०:००" },
    { id: 2, day: "मंगळवार", time: "सकाळी ६:०० - १०:००" },
  ];

  const initialActivities = [
    {
      id: 1,
      title: "ग्राम स्वच्छता अभियान",
      date: "१५ जून २०२५",
      time: "सकाळी १०:००",
      location: "ग्रामपंचायत सभागृह",
      description: "गाव स्वच्छ ठेवण्यासाठी सामुदायिक उपक्रम.",
    },
    {
      id: 2,
      title: "पाणी व्यवस्थापन बैठक",
      date: "२० जून २०२५",
      time: "संध्याकाळी ५:००",
      location: "शाळा मैदान",
      description: "पाणी पुरवठा नियोजन.",
    },
  ];

  const initialUsers = [
    { id: 1, name: "तेजस वाघमारे", role: "Member", contact: "9637540391" },
  ];

  const [issues, setIssues] = useState(initialIssues);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');
  const [waterSupply, setWaterSupply] = useState(initialWaterSupply);
  const [activities, setActivities] = useState(initialActivities);
  const [users, setUsers] = useState(initialUsers);
  const [notifications, setNotifications] = useState([]);
  const [newWaterSupply, setNewWaterSupply] = useState({ day: '', time: '' });
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [newUser, setNewUser] = useState({ name: '', role: '', contact: '' });
  const [activeSection, setActiveSection] = useState('issues');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [toast, setToast] = useState({ message: '', visible: false });

  // Calculate summary statistics for issues
  const totalIssues = issues.length;
  const pendingIssues = issues.filter(issue => issue.status === 'Pending').length;
  const inProgressIssues = issues.filter(issue => issue.status === 'In Progress').length;
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved').length;

  // Filter and sort issues
  const filteredIssues = issues.filter(issue => {
    const matchesStatus = filterStatus === 'All' || issue.status === filterStatus; // Fixed typo: 'issue - issue.status' to 'issue.status'
    const matchesSearch = issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  }).sort((a, b) => {
    const dateA = new Date(a.date.split(' ').reverse().join('-'));
    const dateB = new Date(b.date.split(' ').reverse().join('-'));
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Filter water supply by search query
  const filteredWaterSupply = waterSupply.filter(slot =>
    slot.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
    slot.time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter activities by search query and date range
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const activityDate = new Date(activity.date.split(' ').reverse().join('-'));
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    const matchesDateRange = (!startDate || activityDate >= startDate) && (!endDate || activityDate <= endDate);
    return matchesSearch && matchesDateRange;
  });

  // Show toast notification
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  // Handle status update for issues
  const handleStatusChange = (id, newStatus) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    showToast(`तक्रार क्रमांक ${id} ची स्थिती अपडेट झाली: ${newStatus === 'Pending' ? 'प्रलंबित' : newStatus === 'In Progress' ? 'प्रगतीत' : 'निराकरण झाले'}`);
  };

  // Handle comments update for issues
  const handleCommentChange = (id, comment) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, comments: comment } : issue
    ));
  };

  // Handle task assignment for issues
  const handleAssignTask = (id, assignedTo) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, assignedTo } : issue
    ));
    showToast(`तक्रार क्रमांक ${id} ${assignedTo} ला नियुक्त केली गेली`);
  };

  // Handle adding/updating water supply schedule
  const handleWaterSupplySubmit = () => {
    if (!newWaterSupply.day || !newWaterSupply.time) return;
    const newEntry = {
      id: waterSupply.length + 1,
      day: newWaterSupply.day,
      time: newWaterSupply.time,
    };
    setWaterSupply([...waterSupply, newEntry]);
    setNotifications([
      ...notifications,
      `पाणी पुरवठा वेळापत्रक अपडेट: ${newWaterSupply.day} - ${newWaterSupply.time}`,
    ]);
    setNewWaterSupply({ day: '', time: '' });
    showToast(`नवीन पाणी पुरवठा वेळापत्रक जोडले: ${newWaterSupply.day} - ${newWaterSupply.time}`);
  };

  // Handle adding new activity
  const handleActivitySubmit = () => {
    if (!newActivity.title || !newActivity.date || !newActivity.time) return;
    const newEntry = {
      id: activities.length + 1,
      title: newActivity.title,
      date: newActivity.date,
      time: newActivity.time,
      location: newActivity.location,
      description: newActivity.description,
    };
    setActivities([...activities, newEntry]);
    setNotifications([
      ...notifications,
      `नवीन कार्यक्रम जोडला: ${newActivity.title} - ${newActivity.date}`,
    ]);
    setNewActivity({ title: '', date: '', time: '', location: '', description: '' });
    showToast(`नवीन कार्यक्रम जोडला: ${newActivity.title} - ${newActivity.date}`);
  };

  // Handle adding new user
  const handleUserSubmit = () => {
    if (!newUser.name || !newUser.role || !newUser.contact) return;
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

  // Handle dismissing notifications
  const handleDismissNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  // Handle clearing all notifications
  const handleClearNotifications = () => {
    setNotifications([]);
    showToast('सर्व सूचना काढल्या गेल्या');
  };

  // Export data as PDF
  const exportToPDF = (data, filename, headers, title) => {
    const doc = new jsPDF();
    let yOffset = 10;

    // Add title
    doc.setFontSize(16);
    doc.text(title, 10, yOffset);
    yOffset += 10;

    // Add headers
    doc.setFontSize(12);
    doc.text(headers.join('  '), 10, yOffset);
    yOffset += 10;

    // Add data rows
    doc.setFontSize(10);
    data.forEach((item, index) => {
      const row = headers.map(header => {
        const key = header.toLowerCase().replace(/\s/g, '');
        return item[key] || item[header] || '-';
      });
      doc.text(row.join('  '), 10, yOffset + (index * 10));
    });

    // Save the PDF
    doc.save(filename);
    showToast(`${filename} यशस्वीरित्या डाउनलोड झाले`);
  };

  // Debug logs
  console.log('Active Section:', activeSection);
  console.log('Users:', users);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex">
      {/* Sidebar */}
      <div
        className={`fixed top-16 bottom-0 left-0 bg-gradient-to-b from-green-800 to-green-900 text-white w-64 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:top-0 md:bottom-0 z-40 overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h2 className="text-2xl mt-5 font-bold">ग्रामपंचायत</h2>
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveSection('issues')}
            className={`w-full flex items-center p-4 hover:bg-green-700 transition-colors ${
              activeSection === 'issues' ? 'bg-orange-700 shadow-glow' : ''
            }`}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            तक्रारी
          </button>
          <button
            onClick={() => setActiveSection('waterSupply')}
            className={`w-full flex items-center p-4 hover:bg-green-700 transition-colors ${
              activeSection === 'waterSupply' ? 'bg-orange-700 shadow-glow' : ''
            }`}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3v5a3 3 0 006 0v-5c0-1.657-1.343-3-3-3zm-9 9h18M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5" />
            </svg>
            पाणी पुरवठा
          </button>
          <button
            onClick={() => setActiveSection('activities')}
            className={`w-full flex items-center p-4 hover:bg-green-700 transition-colors ${
              activeSection === 'activities' ? 'bg-orange-700 shadow-glow' : ''
            }`}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            कार्यक्रम
          </button>
          <button
            onClick={() => setActiveSection('notifications')}
            className={`w-full flex items-center p-4 hover:bg-green-700 transition-colors ${
              activeSection === 'notifications' ? 'bg-orange-700 shadow-glow' : ''
            }`}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            सूचना
          </button>
          <button
            onClick={() => setActiveSection('users')}
            className={`w-full flex items-center p-4 hover:bg-green-700 transition-colors ${
              activeSection === 'users' ? 'bg-orange-700 shadow-glow' : ''
            }`}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            वापरकर्ते
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-6 mt-16 overflow-y-auto">
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden mb-4 p-2 bg-green-700 text-white rounded-lg shadow-glow"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Toast Notification */}
        {toast.visible && (
          <div className="fixed top-20 right-4 bg-green-700 text-white p-4 rounded-lg shadow-lg z-60 animate-fade-in">
            {toast.message}
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-100 mb-8 text-center md:text-left">
          ग्रामपंचायत डॅशबोर्ड
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="शोधा (उदा. तक्रार, वेळापत्रक, कार्यक्रम)"
            className="w-full md:w-1/2 p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
          />
        </div>

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-100 flex items-center">
                <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                सूचना
              </h2>
              {notifications.length > 0 && (
                <button
                  onClick={handleClearNotifications}
                  className="bg-red-700 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  सर्व काढा
                </button>
              )}
            </div>
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification, index) => (
                  <li key={index} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg shadow-sm text-gray-200">
                    <span>{notification}</span>
                    <button
                      onClick={() => handleDismissNotification(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-lg">कोणत्याही सूचना नाहीत.</p>
            )}
          </div>
        )}

        {/* Water Supply Section */}
        {activeSection === 'waterSupply' && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-100 flex items-center">
                <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3v5a3 3 0 006 0v-5c0-1.657-1.343-3-3-3zm-9 9h18M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5" />
                </svg>
                पाणी पुरवठा व्यवस्थापन
              </h2>
              <button
                onClick={() => exportToPDF(filteredWaterSupply, 'water-supply-schedule.pdf', ['दिवस', 'वेळ'], 'पाणी पुरवठा वेळापत्रक')}
                className="bg-gradient-to-r from-green-700 to-green-900 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-glow"
              >
                PDF म्हणून डाउनलोड करा
              </button>
            </div>
            {/* Current Water Supply Schedule */}
            <h3 className="text-xl font-medium text-gray-200 mb-4">सध्याचे वेळापत्रक</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3 text-left text-gray-200">दिवस</th>
                    <th className="p-3 text-left text-gray-200">वेळ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWaterSupply.map((slot) => (
                    <tr key={slot.id} className="border-b border-gray-600 hover:bg-gray-600">
                      <td className="p-3 text-gray-300">{slot.day}</td>
                      <td className="p-3 text-gray-300">{slot.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Water Supply Schedule */}
            <h3 className="text-xl font-medium text-gray-200 mt-6 mb-4">नवीन वेळापत्रक जोडा</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={newWaterSupply.day}
                onChange={(e) =>
                  setNewWaterSupply({ ...newWaterSupply, day: e.target.value })
                }
                placeholder="दिवस (उदा. सोमवार)"
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 placeholder-gray-400"
              />
              <input
                type="text"
                value={newWaterSupply.time}
                onChange={(e) =>
                  setNewWaterSupply({ ...newWaterSupply, time: e.target.value })
                }
                placeholder="वेळ (उदा. सकाळी ६:०० - १०:००)"
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 placeholder-gray-400"
              />
              <button
                onClick={handleWaterSupplySubmit}
                className="bg-gradient-to-r from-green-700 to-green-900 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-glow"
              >
                जोडा
              </button>
            </div>
          </div>
        )}

        {/* Activities Section */}
        {activeSection === 'activities' && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-100 flex items-center">
                <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                कार्यक्रम व्यवस्थापन
              </h2>
              <button
                onClick={() => exportToPDF(filteredActivities, 'activities.pdf', ['शीर्षक', 'दिनांक', 'वेळ', 'स्थळ', 'वर्णन'], 'कार्यक्रम')}
                className="bg-gradient-to-r from-green-700 to-green-900 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-glow"
              >
                PDF म्हणून डाउनलोड करा
              </button>
            </div>
            {/* Date Range Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Current Activities */}
            <h3 className="text-xl font-medium text-gray-200 mb-4">सध्याचे कार्यक्रम</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3 text-left text-gray-200">शीर्षक</th>
                    <th className="p-3 text-left text-gray-200">दिनांक</th>
                    <th className="p-3 text-left text-gray-200">वेळ</th>
                    <th className="p-3 text-left text-gray-200">स्थळ</th>
                    <th className="p-3 text-left text-gray-200">वर्णन</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-600 hover:bg-gray-600">
                      <td className="p-3 text-gray-300">{activity.title}</td>
                      <td className="p-3 text-gray-300">{activity.date}</td>
                      <td className="p-3 text-gray-300">{activity.time}</td>
                      <td className="p-3 text-gray-300">{activity.location}</td>
                      <td className="p-3 text-gray-300">{activity.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Activity */}
            <h3 className="text-xl font-medium text-gray-200 mt-6 mb-4">नवीन कार्यक्रम जोडा</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={newActivity.title}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, title: e.target.value })
                }
                placeholder="शीर्षक"
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              />
              <input
                type="text"
                value={newActivity.date}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, date: e.target.value })
                }
                placeholder="दिनांक (उदा. १५ जून २०२५)"
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              />
              <input
                type="text"
                value={newActivity.time}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, time: e.target.value })
                }
                placeholder="वेळ (उदा. सकाळी १०:००)"
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              />
              <input
                type="text"
                value={newActivity.location}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, location: e.target.value })
                }
                placeholder="स्थळ"
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              />
              <textarea
                value={newActivity.description}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, description: e.target.value })
                }
                placeholder="वर्णन"
                className="p-3 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                rows="3"
              />
              <button
                onClick={handleActivitySubmit}
                className="bg-gradient-to-r from-green-700 to-green-900 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-glow"
              >
                जोडा
              </button>
            </div>
          </div>
        )}

        {/* Issues Section */}
        {activeSection === 'issues' && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-100 flex items-center">
                <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                नोंदवलेल्या तक्रारी
              </h2>
              <button
                onClick={() => exportToPDF(filteredIssues, 'issues.pdf', ['ID', 'वर्णन', 'दिनांक', 'स्थिती', 'टिप्पण्या', 'नियुक्त'], 'नोंदवलेल्या तक्रारी')}
                className="bg-gradient-to-r from-green-700 to-green-900 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-glow"
              >
                PDF म्हणून डाउनलोड करा
              </button>
            </div>
            {/* Summary Statistics */}
            <div className="mb-6 ">
              <h3 className="text-xl font-medium text-gray-200 mb-4">तक्रारींचा सारांश</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-700 to-green-800 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-gray-200">एकूण तक्रारी</p>
                  <p className="text-2xl font-bold text-green-400">{totalIssues}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-700 to-yellow-800 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-gray-200">प्रलंबित</p>
                  <p className="text-2xl font-bold text-yellow-400">{pendingIssues}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-700 to-orange-800 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-gray-200">प्रगतीत</p>
                  <p className="text-2xl font-bold text-orange-400">{inProgressIssues}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-700 to-green-800 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-gray-200">निराकरण झाले</p>
                  <p className="text-2xl font-bold text-green-400">{resolvedIssues}</p>
                </div>
              </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <label className="text-lg font-medium text-gray-200">स्थिती फिल्टर:</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All">सर्व</option>
                  <option value="Pending">प्रलंबित</option>
                  <option value="In Progress">प्रगतीत</option>
                  <option value="Resolved">निराकरण झाले</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-lg font-medium text-gray-200">तारीख क्रम:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="p-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="desc">नवीन ते जुने</option>
                  <option value="asc">जुने ते नवीन</option>
                </select>
              </div>
            </div>

            {/* Issues List */}
            <div className="space-y-6">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="p-6 bg-gray-700 rounded-lg overflow-auto shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={issue.photo}
                      alt="Reported Issue"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-lg text-gray-200 mb-2">{issue.description}</p>
                      <p className="text-sm text-gray-400 mb-2">
                        नोंदवण्याची तारीख: {issue.date}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-medium text-gray-200">स्थिती:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            issue.status === 'Pending'
                              ? 'bg-yellow-700 text-yellow-200'
                              : issue.status === 'In Progress'
                              ? 'bg-orange-700 text-orange-200'
                              : 'bg-green-700 text-green-200'
                          }`}
                        >
                          {issue.status === 'Pending' ? 'प्रलंबित' : issue.status === 'In Progress' ? 'प्रगतीत' : 'निराकरण झाले'}
                        </span>
                        <select
                          value={issue.status}
                          onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                          className="p-1 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="Pending">प्रलंबित</option>
                          <option value="In Progress">प्रगतीत</option>
                          <option value="Resolved">निराकरण झाले</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-medium text-gray-200">नियुक्त:</span>
                        <span className="text-gray-300">{issue.assignedTo || 'कोणालाही नाही'}</span>
                        <select
                          value={issue.assignedTo}
                          onChange={(e) => handleAssignTask(issue.id, e.target.value)}
                          className="p-1 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">कोणालाही नाही</option>
                          {users.map(user => (
                            <option key={user.id} value={user.name}>{user.name}</option>
                          ))}
                          <option value="Team A">Team A</option>
                          <option value="Team B">Team B</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <label className="text-lg font-medium text-gray-200">टिप्पण्या:</label>
                        <textarea
                          value={issue.comments}
                          onChange={(e) => handleCommentChange(issue.id, e.target.value)}
                          className="w-full p-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                          placeholder="टिप्पण्या प्रविष्ट करा"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Management Section */}
        {activeSection === 'users' && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-100 flex items-center">
                <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                वापरकर्ते व्यवस्थापन
              </h2>
              <button
                onClick={() => exportToPDF(users, 'users.pdf', ['नाव', 'भूमिका', 'संपर्क'], 'वापरकर्ते यादी')}
                className="bg-gradient-to-r from-green-700 to-green-900 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-glow"
              >
                PDF म्हणून डाउनलोड करा
              </button>
            </div>
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
        )}
      </div>
    </div>
  );
};

export default GramPanchayatDashboard;