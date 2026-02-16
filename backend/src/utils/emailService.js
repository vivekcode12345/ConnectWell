const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send OTP email for verification
 */
const sendOtpEmail = async (email, userName = "", otp) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || "noreply@connectwell.com",
    subject: "Your ConnectWell verification code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0d1b1e; color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Verify your email</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">ConnectWell account verification</p>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 12px 0; color: #333; font-size: 16px;">Hi ${userName || "there"},</p>
          <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">Use the code below to verify your email. It expires in 10 minutes.</p>
          <div style="font-size: 28px; letter-spacing: 6px; font-weight: bold; text-align: center; padding: 16px; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px;">
            ${otp}
          </div>
          <p style="margin: 16px 0 0 0; color: #999; font-size: 12px; text-align: center;">If you did not request this, you can ignore this email.</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`[Email Service] OTP email sent to ${email}`);
    return { success: true, message: "OTP email sent" };
  } catch (error) {
    console.warn(`[Email Service] OTP email failed for ${email}`, error.message);
    return { success: false, message: "Failed to send OTP email" };
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
  sendOtpEmail,
  sendWelcomeEmail,
};
