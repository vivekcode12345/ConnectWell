# ConnectWell

> **Be Seen. Be Heard. Be Well.**

An emotional intelligence platform that helps users track moods, analyze communication tone with AI, and build supportive communities.

# ConnectWell

> **Be Seen. Be Heard. Be Well.**

An emotional intelligence platform that helps users track moods, analyze communication tone with AI, and build supportive communities.

## 🚀 Live Demo

- **Frontend:** https://connect-well-three.vercel.app
- **Backend API:** https://connectwell-backend.onrender.com

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [API Endpoints](#api-endpoints)
5. [Project Structure](#project-structure)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [License](#license)

## Features

- **Daily Mood Check-ins** - Track emotional patterns with notes
- **Mood Analytics** - Visualize trends over time
- **AI Tone Analyzer** - Analyze message tone and get rewrite suggestions
- **Community Features** - Share experiences, join support groups
- **Dark Mode** - Built-in dark/light theme toggle
- **Email OTP Verification** - Secure email-based registration

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, SendGrid, Groq API, Bcryptjs

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)
- SendGrid API key
- Groq API key

### Installation

```bash
# Clone repository
git clone <repo-url>
cd "CONNECT WELL"

# Backend setup
cd backend
npm install

# Create .env file
echo "PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=mongodb+srv://user:password@cluster/connectwell
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
SENDGRID_API_KEY=SG.your_key
EMAIL_FROM=your_email@example.com
GROQ_API_KEY=your_groq_key" > .env

npm run dev
```

```bash
# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

**Backend runs on:** http://localhost:5000  
**Frontend runs on:** http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/login` - Login with credentials

### Mood Tracking
- `POST /api/moods` - Create mood entry
- `GET /api/moods` - Get all moods
- `GET /api/moods/weekly` - Get weekly stats

### AI Features
- `POST /api/ai/tone` - Analyze message tone
- `POST /api/ai/rewrite` - Rewrite in different style

### Community
- `POST /api/posts` - Create post
- `GET /api/posts` - Get posts
- `POST /api/comments` - Add comment
- `POST /api/reports` - Report content
- `POST /api/users/block/:id` - Block user

## Project Structure

```
CONNECT WELL/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, errors, logging
│   │   ├── utils/             # Helpers (email, AI)
│   │   ├── config/            # Database config
│   │   └── server.js          # Entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── context/           # Auth context
│   │   ├── hooks/             # Custom hooks
│   │   ├── api/               # API client
│   │   └── styles/            # Global CSS
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── .gitignore
```

## Testing

### Manual Testing
```bash
# 1. Register with email
# 2. Check email for OTP code
# 3. Enter OTP to verify
# 4. Login with credentials
# 5. Create mood entry
# 6. Test tone analyzer
# 7. Toggle dark mode
```

### Run Tests
```bash
cd backend
npm test
```

## Troubleshooting

### OTP not arriving
- Check spam/promotions folder
- Verify sender email in SendGrid
- Check SendGrid Suppressions list

### API calls failing (401)
- Clear localStorage
- Login again
- Check JWT_SECRET in .env

### Port already in use
```bash
# Change port in .env
PORT=5001

# Or kill process
lsof -i :5000
kill -9 <PID>
```

### Database connection failed
- Verify MONGO_URI in .env
- Check MongoDB service is running
- Whitelist IP in MongoDB Atlas (0.0.0.0/0)

## License

Private and proprietary project.

---

Need help? Check the .env configuration or review backend/frontend README files.

---

**ConnectWell** - Strengthening human connection and emotional well-being.

*Last updated: February 16, 2026*