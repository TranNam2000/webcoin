import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { email, amount, selectedPackage, type } = await req.json();

    console.log('Sending email to:', email);
    console.log('Amount:', amount);
    console.log('Type:', type);
    if (type !== 'withdraw') {
      console.log('Package:', selectedPackage);
    }

    let emailContent;
    if (type === 'withdraw') {
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
            <h1 style="color: #333;">Withdrawal Confirmation</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear User,</p>
            <p>Your withdrawal request has been received. Here are your transaction details:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>Your withdrawal request is being processed. Please allow 24-48 hours for the transaction to complete.</p>
            
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
            <h1 style="color: #333;">Investment Confirmation</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear Investor,</p>
            <p>Thank you for your investment. Here are your transaction details:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Package:</strong> ${selectedPackage}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>Your investment has been successfully processed.</p>
            
            <div style="margin-top: 30px;">
              <p>Best regards,</p>
              <p><strong>Your Team</strong></p>
            </div>
          </div>
        </div>
      `;
    }

    const msg = {
      to: email,
      from: {
        email: 'voicebooks@hotmail.com',
        name: 'WebCoin'
      },
      subject: type === 'withdraw' ? 'Withdrawal Confirmation' : 'Investment Confirmation',
      html: emailContent,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      },
      categories: [type === 'withdraw' ? 'withdrawal' : 'investment']
    };

    await sgMail.send(msg);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 