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

  const NewsletterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">📧</span>
            Church Newsletter
          </h1>

          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-4">Stay connected with the latest news, events, and spiritual encouragement from Pentecostal Holiness Church.</p>
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Newsletter</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">November 2025 Newsletter</p>
                  <p className="text-sm text-gray-600">Weekly updates and announcements</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  📥 Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DonationsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">💰</span>
            Support Our Ministry
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Make a Donation</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (R)</label>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[25, 50, 100, 200].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className={`p-2 rounded-lg border ${
                          donationAmount === amount ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        R{amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    placeholder="Custom amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={donationName}
                    onChange={(e) => setDonationName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={donationEmail}
                    onChange={(e) => setDonationEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleDonation}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Donate R{donationAmount}
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Donate?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🙏</span>
                  <div>
                    <h3 className="font-medium">Support Ministry Work</h3>
                    <p className="text-sm text-gray-600">Help us reach more people with the gospel</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <h3 className="font-medium">Maintain Our Facilities</h3>
                    <p className="text-sm text-gray-600">Keep our church building and programs running</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  <div>
                    <h3 className="font-medium">Help Those in Need</h3>
                    <p className="text-sm text-gray-600">Support community outreach and charity programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PastorPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">💬</span>
            Ask a Pastor
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Send a Message</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select a Pastor</label>
                  <select
                    value={selectedPastor}
                    onChange={(e) => setSelectedPastor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a pastor...</option>
                    {pastors.map(pastor => (
                      <option key={pastor.id} value={pastor.name}>{pastor.name} - {pastor.specialty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask your spiritual question here..."
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={anonymousMode}
                    onChange={(e) => setAnonymousMode(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">Send anonymously</label>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !selectedPastor}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Pastors</h2>
                <div className="grid gap-4">
                  {pastors.map(pastor => (
                    <div key={pastor.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
                      <img src={pastor.image} alt={pastor.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{pastor.name}</h3>
                        <p className="text-sm text-gray-600">{pastor.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Messages</h2>
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold text-gray-800">To: {message.pastor}</span>
                      {message.anonymous && <span className="ml-2 text-sm text-gray-500">(Anonymous)</span>}
                    </div>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{message.message}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      message.status === 'sent' ? 'bg-green-100 text-green-800' :
                      message.status === 'replied' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PastorRegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">👥</span>
            Pastor Registration
          </h1>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Join Our Pastoral Team</h2>
            <p className="text-gray-600 mb-6">We are always looking for dedicated servants of God to join our ministry team. Fill out the form below to express your interest in becoming a pastor at Pentecostal Holiness Church.</p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area of Interest</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select an area...</option>
                  <option value="youth">Youth Ministry</option>
                  <option value="women">Women's Ministry</option>
                  <option value="men">Men's Ministry</option>
                  <option value="children">Children's Ministry</option>
                  <option value="worship">Worship Ministry</option>
                  <option value="outreach">Community Outreach</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Educational Background</label>
                <textarea
                  placeholder="Please describe your educational background, theological training, and relevant experience..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join our pastoral team?</label>
                <textarea
                  placeholder="Share your calling and vision for ministry..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the church's terms and conditions for pastoral candidates
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const LiveStreamPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">📺</span>
            Live Stream
          </h1>

          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={currentVideo}
                  title="Live Stream"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Stream Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Weekly Service Times</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Sunday Worship</span>
                      <span>10:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wednesday Prayer</span>
                      <span>7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday Bible Study</span>
                      <span>6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Stream Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-gray-600">Stream: Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="text-gray-600">Recording: Off</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Join Our Online Community</h2>
              <p className="text-gray-600 mb-4">Can't make it to church in person? Join us online for live worship, prayer, and fellowship!</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  💬 Join Chat
                </button>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  🙏 Prayer Requests
                </button>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  📧 Newsletter Signup
                </button>
              </div>
            </div>
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
      case 'newsletter': return <NewsletterPage />;
      case 'donations': return <DonationsPage />;
      case 'pastor': return <PastorPage />;
      case 'pastorRegister': return <PastorRegisterPage />;
      case 'live': return <LiveStreamPage />;
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
