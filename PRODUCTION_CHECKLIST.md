# Production Checklist

## Backend
- [ ] Environment variables set for production (JWT_SECRET, MONGO_URI, OPENAI_API_KEY)
- [ ] MongoDB production database configured
- [ ] Rate limiting enabled (helmet + express-rate-limit)
- [ ] CORS configured for production frontend domain
- [ ] Error handling in all endpoints
- [ ] API tests passing (`npm test`)
- [ ] Logging configured for troubleshooting
- [ ] Security headers applied (helmet)
- [ ] Input validation on all endpoints
- [ ] Database backups scheduled
- [ ] Monitoring alerts set up

## Frontend
- [ ] `.env` configured with production backend URL
- [ ] Error boundary in place
- [ ] Loading states added to all async operations
- [ ] Auth token properly stored and managed
- [ ] No console logs with sensitive data
- [ ] Mobile responsive design tested
- [ ] Performance optimized (lazy loading, code splitting)
- [ ] Build artifacts generated (`npm run build`)
- [ ] Vercel deployment set up
- [ ] Environment variables in Vercel
- [ ] Custom domain configured (optional)

## Database
- [ ] MongoDB backup schedule configured
- [ ] Connection string uses production database
- [ ] Indexes created for query performance
- [ ] User authentication enabled on MongoDB
- [ ] IP whitelist configured on MongoDB

## Security
- [ ] Passwords hashed with bcrypt
- [ ] JWT secrets are strong (32+ characters)
- [ ] No API keys in version control
- [ ] HTTPS enforced on frontend
- [ ] CORS properly restricted
- [ ] Rate limiting in place
- [ ] Content Security Policy headers set
- [ ] SQL/NoSQL injection validation
- [ ] XSS protection enabled
- [ ] CSRF tokens if applicable

## Monitoring
- [ ] Backend logs accessible
- [ ] Frontend error tracking (optional: Sentry)
- [ ] Database connection monitoring
- [ ] API response time monitoring
- [ ] Uptime monitoring alerts
- [ ] Error notification system

## Data & Performance
- [ ] Production data seeded if needed
- [ ] Database queries optimized
- [ ] Caching strategy in place
- [ ] CDN configured for static assets (optional)
- [ ] Image optimization (if uploaded)
- [ ] API response times acceptable

## Documentation
- [ ] README.md complete
- [ ] API documentation available
- [ ] Deployment guide up to date
- [ ] Team knows how to troubleshoot issues
- [ ] Runbooks for common problems

## Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Manual end-to-end testing completed
- [ ] Cross-browser testing done
- [ ] Mobile testing completed

## Before Launch
- [ ] Notify team of launch date
- [ ] Plan rollback strategy
- [ ] Schedule launch window
- [ ] Check all integrations working
- [ ] Verify backups in place
- [ ] Do a final full test
