import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_YLjuAeaF_6Jmmw5FQF8gUewFYJk3hnRBD');

export async function POST(req: Request) {
  try {
    const { type, amount, selectedPackage, network, email, address } = await req.json();
    const adminEmail = 'tungnguyentrung77@gmail.com';
    let emailContent;

    if (type === 'withdraw') {
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
            <h1 style="color: #333;">Withdrawal Notification</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear Admin,</p>
            <p>A withdrawal request has been made. Here are the details:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Network:</strong> ${network}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount} USDT</p>
              <p style="margin: 5px 0;"><strong>Address:</strong> ${address}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>Please review the request.</p>
            
            <div style="margin-top: 30px;">
              <p>Best regards,</p>
              <p><strong>Your Team</strong></p>
            </div>
          </div>
        </div>
      `;
    } else {
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
            <h1 style="color: #333;">Investment Notification</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear Admin,</p>
            <p>An investment has been made. Here are the details:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Package:</strong> ${selectedPackage}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount} USDT</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>The investment has been successfully processed.</p>
            
            <div style="margin-top: 30px;">
              <p>Best regards,</p>
              <p><strong>Your Team</strong></p>
            </div>
          </div>
        </div>
      `;
    }

    const fromEmail = type === 'withdraw' ? 'Withdrawal Confirmation Admin <onboarding@resend.dev>' : 'Investment Confirmation Admin <onboarding@resend.dev>';
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: type === 'withdraw' ? 'Withdrawal Notification Admin' : 'Investment Notification Admin',
      html: emailContent
    });

    if (error) {
      console.error('Error sending email to admin:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email sent to admin successfully' });
  } catch (error) {
    console.error('Error in send-admin-email route:', error);
    return NextResponse.json({ success: false, error: 'Failed to send admin email' }, { status: 500 });
  }
}