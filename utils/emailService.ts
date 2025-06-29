interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

// In a real app, this would connect to a real email service like SendGrid, Mailgun, etc.
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  console.log('Email service called with:', options);
  
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Log email content for demonstration
  console.log(`------- EMAIL SENT -------`);
  console.log(`To: ${options.to}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Body: ${options.body}`);
  console.log(`-------------------------`);
  
  // Return success (in a real app, this would return based on the actual email service response)
  return true;
};

export const sendApprovalEmail = async (
  to: string, 
  firstName: string, 
  credentials: { username: string; password: string; }
): Promise<boolean> => {
  const subject = "Your Fund Raising Account Application Approved";
  
  const body = `
Dear ${firstName},

We're pleased to inform you that your account application for our Fund Raising Platform has been approved!

You can now log in to your account using the following credentials:

Username: ${credentials.username}
Password: ${credentials.password}

Please change your password after your first login for security purposes.

If you have any questions, please don't hesitate to contact our support team.

Thank you for joining our platform!

Best regards,
The Fund Raising Team
  `;
  
  return sendEmail({ to, subject, body });
};

export const sendRejectionEmail = async (
  to: string, 
  firstName: string, 
  reason: string
): Promise<boolean> => {
  const subject = "Your Fund Raising Account Application Status";
  
  const body = `
Dear ${firstName},

Thank you for your interest in our Fund Raising Platform.

After careful review of your application, we regret to inform you that we are unable to approve your account request at this time.

Reason: ${reason}

You are welcome to submit a new application addressing the concerns mentioned above.

If you have any questions, please feel free to contact our support team.

Best regards,
The Fund Raising Team
  `;
  
  return sendEmail({ to, subject, body });
};