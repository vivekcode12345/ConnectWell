# Deployment Guide

## Backend Deployment on Render

### Prerequisites
- Render account (render.com)
- MongoDB Atlas account (free tier available)
- GitHub repository with your code

### Step 1: Set Up MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user (note username and password)
4. Whitelist your IP or allow all IPs
5. Copy the connection string: `mongodb+srv://user:password@cluster.mongodb.net/connectwell`

### Step 2: Create Render Service
1. Log in to Render
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in the details:
   - Name: `connectwell-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Click **Create Web Service**

### Step 3: Add Environment Variables
In Render dashboard, go to your service's **Environment** tab and add:
```
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/connectwell
JWT_SECRET=generate_a_long_random_string_here
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=https://yourdomain.vercel.app
OPENAI_API_KEY=sk-... (optional)
OPENAI_MODEL=gpt-4o-mini
```

### Step 4: Seed Demo Data (Optional)
After deployment, use the Render shell to run:
```bash
npm run seed
```

Your backend is now live at `https://connectwell-api.render.app`

---

## Frontend Deployment on Vercel

### Prerequisites
- Vercel account (vercel.com)
- GitHub repository with your code

### Step 1: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click **Add New...** → **Project**
3. Select your GitHub repository
4. Select the `frontend` folder as the root directory
5. Click **Deploy**

### Step 2: Add Environment Variables
In your Vercel project settings, go to **Settings** → **Environment Variables** and add:
```
VITE_API_BASE_URL=https://connectwell-api.render.app
```

### Step 3: Redeploy
Redeploy the project to apply the new environment variable.

Your frontend is now live at `https://yourdomain.vercel.app`

---

## Connecting Frontend to Backend

After both are deployed:
1. Update frontend `.env` (or Vercel env var) with backend URL: `VITE_API_BASE_URL=https://connectwell-api.render.app`
2. Update backend `.env` (or Render env var) with frontend URL: `CLIENT_ORIGIN=https://yourdomain.vercel.app`
3. Redeploy both to apply changes

---

## Custom Domain Setup

### Add Domain to Vercel
1. In Vercel project settings, go to **Domains**
2. Add your custom domain (e.g., `connectwell.dev`)
3. Follow Vercel's DNS instructions to point your domain

### Add Domain to Render
Similar process in Render's service settings under **Custom Domains**

---

## Monitoring & Logs

### Render
- View logs in real-time on the Render dashboard
- Check metrics under **Metrics**

### Vercel
- View logs in **Deployments** tab
- Monitor performance in **Analytics**

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas connection string is correct
- Verify IP whitelist on MongoDB Atlas

### Frontend showing CORS errors
- Ensure `CLIENT_ORIGIN` on backend matches your frontend URL
- Check backend is running

### AI features not working
- Verify `OPENAI_API_KEY` is set on backend
- Check API key is valid and has credits

---

## Cost Estimates

- **Render**: Free tier includes 500 hours/month (production-grade)
- **MongoDB Atlas**: Free tier 512 MB storage
- **Vercel**: Free tier with generous limits
- **OpenAI**: Pay-as-you-go ($0.15 per 1000 tokens approx)
