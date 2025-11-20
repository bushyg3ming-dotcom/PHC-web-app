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
