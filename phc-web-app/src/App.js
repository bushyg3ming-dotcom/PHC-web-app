import React, { useState, useEffect } from 'react';
import { Calendar, Mail, CreditCard, MessageCircle, Video, Heart, DollarSign, Send, Play, Phone, MapPin, Clock, Users, BookOpen, X, Menu, Camera, Plus, Settings } from 'lucide-react';

const App = () => {
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
  const [registrationTerms, setRegistrationTerms] = useState(false);
  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPhone, setRegistrationPhone] = useState('');
  const [registrationDateOfBirth, setRegistrationDateOfBirth] = useState('');
  const [registrationArea, setRegistrationArea] = useState('');
  const [registrationEducation, setRegistrationEducation] = useState('');
  const [registrationReason, setRegistrationReason] = useState('');
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [newsletterDesc, setNewsletterDesc] = useState('This month\'s newsletter features our upcoming events, testimonies, and ministry updates.');

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
            <Heart className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold">PHC</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { id: 'home', label: 'Home', icon: Heart },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'announcements', label: 'Announcements', icon: Calendar },
              { id: 'newsletter', label: 'Newsletter', icon: Mail },
              { id: 'donations', label: 'Donations', icon: CreditCard },
              { id: 'pastor', label: 'Ask a Pastor', icon: MessageCircle },
              { id: 'pastorRegister', label: 'Pastor Register', icon: Users },
              { id: 'live', label: 'Live Stream', icon: Video },
              { id: 'admin', label: 'Admin', icon: Settings }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <span>{item.label}</span>
                <item.icon className="h-5 w-5" />
              </button>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-blue-800 hover:bg-blue-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-blue-800">
            {[
              { id: 'home', label: 'Home', icon: Heart },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'announcements', label: 'Announcements', icon: Calendar },
              { id: 'newsletter', label: 'Newsletter', icon: Mail },
              { id: 'donations', label: 'Donations', icon: CreditCard },
              { id: 'pastor', label: 'Ask a Pastor', icon: MessageCircle },
              { id: 'pastorRegister', label: 'Pastor Register', icon: Users },
              { id: 'live', label: 'Live Stream', icon: Video },
              { id: 'admin', label: 'Admin', icon: Settings }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-blue-800' : 'hover:bg-blue-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  // Main content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to PHC</h2>
              <p className="text-gray-600 mb-4">Port Hills Church - A place of worship, fellowship, and community.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Heart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Our Mission</h3>
                  <p className="text-sm text-gray-600">To spread God's love and build community.</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Join Us</h3>
                  <p className="text-sm text-gray-600">Attend our services and events.</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Support</h3>
                  <p className="text-sm text-gray-600">Help us continue our ministry.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {events.slice(0, 3).map(event => (
                  <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img src={event.image} alt={event.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Admin Panel
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                  <div key={event.id} className="border rounded-lg overflow-hidden shadow">
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-2">{event.date}</p>
                      <p className="mb-4">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Admin Panel
                </button>
              </div>
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-gray-700">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'newsletter':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Church Newsletter</h2>
            <p className="text-gray-600 mb-4">{newsletterDesc}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Download Latest Newsletter</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Download PDF
              </button>
            </div>
          </div>
        );
      case 'donations':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Make a Donation</h2>
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (R)</label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                min="1"
              />
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[10, 20, 50, 100, 200, 500].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount)}
                    className={`p-2 rounded border ${donationAmount === amount ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    R{amount}
                  </button>
                ))}
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={donationName}
                onChange={(e) => setDonationName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Your name"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={donationEmail}
                onChange={(e) => setDonationEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="your.email@example.com"
              />
              <button
                onClick={handleDonation}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Donate Now
              </button>
            </div>
          </div>
        );
      case 'pastor':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ask a Pastor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Send a Message</h3>
                <select
                  value={selectedPastor}
                  onChange={(e) => setSelectedPastor(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select a Pastor</option>
                  {pastors.map(pastor => (
                    <option key={pastor.id} value={pastor.name}>{pastor.name} - {pastor.specialty}</option>
                  ))}
                </select>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  rows="4"
                />
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={anonymousMode}
                    onChange={(e) => setAnonymousMode(e.target.checked)}
                    className="mr-2"
                  />
                  Send anonymously
                </label>
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Our Pastors</h3>
                <div className="space-y-4">
                  {pastors.map(pastor => (
                    <div key={pastor.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img src={pastor.image} alt={pastor.name} className="w-16 h-16 rounded-full" />
                      <div>
                        <h4 className="font-semibold">{pastor.name}</h4>
                        <p className="text-sm text-gray-600">{pastor.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'pastorRegister':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pastor Registration</h2>
            <form className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={registrationName}
                onChange={(e) => setRegistrationName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={registrationEmail}
                onChange={(e) => setRegistrationEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={registrationPhone}
                onChange={(e) => setRegistrationPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={registrationDateOfBirth}
                onChange={(e) => setRegistrationDateOfBirth(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <input
                type="text"
                value={registrationArea}
                onChange={(e) => setRegistrationArea(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="City/Town"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Highest Education Level</label>
              <select
                value={registrationEducation}
                onChange={(e) => setRegistrationEducation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              >
                <option value="">Select Education Level</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to be a pastor?</label>
              <textarea
                value={registrationReason}
                onChange={(e) => setRegistrationReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows="4"
                required
              />
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={registrationTerms}
                  onChange={(e) => setRegistrationTerms(e.target.checked)}
                  className="mr-2"
                  required
                />
                I agree to the terms and conditions
              </label>
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Submit Application
              </button>
            </form>
          </div>
        );
      case 'live':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Stream</h2>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={currentVideo}
                title="Live Stream"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Live service broadcasts will appear here.</p>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                value={currentVideo}
                onChange={(e) => setCurrentVideo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter YouTube embed URL"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Update Video
              </button>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Manage Announcements</h3>
                  <div className="space-y-2">
                    {announcements.map(announcement => (
                      <div key={announcement.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{announcement.title}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => setEditingAnnouncement(announcement)}
                            className="text-blue-600 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setAnnouncements(announcements.filter(a => a.id !== announcement.id))}
                            className="text-red-600 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="text"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    rows="3"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    accept="image/*"
                  />
                  <button
                    onClick={handleAddEvent}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
