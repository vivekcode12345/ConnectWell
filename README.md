# ConnectWell – A Digital Platform for Strengthening Human Connection and Emotional Well-Being

ConnectWell is a secure full-stack app for daily mood check-ins, AI tone coaching, and peer support communities.

## Quick Start

### Local Development
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (in another terminal)
cd frontend && npm install && npm run dev

# Visit http://localhost:5173
```

### (Optional) Enable AI Tone Analysis
Add your OpenAI API key for real AI analysis:
1. Get a free API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to `backend/.env`: `OPENAI_API_KEY=sk-...`

Without the key, the app uses a simple mock analyzer.

## Project Structure
```
connectwell/
├── backend/                    # Express API
│   ├── src/
│   │   ├── config/            # Database config
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Auth, errors, logging
│   │   ├── utils/             # AI service, insights, seed
│   │   └── __tests__/         # Integration tests
│   ├── package.json
│   └── README.md
├── frontend/                   # React + Vite + Tailwind
│   ├── src/
│   │   ├── api/               # Axios client
│   │   ├── components/        # Reusable UI
│   │   ├── context/           # Auth context
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Route pages
│   │   └── styles/            # Global CSS
│   ├── package.json
│   └── README.md
├── README.md                   # This file
└── DEPLOYMENT.md              # Render + Vercel guide
```

## Features
- Emotional check-in system with mood history and weekly insights
- AI-based tone analyzer with empathetic rewrite suggestions
- Peer support communities with posts and comments
- Safety tools: report posts and block users
- JWT authentication with protected routes

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- API: REST

## Installation

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
```
Update `.env` with your MongoDB connection string and JWT secret.

Start the API:
```bash
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
```
Start the UI:
```bash
npm run dev
```

## Environment Variables

### Backend (.env)
- `PORT` (default 5000)
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_ORIGIN` (default http://localhost:5173)
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (default gpt-4o-mini)

### Frontend (.env)
- `VITE_API_BASE_URL` (default http://localhost:5000)

## Deployment

### Backend on Render
1. Create a new Web Service from the `backend` folder.
2. Set the Build Command to `npm install`.
3. Set the Start Command to `npm start`.
4. Add the backend environment variables from `.env`.

### Frontend on Vercel
1. Import the `frontend` folder as a new project.
2. Set the Build Command to `npm run build`.
3. Set the Output Directory to `dist`.
4. Add `VITE_API_BASE_URL` pointing to your Render backend URL.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step instructions.

## API Overview (Backend)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `POST /api/moods`
- `GET /api/moods`
- `GET /api/moods/weekly`
- `POST /api/ai/tone`
- `POST /api/posts`
- `GET /api/posts?group=...`
- `POST /api/comments`
- `GET /api/comments/post/:postId`
- `POST /api/reports`
- `POST /api/users/block/:id`

## API Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name":"Ava","email":"ava@example.com","password":"Secret123"}'
```
Sample response:
```json
{
	"token": "JWT_TOKEN",
	"user": {
		"id": "65f1c3...",
		"name": "Ava",
		"email": "ava@example.com"
	}
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"ava@example.com","password":"Secret123"}'
```
Sample response:
```json
{
	"token": "JWT_TOKEN",
	"user": {
		"id": "65f1c3...",
		"name": "Ava",
		"email": "ava@example.com"
	}
}
```

### Create Mood Check-In
```bash
curl -X POST http://localhost:5000/api/moods \
	-H "Authorization: Bearer YOUR_JWT" \
	-H "Content-Type: application/json" \
	-d '{"mood":"calm","note":"Short walk helped."}'
```
Sample response:
```json
{
	"log": {
		"_id": "66a1b2...",
		"user": "65f1c3...",
		"mood": "calm",
		"note": "Short walk helped.",
		"createdAt": "2026-02-12T08:12:00.000Z"
	},
	"tip": "Notice what helped you feel calm and repeat it tomorrow."
}
```

### Weekly Insights
```bash
curl http://localhost:5000/api/moods/weekly \
	-H "Authorization: Bearer YOUR_JWT"
```
Sample response:
```json
{
	"totalEntries": 5,
	"topMood": "calm",
	"counts": {
		"calm": 3,
		"stressed": 1,
		"happy": 1
	}
}
```

### Tone Analysis
```bash
curl -X POST http://localhost:5000/api/ai/tone \
	-H "Authorization: Bearer YOUR_JWT" \
	-H "Content-Type: application/json" \
	-d '{"text":"I felt ignored today."}'
```
Sample response:
```json
{
	"tone": "negative",
	"suggestion": "I hear you. I felt ignored today. If you want, I can help brainstorm next steps."
}
```

### Create Community Post
```bash
curl -X POST http://localhost:5000/api/posts \
	-H "Authorization: Bearer YOUR_JWT" \
	-H "Content-Type: application/json" \
	-d '{"group":"Mindful Habits","content":"Trying a 5-minute breathing break.","anonymous":false}'
```
Sample response:
```json
{
	"_id": "66a2d1...",
	"user": "65f1c3...",
	"group": "Mindful Habits",
	"content": "Trying a 5-minute breathing break.",
	"anonymous": false,
	"flagged": false,
	"createdAt": "2026-02-12T08:20:00.000Z"
}
```

## Quick Test Flow
1. Register a user with `POST /api/auth/register`.
2. Log in to get a JWT with `POST /api/auth/login`.
3. Use the token to create a mood log `POST /api/moods`.
4. Check weekly insights at `GET /api/moods/weekly`.
5. Try the tone analyzer at `POST /api/ai/tone`.
6. Create a community post at `POST /api/posts`.

## Notes
The AI tone analyzer uses OpenAI when `OPENAI_API_KEY` is set, and falls back to a mock analyzer if it is missing.
The backend applies security headers via Helmet and basic rate limiting for abuse protection.

## Project Status

✅ **Completed**
- Full-stack auth system (register, login, JWT)
- Mood tracking with weekly insights
- AI tone analyzer (OpenAI integration)
- Peer support communities with posts and comments
- Safety features (report, block user)
- Error handling and loading states
- Password hashing with bcrypt
- Rate limiting and security headers
- Integration tests for API endpoints
- Demo seed data
- Production deployment guides

## Next Steps

1. **Local Testing**: Run `npm run dev` in both backend and frontend, then test the features
2. **OpenAI Setup**: Get API key from [OpenAI](https://platform.openai.com/api-keys) and add to `.env`
3. **Customization**: Update branding, colors, and copy in `tailwind.config.js` and component text
4. **Database**: Set up MongoDB Atlas for production data
5. **Deployment**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to Render + Vercel
6. **Monitoring**: Set up error tracking and logging for production

## Support

For issues or questions:
1. Check the relevant README in `backend/` or `frontend/` folders
2. Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
