const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./church.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Announcements table
    db.run(`CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      content TEXT NOT NULL
    )`);

    // Events table
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT
    )`);

    // Pastor messages table
    db.run(`CREATE TABLE IF NOT EXISTS pastor_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pastor TEXT NOT NULL,
      message TEXT NOT NULL,
      anonymous BOOLEAN DEFAULT 0,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'sent'
    )`);

    // Pastor registrations table
    db.run(`CREATE TABLE IF NOT EXISTS pastor_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      date_of_birth DATE,
      area_of_interest TEXT,
      education TEXT,
      reason TEXT,
      terms BOOLEAN,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Donations table (for logging donations, not processing)
    db.run(`CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      amount INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Newsletter subscriptions
    db.run(`CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert some sample announcements
    db.get("SELECT COUNT(*) as count FROM announcements", (err, row) => {
      if (row.count === 0) {
        const sampleAnnouncements = [
          { title: 'Sunday Service This Weekend', date: 'Nov 16, 2025', content: 'Join us for our weekly worship service with Pastor Kater. Special music and testimonies.' },
          { title: 'Youth Group Meeting', date: 'Nov 18, 2025', content: 'Youth group meeting in Fellowship Hall at 7 PM. Bring a friend!' },
          { title: 'Women\'s Ministry Retreat', date: 'Dec 5-7, 2025', content: 'Annual women\'s retreat at the conference center. Register by Nov 25.' }
        ];

        const stmt = db.prepare("INSERT INTO announcements (title, date, content) VALUES (?, ?, ?)");
        sampleAnnouncements.forEach(ann => {
          stmt.run(ann.title, ann.date, ann.content);
        });
        stmt.finalize();
      }
    });
  });
}

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// API Routes

// Announcements
app.get('/api/announcements', (req, res) => {
  db.all("SELECT * FROM announcements ORDER BY id DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/announcements', (req, res) => {
  const { title, date, content } = req.body;
  db.run("INSERT INTO announcements (title, date, content) VALUES (?, ?, ?)",
    [title, date, content], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Events
app.get('/api/events', (req, res) => {
  db.all("SELECT * FROM events ORDER BY id DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/events', upload.single('image'), (req, res) => {
  const { title, date, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  db.run("INSERT INTO events (title, date, description, image) VALUES (?, ?, ?, ?)",
    [title, date, description, image], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Pastor Messages
app.post('/api/pastor-messages', (req, res) => {
  const { pastor, message, anonymous } = req.body;
  db.run("INSERT INTO pastor_messages (pastor, message, anonymous) VALUES (?, ?, ?)",
    [pastor, message, anonymous], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

app.get('/api/pastor-messages', (req, res) => {
  // This would be admin only, but for demo, return all
  db.all("SELECT * FROM pastor_messages ORDER BY id DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Pastor Registrations
app.post('/api/pastor-registrations', (req, res) => {
  const { full_name, email, phone, date_of_birth, area_of_interest, education, reason, terms } = req.body;
  db.run(`INSERT INTO pastor_registrations (full_name, email, phone, date_of_birth, area_of_interest, education, reason, terms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, phone, date_of_birth, area_of_interest, education, reason, terms], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Donations
app.post('/api/donations', (req, res) => {
  const { name, email, amount } = req.body;
  db.run("INSERT INTO donations (name, email, amount) VALUES (?, ?, ?)",
    [name, email, amount], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Donation recorded' });
    });
});

// Newsletter Subscriptions
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  db.run("INSERT OR IGNORE INTO newsletter_subscriptions (email) VALUES (?)",
    [email], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes > 0) {
        res.json({ message: 'Successfully subscribed to newsletter' });
      } else {
        res.json({ message: 'Already subscribed' });
      }
    });
});

// Pastors list (static for now)
app.get('/api/pastors', (req, res) => {
  const pastors = [
    { id: 1, name: 'Pastor Graham Kater', specialty: 'Youth Ministry', image: 'https://placehold.co/150x150/4f46e5/white?text=PW' },
    { id: 2, name: 'Pastor Sarah Johnson', specialty: 'Women\'s Ministry', image: 'https://placehold.co/150x150/ec4899/white?text=SJ' },
    { id: 3, name: 'Pastor Michael Brown', specialty: 'Men\'s Ministry', image: 'https://placehold.co/150x150/0ea5e9/white?text=MB' },
    { id: 4, name: 'Pastor Lisa Davis', specialty: 'Children\'s Ministry', image: 'https://placehold.co/150x150/10b981/white?text=LD' }
  ];
  res.json(pastors);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database closed.');
    }
    process.exit(0);
  });
});
