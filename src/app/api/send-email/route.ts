import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_YLjuAeaF_6Jmmw5FQF8gUewFYJk3hnRBD');

export async function POST(req: Request) {
  try {
    const { email, amount, selectedPackage, type } = await req.json();

    // Log để debug
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

    const fromEmail = type === 'withdraw' ? 'Withdrawal Confirmation <onboarding@resend.dev>' : 'Investment Confirmation <onboarding@resend.dev>';
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: type === 'withdraw' ? 'Withdrawal Confirmation' : 'Investment Confirmation',
      html: emailContent
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      data 
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