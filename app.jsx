import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Calendar, Mail, CreditCard, MessageCircle, Video, Heart, DollarSign, Send, Play, Phone, MapPin, Clock, Users, BookOpen, X, Menu, Camera, Plus } from 'lucide-react';



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
              { id: 'live', label: 'Live Stream', icon: Video }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-700">
            {[
              { id: 'home', label: 'Home', icon: Heart },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'announcements', label: 'Announcements', icon: Calendar },
              { id: 'newsletter', label: 'Newsletter', icon: Mail },
              { id: 'donations', label: 'Donations', icon: CreditCard },
              { id: 'pastor', label: 'Ask a Pastor', icon: MessageCircle },
              { id: 'pastorRegister', label: 'Pastor Register', icon: Users },
              { id: 'live', label: 'Live Stream', icon: Video }
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
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">PHC</h1>
          <p className="text-xl text-gray-600 mb-6">Where Faith Meets Community</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Service Times</h3>
              <p>Sunday: 10:00 AM</p>
              <p>Wednesday: 7:00 PM</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Location</h3>
              <p>5 Frederick Street, Davidsonville</p>
              <p>Roodepoort, 1724</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
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
                <Calendar className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Youth Camp</h3>
                  <p className="text-sm text-gray-600">Dec 15-17, 2025</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
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
              <Play className="h-16 w-16 text-gray-400" />
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
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
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
                      <Camera className="h-5 w-5 mr-2" />
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
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
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
            <Mail className="h-8 w-8 text-blue-600 mr-3" />
            Church Newsletter
          </h1>
          
          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">November 2025 Newsletter</h2>
              <p className="text-gray-700 mb-4">This month's newsletter features our upcoming events, testimonies, and ministry updates.</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Download PDF
              </button>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-700 mb-4">Stay updated with our latest news and events.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Subscribe
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
            <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
            Make a Donation
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Support Our Ministry</h2>
              <p className="text-gray-700 mb-6">
                Your generous donations help us continue our mission of spreading the Gospel and serving our community. 
                All donations are processed securely through PayFast.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (R)</label>
                  <input 
                    type="number" 
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={donationName}
                    onChange={(e) => setDonationName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={donationEmail}
                    onChange={(e) => setDonationEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleDonation}
                className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Process Payment via PayFast
              </button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Donation Options</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span>Weekly Offering</span>
                  <span className="font-semibold">R50</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span>Monthly Support</span>
                  <span className="font-semibold">R200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span>Special Project</span>
                  <span className="font-semibold">Custom</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Tax Deductible</h4>
                <p className="text-sm text-gray-600">All donations are tax deductible. You will receive a receipt for your records.</p>
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
            <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
            Ask a Pastor
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Pastors</h2>
              <div className="space-y-4">
                {pastors.map(pastor => (
                  <div key={pastor.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <img src={pastor.image} alt={pastor.name} className="w-16 h-16 rounded-full" />
                    <div>
                      <h3 className="font-semibold text-lg">{pastor.name}</h3>
                      <p className="text-gray-600">{pastor.specialty}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedPastor(pastor.name)}
                      className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Private Message</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected Pastor</label>
                  <select 
                    value={selectedPastor}
                    onChange={(e) => setSelectedPastor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a pastor...</option>
                    {pastors.map(pastor => (
                      <option key={pastor.id} value={pastor.name}>{pastor.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your private message here..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    checked={anonymousMode}
                    onChange={(e) => setAnonymousMode(e.target.checked)}
                    className="mt-1 mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    Send anonymously
                  </label>
                </div>
                
                <button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !selectedPastor}
                  className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Private Message
                </button>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Privacy Notice</h4>
                  <p className="text-sm text-gray-600">
                    Your message will be sent directly to the selected pastor. 
                    Your privacy is protected and your message will not be shared publicly.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Message History</h2>
            <div className="space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">{msg.anonymous ? 'Anonymous' : msg.pastor}</span>
                    <span className="text-sm text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{msg.message}</p>
                  <span className="text-xs text-green-600">{msg.status}</span>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-gray-500 text-center py-4">No private messages sent yet.</p>
              )}
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
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            Pastor Registration
          </h1>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Become a Pastor in Our Ask a Pastor Program</h2>
            <p className="text-gray-700 mb-4">
              Join our team of pastors to help answer questions from our church community. 
              This is a great opportunity to serve and connect with our members.
            </p>
            <p className="text-gray-700">
              <strong>Requirements:</strong> Active church member, ordained pastor, and commitment to respond to messages within 24 hours.
            </p>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty Area</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select your specialty</option>
                <option value="Youth Ministry">Youth Ministry</option>
                <option value="Women's Ministry">Women's Ministry</option>
                <option value="Men's Ministry">Men's Ministry</option>
                <option value="Children's Ministry">Children's Ministry</option>
                <option value="General Ministry">General Ministry</option>
                <option value="Counseling">Counseling</option>
                <option value="Prayer Ministry">Prayer Ministry</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input 
                type="number" 
                min="1"
                max="50"
                placeholder="Enter years of experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <img src="https://placehold.co/150x150/4f46e5/white?text=+" alt="Profile Preview" className="w-16 h-16 rounded-full" />
                </div>
                <div>
                  <div className="file-input-wrapper">
                    <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      <Camera className="h-5 w-5 mr-2" />
                      Upload Photo
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (Max 5MB)</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
              <textarea 
                rows="4"
                placeholder="Tell us about your ministry experience and calling"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div className="flex items-start">
              <input 
                type="checkbox" 
                className="mt-1 mr-2"
              />
              <label className="text-sm text-gray-700">
                I agree to respond to messages within 24 hours and maintain the confidentiality of all communications
              </label>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Register as Pastor
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const LiveStreamPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <Video className="h-8 w-8 text-blue-600 mr-3" />
            Live Stream
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <iframe
                  src={currentVideo}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Current Service</h3>
                <p className="text-gray-700">Join us live for our Sunday morning service with Pastor Kater.</p>
                <div className="flex items-center mt-2 text-green-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span>Live Now</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Services</h2>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-lg">Sunday Morning Service</h3>
                  <p className="text-gray-600">9:00 AM - 11:00 AM</p>
                  <p className="text-gray-700 mt-2">Worship, Prayer, and Word</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-lg">Sunday Evening Service</h3>
                  <p className="text-gray-600">6:00 PM - 8:00 PM</p>
                  <p className="text-gray-700 mt-2">Fellowship and Testimonies</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-lg">Wednesday Night Service</h3>
                  <p className="text-gray-600">7:00 PM - 8:30 PM</p>
                  <p className="text-gray-700 mt-2">Bible Study and Prayer</p>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Watch Past Services</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    Sunday Service - November 9, 2025
                  </button>
                  <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    Youth Night - November 12, 2025
                  </button>
                  <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    Women's Ministry - November 5, 2025
                  </button>
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
              <h3 className="text-lg font-semibold mb-4">PHC</h3>
              <p className="text-blue-200">Where faith meets community and God's love transforms lives.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <p className="text-blue-200">123 Faith Avenue</p>
              <p className="text-blue-200">Holiness City, HC 1234</p>
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
            <p>&copy; 2025 PHC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')).render(<App />);

export default App;
