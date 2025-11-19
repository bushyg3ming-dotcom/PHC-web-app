import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Sunday Service This Weekend', date: 'Nov 16, 2025', content: 'Join us for our weekly worship service with Pastor Kater. Special music and testimonies.' },
    { id: 2, title: 'Youth Group Meeting', date: 'Nov 18, 2025', content: 'Youth group meeting in Fellowship Hall at 7 PM. Bring a friend!' },
    { id: 3, title: 'Women\'s Ministry Retreat', date: 'Dec 5-7, 2025', content: 'Annual women\'s retreat at the conference center. Register by Nov 25.' }
  ]);

  const [donationAmount, setDonationAmount] = useState(50);
  const [donationName, setDonationName] = useState('');
  const [donationEmail, setDonationEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPastor, setSelectedPastor] = useState('');
  const [currentVideo, setCurrentVideo] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [events, setEvents] = useState([
    { id: 1, title: 'Youth Camp', date: 'Dec 15-17, 2025', description: 'Annual youth camp with worship, games, and fellowship.', image: 'https://placehold.co/600x400/4f46e5/white?text=Youth+Camp' },
    { id: 2, title: 'Women\'s Retreat', date: 'Jan 10-12, 2026', description: 'Annual women\'s retreat with workshops and prayer sessions.', image: 'https://placehold.co/600x400/ec4899/white?text=Women%27s+Retreat' }
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', image: null });
  const [anonymousMode, setAnonymousMode] = useState(false);

  const pastors = [
    { id: 1, name: 'Pastor Graham Kater', specialty: 'Youth Ministry', image: 'https://placehold.co/150x150/4f46e5/white?text=PW' },
    { id: 2, name: 'Pastor Sarah Johnson', specialty: 'Women\'s Ministry', image: 'https://placehold.co/150x150/ec4899/white?text=SJ' },
    { id: 3, name: 'Pastor Michael Brown', specialty: 'Men\'s Ministry', image: 'https://placehold.co/150x150/0ea5e9/white?text=MB' },
    { id: 4, name: 'Pastor Lisa Davis', specialty: 'Children\'s Ministry', image: 'https://placehold.co/150x150/10b981/white?text=LD' }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedPastor) {
      const message = {
        id: messages.length + 1,
        pastor: selectedPastor,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        status: 'sent',
        anonymous: anonymousMode
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setAnonymousMode(false);
    }
  };

  const handleDonation = () => {
    alert(`Thank you for your donation of R${donationAmount}! Your payment will be processed through PayFast.`);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.description) {
      const event = {
        id: events.length + 1,
        title: newEvent.title,
        date: newEvent.date,
        description: newEvent.description,
        image: newEvent.image || 'https://placehold.co/600x400/4f46e5/white?text=Event+Photo'
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', description: '', image: null });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewEvent({ ...newEvent, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const Navigation = () => (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-yellow-400">❤️</span>
            <span className="text-xl font-bold hidden sm:block">Pentecostal Holiness Church</span>
            <span className="text-xl font-bold sm:hidden">PHC</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { id: 'home', label: 'Home', icon: '❤️' },
              { id: 'events', label: 'Events', icon: '📅' },
              { id: 'announcements', label: 'Announcements', icon: '📢' },
              { id: 'newsletter', label: 'Newsletter', icon: '📧' },
              { id: 'donations', label: 'Donations', icon: '💰' },
              { id: 'pastor', label: 'Ask a Pastor', icon: '💬' },
              { id: 'pastorRegister', label: 'Pastor Register', icon: '👥' },
              { id: 'live', label: 'Live Stream', icon: '📺' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <span className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-700">
            {[
              { id: 'home', label: 'Home', icon: '❤️' },
              { id: 'events', label: 'Events', icon: '📅' },
              { id: 'announcements', label: 'Announcements', icon: '📢' },
              { id: 'newsletter', label: 'Newsletter', icon: '📧' },
              { id: 'donations', label: 'Donations', icon: '💰' },
              { id: 'pastor', label: 'Ask a Pastor', icon: '💬' },
              { id: 'pastorRegister', label: 'Pastor Register', icon: '👥' },
              { id: 'live', label: 'Live Stream', icon: '📺' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pentecostal Holiness Church</h1>
          <p className="text-xl text-gray-600 mb-6">Where Faith Meets Community</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl mb-2">🕐</div>
              <h3 className="font-semibold text-lg">Service Times</h3>
              <p>Sunday: 10:00 AM</p>
              <p>Wednesday: 7:00 PM</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-lg">Location</h3>
              <p>5 Frederick Street, Davidsonville</p>
              <p>Roodepoort, 1724</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold text-lg">Contact</h3>
              <p>(011) 234-5678</p>
              <p>info@phc.org.za</p>
            </div>
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Announcements</h2>
          <div className="space-y-4">
            {announcements.slice(0, 3).map(ann => (
              <div key={ann.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-lg">{ann.title}</h3>
                <p className="text-gray-600 text-sm">{ann.date}</p>
                <p className="text-gray-700">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <span>📅</span>
                <div>
                  <h3 className="font-semibold">Youth Camp</h3>
                  <p className="text-sm text-gray-600">Dec 15-17, 2025</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                <span>📖</span>
                <div>
                  <h3 className="font-semibold">Bible Study</h3>
                  <p className="text-sm text-gray-600">Every Tuesday 6:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Stream</h2>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-6xl">▶️</span>
            </div>
            <p className="text-center mt-4 text-gray-600">Join our live service every Sunday at 9:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );

  const EventsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">📅</span>
            Church Events
          </h1>

          {/* Add New Event Form */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Event</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Event Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                <input
                  type="text"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  placeholder="Event Date (e.g. Dec 15-17, 2025)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Event Description"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Photo</label>
                <div className="flex items-center space-x-4">
                  {newEvent.image && (
                    <img src={newEvent.image} alt="Event Preview" className="w-24 h-24 object-cover rounded-lg border" />
                  )}
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      <span className="mr-2">📷</span>
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  onClick={handleAddEvent}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.date}</p>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AnnouncementsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">📢</span>
            Church Announcements
          </h1>

          <div className="space-y-6">
            {announcements.map(ann => (
              <div key={ann.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{ann.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {ann.date}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'events': return <EventsPage />;
      case 'announcements': return <AnnouncementsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderPage()}

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pentecostal Holiness Church</h3>
              <p className="text-blue-200">Where faith meets community and God's love transforms lives.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <p className="text-blue-200">5 Frederick Street, Davidsonville</p>
              <p className="text-blue-200">Roodepoort, 1724</p>
              <p className="text-blue-200">(011) 234-5678</p>
              <p className="text-blue-200">info@phc.org.za</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Times</h3>
              <p className="text-blue-200">Sunday: 10:00 AM</p>
              <p className="text-blue-200">Wednesday: 7:00 PM</p>
              <p className="text-blue-200">Prayer Meeting: Friday 6:00 PM</p>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2025 Pentecostal Holiness Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
