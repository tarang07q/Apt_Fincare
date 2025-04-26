import nodemailer from 'nodemailer';

// Create a test account if no SMTP credentials are provided
let testAccount: any = null;

// Configure nodemailer transporter
export async function getTransporter() {
  // If we have SMTP settings in environment variables, use those
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Otherwise, create a test account using ethereal.email
  if (!testAccount) {
    testAccount = await nodemailer.createTestAccount();
    console.log('Created test email account:', testAccount);
  }

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

// Send an email
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"FinTrack+ Support" <support@fintrackplus.com>',
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);

    // If using ethereal.email, log the URL where the email can be previewed
    if (info.messageId && !process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return {
        success: true,
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info),
      };
    }

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error,
    };
  }
}

// Send a password reset email
export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981; text-align: center; padding-bottom: 10px; border-bottom: 1px solid #eaeaea;">
        Reset Your FinTrack+ Password
      </h2>
      <p>Hello,</p>
      <p>We received a request to reset your password for your FinTrack+ account. If you didn't make this request, you can safely ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p>Or copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #4b5563;"><a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you didn't request a password reset, please contact our support team immediately.</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; color: #6b7280; font-size: 0.875rem;">
        <p>FinTrack+ - Your Personal Finance Manager</p>
      </div>
    </div>
  `;

  const text = `
    Reset Your FinTrack+ Password
    
    Hello,
    
    We received a request to reset your password for your FinTrack+ account. If you didn't make this request, you can safely ignore this email.
    
    To reset your password, visit this link: ${resetUrl}
    
    This link will expire in 1 hour for security reasons.
    
    If you didn't request a password reset, please contact our support team immediately.
    
    FinTrack+ - Your Personal Finance Manager
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Your FinTrack+ Password',
    html,
    text,
  });
}

// Send a password changed confirmation email
export async function sendPasswordChangedEmail(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const loginUrl = `${baseUrl}/login`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981; text-align: center; padding-bottom: 10px; border-bottom: 1px solid #eaeaea;">
        Your FinTrack+ Password Has Been Changed
      </h2>
      <p>Hello,</p>
      <p>Your password for FinTrack+ has been successfully changed.</p>
      <p>If you made this change, you can safely ignore this email.</p>
      <p>If you did not change your password, please contact our support team immediately as your account may have been compromised.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Log In to Your Account
        </a>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; color: #6b7280; font-size: 0.875rem;">
        <p>FinTrack+ - Your Personal Finance Manager</p>
      </div>
    </div>
  `;

  const text = `
    Your FinTrack+ Password Has Been Changed
    
    Hello,
    
    Your password for FinTrack+ has been successfully changed.
    
    If you made this change, you can safely ignore this email.
    
    If you did not change your password, please contact our support team immediately as your account may have been compromised.
    
    Log in to your account: ${loginUrl}
    
    FinTrack+ - Your Personal Finance Manager
  `;

  return sendEmail({
    to: email,
    subject: 'Your FinTrack+ Password Has Been Changed',
    html,
    text,
  });
}
