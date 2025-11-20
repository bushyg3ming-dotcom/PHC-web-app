import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  // Admin state
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', date: '', content: '' });
  const [newsletterFile, setNewsletterFile] = useState(null);
  const [newsletterFileName, setNewsletterFileName] = useState('November 2025 Newsletter');
  const [currentVideoUrl, setCurrentVideoUrl] = useState(localStorage.getItem('currentVideoUrl') || 'https://www.youtube.com/embed/dQw4w9WgXcQ');

  // Handler functions
  const handleAddAnnouncement = async () => {
    if (newAnnouncement.title && newAnnouncement.date && newAnnouncement.content) {
      try {
        await fetch(`${API_BASE}/announcements`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAnnouncement),
        });
        alert('Announcement added successfully!');
        setNewAnnouncement({ title: '', date: '', content: '' });
        fetchAnnouncements(); // Refresh the list
      } catch (error) {
        console.error('Error adding announcement:', error);
        alert('Failed to add announcement. Please try again.');
      }
    }
  };

  const handleNewsletterUpload = async () => {
    if (newsletterFile && newsletterFileName) {
      // For demo purposes, just update the display name
      // In a real app, you'd upload the file to the server
      setNewsletterFileName(newsletterFileName);
      alert('Newsletter uploaded successfully!');
      setNewsletterFile(null);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await fetch(`${API_BASE}/announcements/${id}`, {
          method: 'DELETE',
        });
        alert('Announcement deleted!');
        fetchAnnouncements();
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Failed to delete announcement.');
      }
    }
  };

  // API base URL
  const API_BASE = 'http://localhost:3001/api';

  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
    fetchEvents();
  }, []);

  // Persist currentVideoUrl to localStorage
  useEffect(() => {
    localStorage.setItem('currentVideoUrl', currentVideoUrl);
  }, [currentVideoUrl]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${API_BASE}/announcements`);
      const data = await response.json();
      setAnnouncements(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const [donationAmount, setDonationAmount] = useState(50);
  const [donationName, setDonationName] = useState('');
  const [donationEmail, setDonationEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPastor, setSelectedPastor] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [events, setEvents] = useState([
    { id: 1, title: 'Youth Camp', date: 'Dec 15-17, 2025', description: 'Annual youth camp with worship, games, and fellowship.', image: 'https://placehold.co/600x400/4f46e5/white?text=Youth+Camp' },
    { id: 2, title: 'Women\'s Retreat', date: 'Jan 10-12, 2026', description: 'Annual women\'s retreat with workshops and prayer sessions.', image: 'https://placehold.co/600x400/ec4899/white?text=Women%27s+Retreat' }
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', image: null });
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPhone, setRegistrationPhone] = useState('');
  const [registrationDateOfBirth, setRegistrationDateOfBirth] = useState('');
  const [registrationArea, setRegistrationArea] = useState('');
  const [registrationEducation, setRegistrationEducation] = useState('');
  const [registrationReason, setRegistrationReason] = useState('');
  const [registrationTerms, setRegistrationTerms] = useState(false);

  const pastors = [
    { id: 1, name: 'Pastor Graham Kater', specialty: 'Youth Ministry', image: 'https://placehold.co/150x150/4f46e5/white?text=PW' },
    { id: 2, name: 'Pastor Sarah Johnson', specialty: 'Women\'s Ministry', image: 'https://placehold.co/150x150/ec4899/white?text=SJ' },
    { id: 3, name: 'Pastor Michael Brown', specialty: 'Men\'s Ministry', image: 'https://placehold.co/150x150/0ea5e9/white?text=MB' },
    { id: 4, name: 'Pastor Lisa Davis', specialty: 'Children\'s Ministry', image: 'https://placehold.co/150x150/10b981/white?text=LD' }
  ];

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedPastor) {
      try {
        await fetch(`${API_BASE}/pastor-messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pastor: selectedPastor,
            message: newMessage,
            anonymous: anonymousMode
          }),
        });
        alert('Message sent successfully!');
        setNewMessage('');
        setSelectedPastor('');
        setAnonymousMode(false);
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    }
  };

  const handleDonation = async () => {
    if (donationName && donationEmail && donationAmount > 0) {
      try {
        await fetch(`${API_BASE}/donations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: donationName,
            email: donationEmail,
            amount: donationAmount
          }),
        });
        alert(`Thank you for your donation of R${donationAmount}! Your payment will be processed through PayFast.`);
        setDonationName('');
        setDonationEmail('');
        setDonationAmount(50);
      } catch (error) {
        console.error('Error recording donation:', error);
        alert('Failed to record donation. Please try again.');
      }
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.date && newEvent.description) {
      try {
        const formData = new FormData();
        formData.append('title', newEvent.title);
        formData.append('date', newEvent.date);
        formData.append('description', newEvent.description);
        if (newEvent.imageFile) {
          formData.append('image', newEvent.imageFile);
        }

        await fetch(`${API_BASE}/events`, {
          method: 'POST',
          body: formData,
        });

        alert('Event added successfully!');
        fetchEvents(); // Refresh the events list
        setNewEvent({ title: '', date: '', description: '', imageFile: null, image: null });
      } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event. Please try again.');
      }
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
            <span className="text-xl font-bold
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
              { id: 'live', label: 'Live Stream', icon: '📺' },
              { id: 'admin', label: 'Admin', icon: '⚙️' }
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
              { id: 'live', label: 'Live Stream', icon: '📺' },
              { id: 'admin', label: 'Admin', icon: '⚙️' }
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
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">⏳</div>
                <p>Loading announcements...</p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">📢</div>
                <p>No announcements at this time.</p>
              </div>
            ) : (
              announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-lg">{ann.title}</h3>
                  <p className="text-gray-600 text-sm">{ann.date}</p>
                  <p className="text-gray-700">{ann.content}</p>
                </div>
              ))
            )}
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
            {loading ? (
              <div className="text-center text-gray-500 py-16">
                <div className="text-6xl mb-4">⏳</div>
                <p className="text-xl">Loading announcements...</p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                <div className="text-6xl mb-4">📢</div>
                <p className="text-xl">No announcements available at this time.</p>
                <p className="mt-2">Check back later for updates from our church.</p>
              </div>
            ) : (
              announcements.map(ann => (
                <div key={ann.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{ann.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {ann.date}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{ann.content}</p>
                </div>
              ))
            )}
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
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={async () => {
                    if (newsletterEmail.trim()) {
                      try {
                        await fetch(`${API_BASE}/newsletter`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ email: newsletterEmail }),
                        });
                        alert('Successfully subscribed to newsletter!');
                        setNewsletterEmail('');
                      } catch (error) {
                        console.error('Error subscribing:', error);
                        alert('Failed to subscribe. Please try again.');
                      }
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Newsletter</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{newsletterFileName}</p>
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

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!registrationTerms) {
                alert('Please agree to the terms and conditions');
                return;
              }
              try {
                await fetch(`${API_BASE}/pastor-registrations`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    full_name: registrationName,
                    email: registrationEmail,
                    phone: registrationPhone,
                    date_of_birth: registrationDateOfBirth,
                    area_of_interest: registrationArea,
                    education: registrationEducation,
                    reason: registrationReason,
                    terms: registrationTerms
                  }),
                });
                alert('Application submitted successfully!');
                setRegistrationName('');
                setRegistrationEmail('');
                setRegistrationPhone('');
                setRegistrationDateOfBirth('');
                setRegistrationArea('');
                setRegistrationEducation('');
                setRegistrationReason('');
                setRegistrationTerms(false);
              } catch (error) {
                console.error('Error submitting application:', error);
                alert('Failed to submit application. Please try again.');
              }
            }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={registrationName}
                    onChange={(e) => setRegistrationName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={registrationEmail}
                    onChange={(e) => setRegistrationEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={registrationPhone}
                    onChange={(e) => setRegistrationPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={registrationDateOfBirth}
                    onChange={(e) => setRegistrationDateOfBirth(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area of Interest</label>
                <select value={registrationArea} onChange={(e) => setRegistrationArea(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                  value={registrationEducation}
                  onChange={(e) => setRegistrationEducation(e.target.value)}
                  placeholder="Please describe your educational background, theological training, and relevant experience..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join our pastoral team?</label>
                <textarea
                  value={registrationReason}
                  onChange={(e) => setRegistrationReason(e.target.value)}
                  placeholder="Share your calling and vision for ministry..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={registrationTerms}
                  onChange={(e) => setRegistrationTerms(e.target.checked)}
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
                  src={currentVideoUrl}
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

  const AdminPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3">⚙️</span>
            Church Administration
          </h1>

          <div className="space-y-8">
            {/* Announcements Management */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📢 Manage Announcements</h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Announcement Title</label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    placeholder="Enter announcement title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="text"
                    value={newAnnouncement.date}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, date: e.target.value})}
                    placeholder="e.g. Nov 20, 2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    placeholder="Enter announcement content"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleAddAnnouncement}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Add Announcement
                </button>
              </div>

              {/* Existing Announcements */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Announcements</h3>
                <div className="space-y-4">
                  {announcements.map(ann => (
                    <div key={ann.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800">{ann.title}</h4>
                        <p className="text-sm text-gray-600">{ann.date}</p>
                        <p className="text-gray-700 text-sm">{ann.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Management */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📧 Newsletter Management</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Newsletter File</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => setNewsletterFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Name</label>
                  <input
                    type="text"
                    value={newsletterFileName}
                    onChange={(e) => setNewsletterFileName(e.target.value)}
                    placeholder="e.g. December 2025 Newsletter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    onClick={handleNewsletterUpload}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Upload Newsletter
                  </button>
                </div>
                <p className="text-sm text-gray-600 md:col-span-2">
                  Current Newsletter: <strong>{newsletterFileName}</strong>
                </p>
              </div>
            </div>

            {/* Live Stream Management */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📺 Live Stream Management</h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Embed URL</label>
                  <input
                    type="url"
                    value={currentVideoUrl}
                    onChange={(e) => setCurrentVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">Paste the embed URL from YouTube (format: https://www.youtube.com/embed/...)</p>
                  <button
                    onClick={() => setCurrentVideoUrl('')}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Quick Stats</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{announcements.length}</div>
                  <div className="text-sm text-gray-600">Announcements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{events.length}</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">1</div>
                  <div className="text-sm text-gray-600">Live Stream</div>
                </div>
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
      case 'admin': return <AdminPage />;
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
