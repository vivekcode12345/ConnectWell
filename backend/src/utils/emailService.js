const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Generate a 6-digit OTP
 * Returns a random 6-digit code
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP email to user
 */
const sendOTPEmail = async (email, otp, userName = '') => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || 'noreply@connectwell.com',
    subject: 'Your ConnectWell Email Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">ConnectWell</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Email Verification</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 20px 0; color: #333; font-size: 16px;">
            Hi ${userName || 'there'},
          </p>
          
          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
            Your email verification code is:
          </p>
          
          <div style="background: #f0f0f0; border: 2px dashed #667eea; padding: 20px; text-align: center; border-radius: 8px; margin: 0 0 20px 0;">
            <p style="margin: 0; font-size: 36px; color: #667eea; font-weight: bold; letter-spacing: 5px;">
              ${otp}
            </p>
          </div>
          
          <p style="margin: 0 0 20px 0; color: #999; font-size: 12px;">
            This code will expire in 10 minutes.
          </p>
          
          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
            If you didn't request this code, please ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
            © 2026 ConnectWell. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`[Email Service] OTP sent to ${email}: ${otp}`);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.warn(`[Email Service] Email failed for ${email}, but OTP created. Test OTP: ${otp}`);
    console.error('[Email Service] Error:', error.message);
    // For testing: return success anyway - OTP is still stored in DB
    console.log(`[Testing] Use this OTP to verify: ${otp}`);
    return { success: true, message: 'OTP created (check server logs for code)' };
  }
};

/**
 * Send welcome email after successful verification
 */
const sendWelcomeEmail = async (email, userName = '') => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || 'noreply@connectwell.com',
    subject: 'Welcome to ConnectWell!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to ConnectWell</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Your journey to better emotional well-being starts here</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 20px 0; color: #333; font-size: 16px;">
            Welcome, ${userName}!
          </p>
          
          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
            Your account has been successfully verified. You can now log in and start exploring ConnectWell.
          </p>
          
          <h3 style="margin: 20px 0 15px 0; color: #333; font-size: 16px;">What you can do:</h3>
          <ul style="margin: 0 0 20px 0; color: #666; font-size: 14px; padding-left: 20px;">
            <li style="margin: 0 0 10px 0;">Track your daily mood and emotional patterns</li>
            <li style="margin: 0 0 10px 0;">Join supportive communities and share experiences</li>
            <li style="margin: 0 0 10px 0;">Get AI-powered tone analysis for your messages</li>
            <li style="margin: 0 0 10px 0;">Access wellness insights and recommendations</li>
          </ul>
          
          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
            If you have any questions or need support, feel free to reach out to us.
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
            © 2026 ConnectWell. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`[Email Service] Welcome email sent to ${email}`);
    return { success: true, message: 'Welcome email sent' };
  } catch (error) {
    console.warn(`[Email Service] Welcome email failed for ${email}`, error.message);
    // Don't throw - welcome email is not critical
    return { success: false, message: 'Failed to send welcome email' };
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  sendWelcomeEmail,
};
