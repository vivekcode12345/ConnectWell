# OpenAI Setup Guide

## Getting Your OpenAI API Key

### Step 1: Create an OpenAI Account
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Click **Sign up** and create an account (or log in if you have one)
3. Verify your email address

### Step 2: Set Up Billing
1. Go to [Billing Overview](https://platform.openai.com/account/billing/overview)
2. Add a payment method (credit/debit card)
3. Set usage limits in **Billing → Usage limits** (recommended: $5-10/month for testing)

### Step 3: Create an API Key
1. Go to [API Keys](https://platform.openai.com/api-keys)
2. Click **+ Create new secret key**
3. Give it a name: `ConnectWell`
4. Copy the key (you can only see it once!)
5. Store it safely (never commit to git)

### Step 4: Add to ConnectWell Backend

#### Local Development
1. Open `backend/.env`
2. Add your API key:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-4o-mini
   ```
3. Restart your backend: `npm run dev`

#### Production (Render)
1. Go to your Render service dashboard
2. Click **Environment**
3. Add the variable:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. Redeploy your service

### Step 5: Test the Integration
Use the Tone Analyzer feature in the app to test:
1. Go to `/tone` on your frontend
2. Enter a message: `"I felt ignored today."`
3. Click **Analyze tone**
4. You should see the tone and empathetic rewrite from OpenAI

### Pricing
- **gpt-4o-mini**: ~$0.15 per 1M input tokens, $0.60 per 1M output tokens
- **Typical usage**: $0.01-0.05 per tone analysis
- **Monthly estimate**: $1-5 for moderate usage (100-500 analyses)

### Troubleshooting

#### "Invalid API Key" Error
- Check your key is correctly copied (no extra spaces)
- Verify it's a secret key (starts with `sk-`), not a project key
- Check the key is enabled on OpenAI dashboard

#### "Quota Exceeded" Error
- You've hit your monthly spending limit
- Increase limit in **Billing → Usage limits**
- Or wait for the monthly reset

#### No AI Response
- Backend falls back to mock analyzer automatically
- Check backend logs for errors
- Verify `OPENAI_API_KEY` is set in `.env`

### Optional: Using Fallback Mock Analyzer
If you don't want to set up OpenAI, the app works with the built-in mock analyzer. It's simple but functional:
- Positive words: appreciate, thank, glad, happy, love, support
- Negative words: hate, angry, upset, stressed, sad, annoyed

---

## Cost Optimization Tips

1. Use **gpt-4o-mini** (cheapest for this use case)
2. Set a monthly usage limit in OpenAI dashboard
3. Monitor usage in **Usage** tab weekly
4. Cache repeated requests if possible (future enhancement)

---

## Questions?
- OpenAI Docs: https://platform.openai.com/docs
- API Reference: https://platform.openai.com/docs/api-reference
- Support: support@openai.com
