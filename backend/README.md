# ConnectWell Backend

Express + MongoDB API for ConnectWell.

## Setup
```bash
npm install
cp .env.example .env
```

## Development
```bash
npm run dev
```

## Environment Variables
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_ORIGIN`
- `GROQ_API_KEY`

## Scripts
- `npm run dev` - Start with nodemon
- `npm start` - Start production server
- `npm test` - Run integration tests (requires MongoDB running)
