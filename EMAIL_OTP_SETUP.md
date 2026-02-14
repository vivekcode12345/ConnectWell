# Email Authentication with OTP - Implementation Guide

## Overview

This guide explains the email-based OTP (One-Time Password) authentication system implemented in ConnectWell. When users register, they must verify their email address using a 6-digit OTP before account creation.

## Architecture

### Backend Components

#### 1. **OTP Model** (`src/models/OTP.js`)
Stores temporary OTP records during registration:
- `email`: User's email address
- `otp`: 6-digit verification code
- `expiresAt`: Automatically expires after 10 minutes
- `attempts`: Tracks verification attempts (max 5)
- `userData`: Temporarily stores name, email, password until verified

#### 2. **Email Service** (`src/utils/emailService.js`)
Handles all email operations:
- `generateOTP()`: Generates a 6-digit OTP using otplib
- `sendOTPEmail()`: Sends OTP email with HTML template
- `sendWelcomeEmail()`: Sends welcome email after verification

#### 3. **Auth Controller Updates** (`src/controllers/authController.js`)

**New endpoints:**

```javascript
// Step 1: User submits registration
POST /api/auth/register
Request: { name, email, password }
Response: { message, email, requiresVerification: true }

// Step 2: User submits OTP from email
POST /api/auth/verify-otp
Request: { email, otp }
Response: { message, token, user }

// Step 3: Resend OTP if needed
POST /api/auth/resend-otp
Request: { email }
Response: { message, email }
```

### Frontend Components

#### Updated Register Page (`src/pages/Register.jsx`)

Two-step registration flow:

**Step 1 - Registration Form:**
- Collect name, email, password
- Submit to `/api/auth/register`
- Display success message with email confirmation

**Step 2 - OTP Verification:**
- 6-digit input field with centered, spaced display
- Shows expiration time (10 minutes)
- Resend OTP button for convenience
- Back button to restart process

## Setup Instructions

### 1. Environment Configuration

Add email configuration to `.env`:

```dotenv
# Email Configuration (Mailtrap or Gmail)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=465
EMAIL_USER=your_username
EMAIL_PASSWORD=your_password
EMAIL_FROM=noreply@connectwell.com
```

### 2. Using Mailtrap (Recommended for Development)

**Free email testing service - No real emails sent:**

1. Sign up at [mailtrap.io](https://mailtrap.io)
2. Create a sending domain/project
3. Copy credentials to your `.env` file:
   ```
   EMAIL_HOST=sandbox.smtp.mailtrap.io
   EMAIL_PORT=465
   EMAIL_USER=<your_username>
   EMAIL_PASSWORD=<your_password>
   ```

4. Check email inbox: https://mailtrap.io/inbox

### 3. Using Gmail (Production)

**For real email sending:**

1. Enable 2-factor authentication in Gmail
2. Create an app-specific password:
   - Go to Google Account → Security
   - Create app password for "Mail" and "Windows PC"
3. Update `.env`:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=your_app_specific_password
   ```

## Registration Flow

### User Journey

```
1. User visits Register page
   ↓
2. Enters: Name, Email, Password
   ↓
3. Clicks "Continue"
   ↓
4. Backend:
   - Validates email not already registered
   - Generates 6-digit OTP
   - Saves OTP + user data (temp)
   - Sends OTP email
   ↓
5. Frontend shows OTP verification step
   ↓
6. User receives email with OTP
   ↓
7. User enters 6-digit code
   ↓
8. Frontend sends OTP + email to /verify-otp
   ↓
9. Backend:
   - Validates OTP (not expired, not exceeded attempts)
   - Creates User account
   - Generates JWT token
   - Sends welcome email
   - Deletes OTP record
   ↓
10. Frontend auto-logs in user
   ↓
11. User redirected to Dashboard
```

## API Reference

### POST /api/auth/register

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "OTP sent to your email. Please verify to complete registration.",
  "email": "john@example.com",
  "requiresVerification": true
}
```

**Error Responses:**
```json
// Missing fields
{ "message": "All fields required" }

// Email already registered
{ "message": "Email already registered" }

// Email service error
{ "message": "Failed to send OTP email" }
```

### POST /api/auth/verify-otp

**Request:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (201):**
```json
{
  "message": "Email verified successfully. Account created!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
```json
// OTP not found
{ "message": "OTP not found. Please register again." }

// OTP expired
{ "message": "OTP has expired. Please register again." }

// Max attempts exceeded
{ "message": "Maximum attempts exceeded. Please register again." }

// Invalid OTP
{ "message": "Invalid OTP. 4 attempts remaining." }
```

### POST /api/auth/resend-otp

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "OTP sent to your email.",
  "email": "john@example.com"
}
```

## Security Features

1. **OTP Expiration**: Codes expire after 10 minutes
2. **Attempt Limits**: Maximum 5 attempts before requiring re-registration
3. **Password Hashing**: bcryptjs hashing (10 rounds) before storage
4. **JWT Tokens**: Signed tokens with 7-day expiration
5. **Secure Email**: HTML email template, no sensitive data in parameters
6. **MongoDB TTL Index**: Automatic cleanup of expired OTP records

## Email Templates

### OTP Email
- Gradient header with ConnectWell branding
- Large, prominently displayed 6-digit code
- Expiration notice (10 minutes)
- Clear CTAs
- Responsive design

### Welcome Email
- Gradient header (green theme)
- Personalized greeting
- List of features user can access
- Professional footer
- Fallback if email fails (account still created with JWT)

## Testing

### Test Registration (With Mailtrap)

1. **Navigate to Register page**
   ```
   http://localhost:5173/register
   ```

2. **Fill registration form:**
   - Name: Test User
   - Email: test@example.com
   - Password: TestPass123

3. **Click Continue**
   - See success message
   - Move to OTP verification step

4. **Check Mailtrap inbox:**
   - Log in at mailtrap.io
   - Check inbox for OTP email
   - Copy 6-digit code

5. **Enter OTP:**
   - Paste code into verification input
   - Code auto-validates when 6 digits entered

6. **Success:**
   - Account created
   - Redirected to Dashboard
   - User logged in with JWT token

### Test Resend OTP
1. Wait for code or click "Resend OTP"
2. Receive new code email
3. Uses new OTP, resets attempts

### Test Error Cases
1. **Wrong OTP**: Enter incorrect code → "Invalid OTP. X attempts remaining"
2. **Expired OTP**: Wait 10+ minutes → "OTP has expired"
3. **Duplicate Email**: Register twice → "Email already registered"

## Status Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 201 | Created | Successful registration or OTP verification |
| 200 | OK | OTP resent successfully |
| 400 | Bad Request | Missing fields, expired/invalid OTP |
| 401 | Unauthorized | Invalid credentials (during login) |
| 404 | Not Found | OTP record not found |
| 409 | Conflict | Email already registered |
| 500 | Server Error | Email service failure |

## Troubleshooting

### Issue: "Failed to send OTP email"

**Check:**
1. Email credentials in `.env` are correct
2. For Mailtrap: Account active, not blocklisted
3. For Gmail: App-specific password (not regular password)
4. Network: Backend can reach email server

**Solution:**
```bash
# Test email service manually
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'
```

### Issue: OTP code not received

**Check:**
1. Email delivery time (usually instant)
2. Spam/junk folder
3. Email provider blocking
4. Correct email in form

**Solution:**
- Use Mailtrap for testing (no external email needed)
- Check server logs: `[Email Service] Error sending OTP`

### Issue: "OTP has expired"

**Cause:** User waited >10 minutes

**Solution:**
- Click "Resend OTP" button
- New code valid for 10 more minutes

## Future Enhancements

1. **SMS OTP**: Add Twilio for SMS delivery
2. **Magic Links**: Email-based authentication without OTP
3. **2FA**: Optional second factor for extra security
4. **OTP Rate Limiting**: Prevent OTP spam
5. **Audit Logging**: Track registration/verification events
6. **Custom Email Templates**: User-configurable branding
7. **Multi-language**: Email templates in multiple languages

## Database Schema

### OTP Collection
```
{
  _id: ObjectId
  email: String (indexed, unique during registration)
  otp: String (6-digit code)
  expiresAt: Date (auto-expires after 10 minutes)
  verified: Boolean (default: false)
  attempts: Number (0-5)
  maxAttempts: Number (default: 5)
  userData: {
    name: String
    email: String
    password: String (hashed)
  }
  createdAt: Date
  updatedAt: Date
}
```

## Migration Note

### For Existing Users

If migrating from old system:

1. **Existing accounts unaffected** - Old User model unchanged
2. **New registrations require OTP** - Only new users
3. **Optional**: Add `emailVerified` flag to User model for future use
4. **Manual migration**: If needed, emailVerified=true for legacy users

## Support

For issues with:
- **Email delivery**: Check `OPENAI_SETUP.md` for Mailtrap setup
- **Frontend validation**: See Register.jsx component
- **Backend logic**: Check authController.js
- **Database**: Verify MongoDB connection in console

---

**Created:** February 2026  
**Version:** 1.0  
**Status:** Production Ready
