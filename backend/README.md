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
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

## Scripts
- `npm run dev` - Start with nodemon
- `npm start` - Start production server
- `npm test` - Run integration tests (requires MongoDB running)
